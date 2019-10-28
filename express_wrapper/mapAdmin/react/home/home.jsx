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
import { Button } from 'antd';

class HomeClass extends React.Component {
    constructor(props) {
        super(props);
       
    }

    componentDidUpdate(prevProps){
        if (this.props.loggedin != prevProps.loggedin && this.props.loggedin == true) {
            window.location.href = '/home';
        }

    }
    render() {
       
        if (this.props.loggedInUser && this.props.loggedInUser.type === "admin") {
            return ( 
           
                <div className="home-wrapper">
                    <div className="newService">
                        <Link to="/newService">
                            <Button>Create New Service</Button>
                        </Link>
                    </div>
                        <ListService />
                </div>
             
            )
        }
        else {
            return (
                <div>You are not allowed to access this page</div>
            );
        }
        
    }
}
const mapStateToProps = (state) => {
    const { loggedInUser } = state.auth
    return {
        loggedInUser
    }
}
const Home = withRouter(connect(mapStateToProps)(HomeClass));
export default Home;