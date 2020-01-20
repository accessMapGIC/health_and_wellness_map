// React, routing
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter} from 'react-router-dom';
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { withRouter, Router } from 'react-router';

// Redux
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas/rootSaga.js';
import rootReducer from './redux/reducers/rootReducer.js';
import { authActions } from './redux/actions/authActions';
import { searchTermActions } from './redux/actions/searchTermActions';
import  actionConstants from './redux/actionConstants';

// Style
import { Layout, ConfigProvider, Row, Col, Button, Badge } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';

// Components
import Home from "./home.jsx";
import NewService from "./newService.jsx";
import Login from "./login.jsx";
import EditService from "./editService.jsx";
import Category from "./category.jsx";
import Subcategory from "./subcategory.jsx";
import Insurance from "./insurance.jsx";
import ListServiceSuggestion from './listServiceSuggestion';
import ListReportedError from './listReportedError';
import ListSearchTerm from './listSearchTerm';
import { stat } from 'fs';

const { Header, Content, Sider } = Layout;
const history = createBrowserHistory({basename: process.env.REACT_APP_BASE_NAME || ""});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer(history),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// (na) console log the state
const unsubscribe = store.subscribe(()=>console.log(store.getState()));

class IndexClass extends React.Component {
    constructor(props) {
        super(props);
    }
    
    signOut = () => {
        const { dispatch } = this.props;
        dispatch(authActions.signOutRequest());
    }

    backHome = () => {
         window.location.href= (process.env.REACT_APP_BASE_NAME || "") + "/#/home";
    }

    getCookie() {
        var nameEQ = "token" + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0){
                return c.substring(nameEQ.length,c.length);
            } 
        }
        return null;
    }
    
    countSearchTerm = (listing) =>{
        let suggestionServiceNumber = 0;
        if (listing){
            suggestionServiceNumber = listing.length;
        }
        return suggestionServiceNumber;
    }

    showButton(){
        if (this.props.loggedin){
            return ( 
                <div style={{ display: "inline-block", float:"right"}}>
                    <Button
                        style={{ marginRight:"20px"}}
                        className="menu-option"
                        onClick={this.backHome}
                    >
                        Home
                    </Button>
                    <Badge count={this.countSearchTerm(this.props.searchTerm)}>
                        <a href={(process.env.REACT_APP_BASE_NAME || "") + "/#/ListSearchTerm"}> <Button >Review Search Term</Button> </a>
                    </Badge>
                    <Button
                        style={{ marginLeft:"20px"}}
                        className="menu-option"
                        onClick={this.signOut}
                    >
                        Logout
                    </Button>
                </div>
            )  
        }
    }

    componentDidMount() {
        this.props.dispatch(authActions.getAuthRequest()); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authMessage !== this.props.authMessage && this.props.loggedin) {
                this.props.dispatch(searchTermActions.getSearchTermRequest());       
        };
    }

    render() {
        
        return(
            <Layout style={{minHeight: "100vh"}}>
                <Header
                align="middle"
                >
                    <div style={{color:"white"}}>
                    <span  style={{float:"left", fontSize:"25px"}}>Health & Wellness Map Admin</span>
                    {this.showButton()}
                    </div>
                
                </Header>
                <Content>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/" component={Login} />
                        </Switch>
                        <Switch>
                            <Route exact path="/home" component={Home} />
                        </Switch>
                        <Switch>
                            <Route exact path="/newService" component={NewService} />
                        </Switch>
                        <Switch>
                            <Route exact path="/ListServiceSuggestion" component={ListServiceSuggestion} />
                        </Switch>
                        <Switch>
                            <Route exact path="/ListReportedError" component={ListReportedError} />
                        </Switch>
                        <Switch>
                            <Route exact path="/ListSearchTerm" component={ListSearchTerm} />
                        </Switch>
                        <Switch>
                            <Route exact path="/category" component={Category} />
                        </Switch>
                        <Switch>
                            <Route exact path="/subcategory" component={Subcategory} />
                        </Switch>
                        <Switch>
                            <Route exact path="/insurance" component={Insurance} />
                        </Switch>
                        <Switch>
                            <Route exact path="/editService/:service_id" component={EditService} />
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
                        
        )
        
    }
}
const mapStateToProps = (state) => {
    const {loggedin, authMessage} = state.auth;
    const searchTerm = state.searchTermReducers.Search_Term;
    return {loggedin, searchTerm, authMessage};
}
const Index = connect(mapStateToProps)(IndexClass);
export default Index;
