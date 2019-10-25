import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
//style
import "./CardTemplate.css"
import { Row, Collapse, Card } from 'antd';
const { Panel } = Collapse;
class CardTemplateComponent extends React.Component {
    constructor(props){
      super(props)
    }

    componentDidMount() {
       
    }
    
    render() {
        const { listing, primary_category, subcategory, insurance } = this.props;
        
        let insuranceName =  insurance.find(
            i => i.insur_id === listing.insur_id
        );
        let primaryCategory = primary_category.find(
            i => i.cat_id === listing.primary_cat_id
        );
        let subCategory = subcategory.find(
            i => i.subcat_id === listing.sub_cat_id
        );
        return (
            <Row>
                <Card>
                    <Collapse
                        bordered={false}
                    >
                        <Panel header={listing.name} style={{border:0}}>
                            <table>
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
                                    <td>{primaryCategory ? primaryCategory.cat_name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Subcategory:</td>
                                    <td>{subCategory ? subCategory.subcat_name : ""}</td>
                                </tr>
                                <tr className="light-row">
                                    <td>Insurance:</td>
                                    <td>{insuranceName ? insuranceName.insur_name : "" }</td>
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
                                    <td>Verified by:</td>
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
    return {
        primary_category, subcategory, insurance
    }
};

const NewCardTemplateComponent = withRouter(connect(mapStateToProps)(CardTemplateComponent));
export default NewCardTemplateComponent;