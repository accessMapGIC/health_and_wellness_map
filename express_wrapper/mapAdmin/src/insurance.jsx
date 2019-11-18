// React, routing
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import actionConstants from './redux/actionConstants';
import { insuranceActions } from './redux/actions/insuranceActions';

// Style
import './home.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

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
          title: 'Insurance ID',
          dataIndex: 'insur_id',
          width: '20%',
          editable: false,
        },
        {
          title: 'Insurance Name',
          dataIndex: 'insur_name',
          editable: true
        },
        {
          title: 'Action',
          dataIndex: 'action',
          width: '20%',
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm title="Are you sure you want to delete?" onConfirm={() => this.handleDelete(record.insur_id)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
      ];
  
      this.state = {
        dataSource: [],
        count: 0,
        adding: false
      };

      this.props.dispatch(insuranceActions.getInsuranceRequest());
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status !== this.props.status && (this.props.status === actionConstants.GET_INSURANCE_SUCCESS || this.props.status === actionConstants.CREATE_INSURANCE_SUCCESS || this.props.status === actionConstants.UPDATE_INSURANCE_SUCCESS || this.props.status === actionConstants.DELETE_INSURANCE_SUCCESS)) {
            let dataSource = [];
            for (let i=0; i<this.props.insurance.length; i++) {
                dataSource.push(this.props.insurance[i]);
                dataSource[i].key = i;
            }
            this.setState({
                dataSource: dataSource,
                count: this.props.insurance.length
            })
        }
    }
  
    handleDelete = insur_id => {
      const dataSource = [...this.state.dataSource];
      this.setState({ dataSource: dataSource.filter(item => item.insur_id !== insur_id) });
      this.props.dispatch(insuranceActions.deleteInsuranceRequest(insur_id))
    };
  
    handleAdd = () => {
      const { count, dataSource } = this.state;
      const newData = {
        key: count,
        insur_id: "",
        insur_name: ""
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

      if (this.state.adding) {
        this.props.dispatch(insuranceActions.createInsuranceRequest(row));
      }
      else {
        this.props.dispatch(insuranceActions.updateInsuranceRequest(row));
      }
      
      this.setState({ 
          dataSource: newData,
          adding: false
      });
    };
  
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
            handleSave: this.handleSave,
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
    const { status, insurance } = state.insuranceReducer
    return {
        status, insurance
    }
}
const TableComponent = connect(mapStateToProps)(EditableTable);

class Insurance extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("insurancerander")
        return ( 
            <div className="home-wrapper">
                <TableComponent/>
            </div>
            
        )
    }
}

export default withRouter(Insurance);