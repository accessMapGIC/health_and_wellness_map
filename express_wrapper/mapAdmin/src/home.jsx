// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Style
import { Link } from 'react-router-dom';

import ListService from './listService.jsx';
// Style
import './home.css';
import { Button, Input, Badge, Icon  } from 'antd';
import { feedbackActions } from './redux/actions/feedbackActions.js';

class HomeClass extends React.Component {
    constructor(props) {
        super(props);
       this.state = {
      
       }
    }

    countSuggestionService = (listing) =>{
        let suggestionServiceNumber = 0
        if (listing && listing.length > 0) {
            listing.map((service, i) => {
                if ( !service.verified_by && service.name) {
                    suggestionServiceNumber++
                }
            })
        }
        return suggestionServiceNumber
        }

    countReportedError = (listing) =>{
        let reportedErrorNumber = 0
        if (listing && listing.length > 0) {
            listing.map((service, i) => {
                if ( service.email && service.content) {
                    reportedErrorNumber++
                }
            })
        }
        return reportedErrorNumber
        }

    componentDidUpdate(prevProps){
        if (this.props.loggedin != prevProps.loggedin && this.props.loggedin == true) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + '/#/home';
        }
    }

    componentDidMount(){
        this.props.dispatch(feedbackActions.getReportedErrorRequest());
    }
    render() {
            return ( 
           
                <div className="home-wrapper">
                    <div className="newService">
                        <Link to="/newService">
                            <Button>Create New Service</Button>
                        </Link>
                        <Link to="/category">
                            <Button>Manage Primary Categories</Button>
                        </Link>
                        <Link to="/subcategory">
                            <Button>Manage Subcategories</Button>
                        </Link>
                        <Link to="/insurance">
                            <Button>Manage Insurances</Button>
                        </Link>
                        <Badge count={this.countSuggestionService(this.props.listing)}>
                            <a href="/#/ListServiceSuggestion"> <Button>Review Service Suggestion</Button> </a>
                        </Badge>
                       <Badge count={this.countReportedError(this.props.reported_Error)}>
                            <a href="/#/ListReportedError"> <Button>Review Reported Error</Button> </a>
                        </Badge>
                    </div>
                    <ListService />
                </div>
             
            )
        }
}
const mapStateToProps = (state) => {
    const { loggedInUser } = state.auth
    const { listing} = state.serviceReducer;
    const {reported_Error} = state.feedbackReducer
    return {
        loggedInUser, listing, reported_Error
    }
}
const Home = withRouter(connect(mapStateToProps)(HomeClass));
export default Home;