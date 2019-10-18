// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Style
import './home.css';
import { Button } from 'antd';

class HomeClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-wrapper">   
                <Link to="/newService">
                    <Button>Create New Service</Button>
                </Link>
            </div>
            
        )
        
    }
}
const mapStateToProps = (state) => {
    return {}
}
const Home = withRouter(connect(mapStateToProps)(HomeClass));
export default Home;