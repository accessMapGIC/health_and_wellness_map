// React, Routing
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { serviceActions } from './redux/actions/serviceActions';
import { categoryActions } from './redux/actions/categoryActions';
import { insuranceActions } from './redux/actions/insuranceActions';
import actionConstants from './redux/actionConstants';
import CardTemplate from './CardTemplate.jsx';
//Style
import { Input } from 'antd';
const { Search } = Input;
class ListServiceClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ""
        };
    }

    componentDidMount() {
        this.props.dispatch(serviceActions.getServiceRequest());
        this.props.dispatch(categoryActions.getPrimaryCategoryRequest());
        this.props.dispatch(categoryActions.getSubcategoryRequest());
        this.props.dispatch(insuranceActions.getInsuranceRequest());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.EDIT_SERVICE_FAILURE) {
            alert("ERROR SAVING");
        }
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.EDIT_SERVICE_SUCCESS ) {
            alert("Service verifying successfully");
        }
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.DELETE_SERVICE_SUCCESS ) {
            alert("Service delelting successfully");
        }
    }

    render() {
        return (
            <div className="Card_Container">
                <Search
                    placeholder="search service"
                    onChange={event => {
                        this.setState({filter: event.target.value})
                    }}
                    className="search-bar"
                />
                {this.props.listing.length > 0 
                    ?    
                        this.props.listing.map((service, i) => {
                            if (!this.props.listing[i].verified_by && this.props.listing[i].name) {
                                let lowerCaseFilter = this.state.filter.toLowerCase();
                                if ((this.props.listing[i].name).toLowerCase().indexOf(lowerCaseFilter)>-1) {
                                    return(
                                        <CardTemplate 
                                            pageBelonging={"listServiceSuggestionPage"}
                                            listing={service}
                                            key={i}
                                        />
                                    )
                                }
                            }
                        })
                    
                    : <h1>No Suggestion service</h1>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { listing, primary_category, subcategory, insurance, status } = state.serviceReducer;
    return {
        listing, primary_category, subcategory, insurance, status
    }
}
const ListService = connect(mapStateToProps)(ListServiceClass);
export default ListService;