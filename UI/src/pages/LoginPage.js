import React, { Component } from 'react';
import LoginForm from '../forms/LoginForm';

class LoginComponent extends Component{

    state = {
        loginMessage : ''
    }

    loginUser = (formFields) => {
        if( formFields.username === 'admin' && formFields.password === 'admin'){
            this.setState({ loginMessage : '' })
            this.props.onLogin(true)
        } else {
            this.setState({ loginMessage : '*Invalid Username or Password' })
        }
        
    }

    handleLogin = (formFields) => {
        this.loginUser(formFields);
    }

    render(){
        return(
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content" className="login-content-wrapper">
                    <div className="row">
                        <div className="login-form dashboard-shadow text-gray">
                            <div className="login-contents">
                                <LoginForm onLogin={this.handleLogin}/>
                                <div className="form-group mb-0">
                                    <p className="red-text">&nbsp;{this.state.loginMessage}</p>
                                </div> 
                            </div>         
                        </div>
                    </div>
                </div>
            </div>        
        );
    }
}

export default LoginComponent;