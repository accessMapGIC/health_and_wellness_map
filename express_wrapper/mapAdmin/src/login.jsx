import React from 'react';
import { connect } from 'react-redux';
import { authActions } from './redux/actions/authActions';
import { withRouter } from 'react-router';
import actionConstants from './redux/actionConstants';


//Style
import './login.css'
import { Form, Icon, Input, Button } from 'antd';
import { stat } from 'fs';

class LogInClass extends React.Component{
    constructor(props) {
        super(props);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            const payload = {
              email: values.email, 
              password: values.password
            }
            dispatch(authActions.signInRequest(payload));
          }
        });
      } 
    
    componentDidUpdate(prevProps) {
        if (this.props.loggedin != prevProps.loggedin && this.props.loggedin == true) {
            window.location.href = (process.env.REACT_APP_BASE_NAME || "") + '/#/home';
        }
        if (this.props.authMessage !== prevProps.authMessage && this.props.authMessage === actionConstants.SIGN_IN_FAILURE) {
            alert(this.props.authError);
        }
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
     
        return (

        <div> 
            
            <Form onSubmit={this.handleSubmit} className="login-form" >
                <h1>Admin Login</h1>

                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        />,
                    )}
                </Form.Item>    

                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.loadingSignIn}>
                        Log in
                    </Button>
                </Form.Item>

            </Form> 
        
        </div>
        )

    }

}

function mapStateToProps(state) {
    const { authMessage, loadingSignIn, loggedin, authError } = state.auth;
    return {
       loadingSignIn, loggedin, authMessage, authError
    };
}


const LogInForm = Form.create()(LogInClass);
const LogIn = withRouter(connect(mapStateToProps)(LogInForm));

export default LogIn;