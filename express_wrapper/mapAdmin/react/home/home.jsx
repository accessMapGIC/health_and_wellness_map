// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Style
import { Calendar } from 'antd';

class HomeClass extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Calendar />
        )
        
    }
}
const mapStateToProps = (state) => {
    return;
}
const Home = withRouter(connect(mapStateToProps)(HomeClass));
export default Home;