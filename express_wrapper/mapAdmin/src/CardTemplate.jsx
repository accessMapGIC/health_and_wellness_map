import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { serviceActions } from './redux/actions/serviceActions';
import actionConstants from './redux/actionConstants';

//Global
import moment from 'moment';
//style
import "./CardTemplate.css"
import { Row, Collapse, Card, Button, Tag } from 'antd';
const { Panel } = Collapse;
class CardTemplateComponent extends React.Component {
    constructor(props){
      super(props)
    }

    render() {
        const { listing, primary_category, subcategory, insurance, pageBelonging } = this.props;

        return (
            <Row>
                <Card>
                    <Collapse
                        bordered={false}
                    >
                        <Panel header={listing.name} style={{border:0}}>                         
                            {    pageBelonging ?
                                        <Row>
                                            <Button 
                                                onClick = {() => {
                                                    this.props.dispatch(serviceActions.editServiceRequest({approveBy: this.props.loggedInUser, serviceId:listing.service_id}));
                                                }}
                                            >
                                                Approve Service
                                            </Button>
                                        
                                            <Link to={`/editService/${listing.service_id}?list=ServiceSuggestion`}>
                                                <Button>
                                                    Modify Service
                                                </Button>
                                            </Link>
                        
                                            <Button 
                                                onClick = {() => {
                                                        this.props.dispatch(serviceActions.deleteServiceRequest({serviceId:listing.service_id}));

                                                    }}
                                            >
                                                Delete Service
                                            </Button>
                                        </Row>
                                   
                                :
                                   
                                        <Row>
                                            <Link to={`/editService/${listing.service_id}`}>
                                                <Button>
                                                    Modify Service
                                                </Button>
                                            </Link>
                                            <Button 
                                                onClick = {() => {
                                                        this.props.dispatch(serviceActions.deleteServiceRequest({serviceId:listing.service_id}));

                                                    }}
                                            >
                                                Delete Service
                                            </Button>
                                        </Row>
                                    
                            
                            }
                            <Row className="last_modified">
                                Last Modified Date: {moment(listing.last_verified, "YYYY-MM-DDTHH:mm:ss.sssZ").format('LLLL')}
                            </Row>
                            <table>
                                <tbody>
                                    <tr className="light-row">
                                        <td>Service ID:</td>
                                        <td>{listing.service_id}</td>
                                    </tr>
                                    <tr>
                                        <td>Service Name:</td>
                                        <td>{listing.name}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Primary Category:</td>
                                        <td>{listing.cat_name ? listing.cat_name.map(cat_name => {
                                            return(
                                                <Tag key={cat_name}>
                                                    {cat_name}
                                                </Tag>
                                            )
                                        }) : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Subcategory:</td>
                                        <td>{listing.subcat_name ? listing.subcat_name.map(subcat_name => {
                                            return(
                                                <Tag key={subcat_name}>
                                                    {subcat_name}
                                                </Tag>
                                            )
                                        }) : ""}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Insurance:</td>
                                        <td>{listing.insur_name ? listing.insur_name.map(insur_name => {
                                            return(
                                                <Tag key={insur_name}>
                                                    {insur_name}
                                                </Tag>
                                            )
                                        }) : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>Languages Spoken:</td>
                                        <td>{listing.languages_spoken}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Address:</td>
                                        <td>{listing.adress}</td>
                                    </tr>
                                    <tr>
                                        <td>Latitude:</td>
                                        <td>{listing.lat}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Longitude:</td>
                                        <td>{listing.lon}</td>
                                    </tr>
                                    <tr>
                                        <td>Transit:</td>
                                        <td>{listing.transit}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Website:</td>
                                        <td>{listing.website}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td>{listing.phone_num}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Emergency Number:</td>
                                        <td>{listing.emergency_num}</td>
                                    </tr>
                                    <tr>
                                        <td>Drop In:</td>
                                        <td>{listing.drop_in}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Services:</td>
                                        <td>{listing.services}</td>
                                    </tr>
                                    <tr>
                                        <td>Services (FR):</td>
                                        <td>{listing.services_fr}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Notes:</td>
                                        <td>{listing.notes}</td>
                                    </tr>
                                    <tr>
                                        <td>Notes (FR):</td>
                                        <td>{listing.notes_fr}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Verified By:</td>
                                        <td>{listing.verified_by}</td>
                                    </tr>
                                    <tr>
                                        <td>Business Hours(Monday):</td>
                                        <td>{listing.hours[1]}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Business Hours(Tuesday):</td>
                                        <td>{listing.hours[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>Business Hours(Wednesday):</td>
                                        <td>{listing.hours[3]}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Business Hours(Thursday):</td>
                                        <td>{listing.hours[4]}</td>
                                    </tr>
                                    <tr>
                                        <td>Business Hours(Friday):</td>
                                        <td>{listing.hours[5]}</td>
                                    </tr>
                                    <tr className="light-row">
                                        <td>Business Hours(Saturday):</td>
                                        <td>{listing.hours[6]}</td>
                                    </tr>
                                    <tr>
                                        <td>Business Hours(Sunday):</td>
                                        <td>{listing.hours[0]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Panel>
                    </Collapse>
                </Card>
            </Row>
        )
    }
}
const mapStateToProps = state => {
    const { primary_category, subcategory, insurance } = state.serviceReducer;
    const  {loggedInUser} = state.auth;
    return {
        primary_category, subcategory, insurance, loggedInUser
    }
};

const NewCardTemplateComponent = withRouter(connect(mapStateToProps)(CardTemplateComponent));
export default NewCardTemplateComponent;