// React, Routing
import React from 'react';
import { connect } from 'react-redux';
import { searchTermActions } from './redux/actions/searchTermActions';

//Style
import { Table, Tag } from 'antd';

const { Column } = Table;


class ListSearchTermClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formatedSearchTerms : null
        };
    }

    componentDidMount() {
        this.props.dispatch(searchTermActions.getSearchTermRequest());
    }

    componentDidUpdate (prevProps) {
        if (this.props.searchTerm && this.props.searchTerm.length !== 0 && this.props.searchTerm !== prevProps.searchTerm) {
            let formatedSearchTerm = [];
            const keys = Object.keys(this.props.searchTerm[0]);
            this.props.searchTerm.forEach(searchTerm => {
                let searchTermData = { data:[] };
                searchTermData.frequency = searchTerm["frequency"];
                keys.forEach ( key => {
                    if (searchTerm[key] && key !== 'frequency' && key !== 'id' ) {
                        searchTermData.data.push(`${[key]} : ${searchTerm[key]} `);
                    }
                })
                if (searchTermData.data && searchTermData.data.length !== 0) {
                    formatedSearchTerm.push(searchTermData);
                }
            })
            this.setState({formatedSearchTerms : formatedSearchTerm});
        }
    }
    render() {
        return(
            <div>
                {this.state.formatedSearchTerms
                ? (
                    <Table dataSource={this.state.formatedSearchTerms}>
                            <Column
                                title="Term"
                                dataIndex="data"
                                key="term"
                                render={(data) => (
                                        <span>
                                            {data.map(tag => ( 
                                                <Tag color="blue">
                                                    {tag}
                                                </Tag>
                                            ))}
                                        </span>
                                )}
                            />
                            <Column title="Frequency" dataIndex="frequency" key="frequency" />
                    </Table>
                    ) 
                :(
                    <div>No Searching Term History</div>
                )
                }      
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    const searchTerm = state.searchTermReducers.Search_Term;
    return {searchTerm};
}
const ListSearchTerm = connect(mapStateToProps)(ListSearchTermClass);
export default ListSearchTerm;