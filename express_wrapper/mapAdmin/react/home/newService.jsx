// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { serviceActions } from '../../redux/actions/serviceActions';
import actionConstants from '../../redux/actionConstants';

// Style
import "./newService.css";
import { Form, Input, InputNumber, Button, Select, Tag, Tooltip, Icon } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const InputGroup = Input.Group;

class NewServiceClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: {
                lang: [],
                services: [],
                servicesFr: []
            },
            inputVisible: {
                lang: false,
                services: false,
                servicesFr: false
            },
            inputValue: {
                lang: '',
                services: '',
                servicesFr: ''
            },
        }
    }

    componentDidMount() {
        this.props.dispatch(serviceActions.getPrimaryCategoryRequest());
        this.props.dispatch(serviceActions.getSubcategoryRequest());
        this.props.dispatch(serviceActions.getInsuranceRequest());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.CREATE_SERVICE_FAILURE) {
            alert(this.props.error.detail ? this.props.error.detail : this.props.error);
        }
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.CREATE_SERVICE_SUCCESS) {
            alert("Service created successfully");
            window.location.href = "/home";
        }
    }

    // TAG INPUT
    handleClose = (removedTag, type) => {
        const newTags = this.state.tags[type].filter(tag => tag !== removedTag);
        let { tags } = this.state;
        tags[type] = newTags;
        this.setState({ tags });
    };

    showInput = (type) => {
        let { inputVisible } = this.state;
        inputVisible[type] = true
        let input = "input" + type;
        this.setState({ inputVisible }, () => this[input].focus());
    };

    handleInputChange = (e, type) => {
        let { inputValue } = this.state;
        inputValue[type] = e.target.value;
        this.setState({ inputValue });
    };

    handleInputConfirm = (type) => {
        let { tags, inputValue, inputVisible } = this.state;
        if (inputValue[type] && tags[type].indexOf(inputValue[type]) === -1) {
            tags[type] = [...tags[type], inputValue[type]];
        }
        inputVisible[type] = false;
        inputValue[type] = '';
        this.setState({
            tags,
            inputVisible,
            inputValue,
        });
    };

    saveInputRefLang = (input) => (this.inputlang = input);
    saveInputRefServices = (input) => (this.inputservices = input);
    saveInputRefServicesFr = (input) => (this.inputservicesFr = input);
    
    // SUBMIT FORM
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {

            // Build business hours string
            let hours = "{";
            if (values.hours_sun) {
                hours += `{${values.hours_sun}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_mon) {
                hours += `{${values.hours_mon}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_tue) {
                hours += `{${values.hours_tue}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_wed) {
                hours += `{${values.hours_wed}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_thu) {
                hours += `{${values.hours_thu}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_fri) {
                hours += `{${values.hours_fri}},`
            }
            else {
                hours += `{NA},`
            }
            if (values.hours_sat) {
                hours += `{${values.hours_sat}}`
            }
            else {
                hours += `{NA}`
            }
            hours += "}";
            values.hours = hours;

            // Build languages and services string
            let lang = this.state.tags.lang.join(',');
            let services = this.state.tags.services.join(',');
            let servicesFr = this.state.tags.servicesFr.join(',');
            
            values.lang = lang;
            values.services = services;
            values.servicesFr = servicesFr;

            this.props.dispatch(serviceActions.createServiceRequest(values));
          }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { tags, inputVisible, inputValue } = this.state;

        if (true) {
            return (
                <div className="service-form-wrapper">
                    <h1>Create a new service</h1>
                    <Form 
                        onSubmit={this.handleSubmit} 
                    >
                        <Form.Item label="Service ID">
                            {getFieldDecorator('service_id', {})(
                                <InputNumber
                                    style={{width: "100%"}}
                                    placeholder="eg. 123"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Service Name">
                            {getFieldDecorator('name', {})(
                                <Input
                                    placeholder="eg. CLSC du Parc"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Primary category">
                            {getFieldDecorator('primary_cat_id', {})(
                                <Select
                                    placeholder="Select"
                                >
                                    {this.props.primary_category.map((cat, i) => {
                                        return (
                                            <Option key={i} value={cat.cat_id}>{cat.cat_name}</Option>
                                        );
                                    })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Subcategory">
                            {getFieldDecorator('sub_cat_id', {})(
                                <Select
                                    placeholder="Select"
                                >
                                    {this.props.subcategory.map((cat, i) => {
                                        return (
                                            <Option key={i} value={cat.subcat_id}>{cat.subcat_name}</Option>
                                        );
                                    })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Insurance">
                            {getFieldDecorator('insur_id', {})(
                                <Select
                                    placeholder="Select"
                                >
                                    {this.props.insurance.map((insur, i) => {
                                        return (
                                            <Option key={i} value={insur.insur_id}>{insur.insur_name}</Option>
                                        );
                                    })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="Languages Spoken">
                            <div>
                                {tags["lang"].map((tag, index) => {
                                    const tagElem = (
                                        <Tag key={index} closable={true} onClose={() => this.handleClose(tag, "lang")}>
                                            {tag}
                                        </Tag>
                                    );
                                    return tagElem;
                                })}
                                {inputVisible["lang"] && (
                                    <Input
                                        ref={this.saveInputRefLang}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue["lang"]}
                                        onChange={e => this.handleInputChange(e, "lang")}
                                        onBlur={() => this.handleInputConfirm("lang")}
                                        onPressEnter={() => this.handleInputConfirm("lang")}
                                    />
                                    )}
                                {!inputVisible["lang"] && (
                                    <Tag onClick={() => this.showInput("lang")} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <Icon type="plus" /> Add Language
                                    </Tag>
                                )}
                            </div>
                        </Form.Item>
                        <Form.Item label="Address">
                            {getFieldDecorator('address', {})(
                                <Input
                                    placeholder="eg. 123 Avenue du Parc"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Latitude">
                            {getFieldDecorator('lat', {})(
                                <InputNumber
                                    style={{width: "100%"}}
                                    placeholder="eg. 45.23424"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Longitude">
                            {getFieldDecorator('lon', {})(
                                <InputNumber
                                    style={{width: "100%"}}
                                    placeholder="eg. -73.34535"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Transit">
                            {getFieldDecorator('transit', {})(
                                <Input
                                    placeholder="eg. Yes, near Place des Arts"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Website">
                            {getFieldDecorator('website', {})(
                                <Input
                                    placeholder="eg. www.example.com"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Phone number">
                            {getFieldDecorator('phone_num', {})(
                                <Input
                                    placeholder="eg. 514-555-4444"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Emergency Number">
                            {getFieldDecorator('emergency_num', {})(
                                <Input
                                    placeholder="eg. 514-555-4444"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Drop In">
                            {getFieldDecorator('drop_in', {})(
                                <Input
                                    placeholder="eg. Yes"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Services">
                            <div>
                                {tags["services"].map((tag, index) => {
                                    const tagElem = (
                                        <Tag key={index} closable={true} onClose={() => this.handleClose(tag, "services")}>
                                            {tag}
                                        </Tag>
                                    );
                                    return tagElem;
                                })}
                                {inputVisible["services"] && (
                                    <Input
                                        ref={this.saveInputRefServices}
                                        type="text"
                                        size="small"
                                        style={{ width: 78 }}
                                        value={inputValue["services"]}
                                        onChange={e => this.handleInputChange(e, "services")}
                                        onBlur={() => this.handleInputConfirm("services")}
                                        onPressEnter={() => this.handleInputConfirm("services")}
                                    />
                                    )}
                                {!inputVisible["services"] && (
                                    <Tag onClick={() => this.showInput("services")} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <Icon type="plus" /> Add Service
                                    </Tag>
                                )}
                            </div>
                        </Form.Item>
                        <Form.Item label="Services (FR)">
                            <div>
                                {tags["servicesFr"].map((tag, index) => {
                                    const tagElem = (
                                        <Tag key={index} closable={true} onClose={() => this.handleClose(tag, "servicesFr")}>
                                            {tag}
                                        </Tag>
                                    );
                                    return tagElem;
                                })}
                                {inputVisible["servicesFr"] && (
                                    <Input
                                        ref={this.saveInputRefServicesFr}
                                        type="text"
                                        size="small"
                                        style={{ width: 120 }}
                                        value={inputValue["servicesFr"]}
                                        onChange={e => this.handleInputChange(e, "servicesFr")}
                                        onBlur={() => this.handleInputConfirm("servicesFr")}
                                        onPressEnter={() => this.handleInputConfirm("servicesFr")}
                                    />
                                    )}
                                {!inputVisible["servicesFr"] && (
                                    <Tag onClick={() => this.showInput("servicesFr")} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                        <Icon type="plus" /> Add Service (FR)
                                    </Tag>
                                )}
                            </div>
                        </Form.Item>
                        <Form.Item label="Notes">
                            {getFieldDecorator('notes', {})(
                                <TextArea
                                    rows={10}
                                    placeholder=""
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Notes (FR)">
                            {getFieldDecorator('notes_fr', {})(
                                <TextArea
                                    rows={10}
                                    placeholder=""
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="Verified by">
                            {getFieldDecorator('verified_by', {})(
                                <Input
                                    placeholder=""
                                />,
                            )}
                        </Form.Item>
                        Business Hours:
                        <InputGroup compact>
                            <Form.Item>
                                {getFieldDecorator('hours_sun', {})(
                                    <Input style={{ width: 150 }} placeholder="Sun" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_mon', {})(
                                    <Input style={{ width: 150 }} placeholder="Mon" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_tue', {})(
                                    <Input style={{ width: 150 }} placeholder="Tue" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_wed', {})(
                                    <Input style={{ width: 150 }} placeholder="Wed" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_thu', {})(
                                    <Input style={{ width: 150 }} placeholder="Thu" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_fri', {})(
                                    <Input style={{ width: 150 }} placeholder="Fri" />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('hours_sat', {})(
                                    <Input style={{ width: 150 }} placeholder="Sat" />,
                                )}
                            </Form.Item>
                        </InputGroup>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create Service
                            </Button>
                        </Form.Item>
                    </Form>
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
    const {loggedInUser} = state.auth;
    const { status, error, primary_category, subcategory, insurance } = state.serviceReducer;
    return {
        status, error, primary_category, subcategory, insurance, loggedInUser
    }
}
const ServiceForm = Form.create()(NewServiceClass);
const NewService = withRouter(connect(mapStateToProps)(ServiceForm));
export default NewService;