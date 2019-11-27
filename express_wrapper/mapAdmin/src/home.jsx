// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import  LogIn  from './login.jsx';

// Style
import { Link } from 'react-router-dom';

import ListService from './listService.jsx';
// Style
import './home.css';
import { Button, Input, Badge, Icon  } from 'antd';

class HomeClass extends React.Component {
    constructor(props) {
        super(props);
       this.state = {
            SuggestionService: 0
       }
    }

    countSuggestionService = (listing) =>{
        let suggestionServiceNumber = 0
        if (listing.length > 0) {
            listing.map((service, i) => {
                if ( !listing[i].verified_by && listing[i].name) {
                    suggestionServiceNumber++
                }
            })
        }
        return suggestionServiceNumber
                
        }

    componentDidUpdate(prevProps){
        if (this.props.loggedin != prevProps.loggedin && this.props.loggedin == true) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + '/#/home';
        }
    }

    componentDidMount(){
        this.setState({SuggestionService : this.countSuggestionService(this.props.listing)})
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
                            <a href="/#/ListServiceSuggestion"> <Icon type="notification" style={{fontSize: '24px', marginLeft:'10px'}}/> </a>
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
    return {
        loggedInUser, listing
    }
}
const Home = withRouter(connect(mapStateToProps)(HomeClass));
export default Home;