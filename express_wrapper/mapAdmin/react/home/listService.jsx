// React, Routing
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { serviceActions } from '../../redux/actions/serviceActions';
import actionConstants from '../../redux/actionConstants';
import CardTemplate from './CardTemplate.jsx';
//Style
import "./listService.css";
class ListServiceClass extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(serviceActions.getServiceRequest());
        this.props.dispatch(serviceActions.getPrimaryCategoryRequest());
        this.props.dispatch(serviceActions.getSubcategoryRequest());
        this.props.dispatch(serviceActions.getInsuranceRequest());
    }

    render() {
        return (
            <div className="Card_Container">
                {this.props.listing.length > 0 && this.props.listing.map((service, i) => {
                    return(
                        <CardTemplate 
                            listing={service}
                        />
                    )
                })
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { listing, primary_category, subcategory, insurance } = state.serviceReducer;
    return {
        listing, primary_category, subcategory, insurance
    }
}
const ListService = connect(mapStateToProps)(ListServiceClass);
export default ListService;