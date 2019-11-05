// React, routing
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { withRouter, Router } from 'react-router';

// Redux
import { createStore, applyMiddleware } from 'redux';
import {Provider, connect } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../../redux/sagas/rootSaga.js';
import rootReducer from '../../redux/reducers/rootReducer.js';
import { authActions } from '../../redux/actions/authActions';
import  actionConstants from '../../redux/actionConstants';

// Style
import { Layout, ConfigProvider } from 'antd';
const { Header, Content, Sider } = Layout;
import en_US from 'antd/lib/locale-provider/en_US';

// Components
import Home from "./home.jsx";
import NewService from "./newService.jsx";
import Login from "./login.jsx";
import Category from "./category.jsx";
import Subcategory from "./subcategory.jsx";

const history = createBrowserHistory();
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

        if(this.getCookie("token")){
            const { dispatch } = this.props;
            let payload = {token: this.getCookie("token")};
            dispatch(authActions.getAuthRequest(payload));


        };

    }

    getCookie(name) {
        var nameEQ = name + "=";
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
    
    render() {
        return(
            <Layout style={{minHeight: "100vh"}}>
                <Header>
                    <h1 style={{color:"white"}}>Health & Wellness Map Admin</h1>
                </Header>
                <Content>
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
                        <Route exact path="/category" component={Category} />
                    </Switch>
                    <Switch>
                        <Route exact path="/subcategory" component={Subcategory} />
                    </Switch>
                </Content>
            </Layout>
        )
        
    }
}
const mapStateToProps = (state) => {
    return {}
}
const Index = withRouter(connect(mapStateToProps)(IndexClass));
export default Index;

ReactDOM.render(
    <ConfigProvider locale={en_US}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Index />
            </ConnectedRouter>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
)