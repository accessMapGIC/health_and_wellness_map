// React, Routing
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { serviceActions } from '../../redux/actions/serviceActions';
import { categoryActions } from '../../redux/actions/categoryActions';
import actionConstants from '../../redux/actionConstants';
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
        this.props.dispatch(serviceActions.getInsuranceRequest());
    }

    render() {
        return (
            <div className="Card_Container">
                <Search
                    placeholder="search service"
                    onChange={event => {
                        this.setState({filter: event.target.value})
                        console.log(event.target.value)
                    }}
                    className="search-bar"
                />
                {this.props.listing.length > 0 && this.props.listing.map((service, i) => {
                    if (this.props.listing[i].name) {
                        if ((this.props.listing[i].name).toLowerCase().indexOf(this.state.filter)>-1) {
                            return(
                                <CardTemplate 
                                    listing={service}
                                    key={i}
                                />
                            )
                        }
                    }
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