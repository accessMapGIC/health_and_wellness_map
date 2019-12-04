// React, Routing
import React from 'react';
import { connect } from 'react-redux';
import { feedbackActions } from './redux/actions/feedbackActions';
import actionConstants from './redux/actionConstants';
//Style
import { Row, Collapse, Card, Button } from 'antd';
const { Panel } = Collapse;

class ListReportedErrorClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ""
        };
    }

    componentDidMount() {
        this.props.dispatch(feedbackActions.getReportedErrorRequest());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status && this.props.status === actionConstants.DELETE_REPORTED_ERROR_SUCCESS ) {
            alert("Item delelting successfully");
        }
    }

    render() {
        return (
            <div >
                {this.props.reported_Error && this.props.reported_Error.map((item, i) => {
                    if (item.email && item.content) {
                        return(
                            <Row  key={i}>
                                <Card>
                                    <Collapse
                                        bordered={false}
                                    >
                                        <Panel header={i+1} style={{border:0}}>                         
                                            <Row>
                                                <Button 
                                                    onClick = {() => {
                                                            this.props.dispatch(feedbackActions.deleteReportedErrorRequest({Id: item.id}));
                                                        }}
                                                >
                                                    Delete Reported Error
                                                </Button>
                                            </Row>

                                            <table>
                                                <tbody>
                                                    <tr className="light-row">
                                                        <td>Email:</td>
                                                        <td>{item.email}</td>
                                                    </tr>
                                                    <tr className="light-row">
                                                        <td>Message:</td>
                                                        <td>{item.content}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Panel>
                                    </Collapse>
                                </Card>
                            </Row>  
                            )
                        }
                    })
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const { reported_Error } = state.feedbackReducer;
    return {
        reported_Error
    }
}
const ListReportedError = connect(mapStateToProps)(ListReportedErrorClass);
export default ListReportedError;