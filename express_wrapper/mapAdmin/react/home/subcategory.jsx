// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actionConstants from '../../redux/actionConstants';
import { categoryActions } from '../../redux/actions/categoryActions';

// Style
import './home.css';
import { Table, Input, Button, Popconfirm, Form, Select, Divider } from 'antd';
const { Option } = Select;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.columns = [
        {
          title: 'Category ID',
          dataIndex: 'subcat_id',
          width: '20%',
          editable: false,
        },
        {
          title: 'Category Name',
          dataIndex: 'subcat_name',
          editable: true
        },
        {
            title: 'Primary Category',
            dataIndex: 'pc_id',
            render: (record) => (
                <Select defaultValue={record} style={{width: 200}} onChange={this.changePrimaryCategory}>
                    {this.props.primary_category.map((pc, i) => {
                        return (
                            <Option key={i} value={pc.cat_id}>{pc.cat_name}</Option>
                        );
                    })}
                </Select>
            )
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '20%',
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
                <div>   
                    <Popconfirm title="Are you sure you want to delete?" onConfirm={() => this.handleDelete(record.subcat_id)}>
                        <a>Delete</a>
                    </Popconfirm>
                    <Divider type="vertical"/>
                    <a onClick={()=>this.handleSubmit(record)}>Save</a>
                </div>
              
            ) : null,
        },
      ];
  
      this.state = {
        dataSource: [],
        count: 0,
        adding: false,
        pc_id: 0
      };

      this.props.dispatch(categoryActions.getPrimaryCategoryRequest());
      this.props.dispatch(categoryActions.getSubcategoryRequest());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status && (this.props.status === actionConstants.GET_SUBCATEGORY_SUCCESS || this.props.status === actionConstants.CREATE_SUBCATEGORY_SUCCESS || this.props.status === actionConstants.UPDATE_SUBCATEGORY_SUCCESS || this.props.status === actionConstants.DELETE_SUBCATEGORY_SUCCESS)) {
            let dataSource = [];
            for (let i=0; i<this.props.subcategory.length; i++) {
                dataSource.push(this.props.subcategory[i]);
                dataSource[i].key = i;
            }
            this.setState({
                dataSource: dataSource,
                count: this.props.subcategory.length,
                adding: false
            })
        }
    }

    changePrimaryCategory = (value) => {
        this.setState({
            pc_id: value
        })
    }
  
    handleDelete = subcat_id => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.subcat_id !== subcat_id) });
      this.props.dispatch(categoryActions.deleteSubcategoryRequest(subcat_id))
    };
  
    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        subcat_id: "",
        subcat_name: "",
        pc_id: ""
      };
      this.setState({
        dataSource: [...dataSource, newData],
        count: count + 1,
        adding: true
      });
    };
  
    handleSave = row => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      
      this.setState({ 
          dataSource: newData
      });
    };

    handleSubmit = row => {
        row.pc_id = this.state.pc_id;

        if (this.state.adding) {
            this.props.dispatch(categoryActions.createSubcategoryRequest(row));
        }
        else {
            this.props.dispatch(categoryActions.updateSubcategoryRequest(row));
        }
    }
  
    render() {
      const { dataSource } = this.state;
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: this.handleSave
          }),
        };
      });
      return (
        <div>
          <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
            Add a row
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
          />
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    const { status, primary_category, subcategory } = state.categoryReducer
    return {
        status, primary_category, subcategory
    }
}
const TableComponent = connect(mapStateToProps)(EditableTable);

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            count: 0
        }
        
    }

    render() {
        return ( 
            <div className="home-wrapper">
                <TableComponent 
                    dataSource={this.state.dataSource}
                    count={this.state.count}
                />
            </div>
            
        )
    }
}

export default withRouter(Category);