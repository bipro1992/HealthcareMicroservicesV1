import React, { Component } from 'react';

class LoginForm extends Component{

    state = {
        usernamePresent : true,
        passwordPresent : true
    }

    validateAndForwardToParent = () => {
        if(this.validateFormFields()){
            this.forwardToParent({
                username : this.refs.username.value.trim(),
                password : this.refs.password.value.trim()
            });
        }
    }

    validateFormFields = () => {
        let isFormValid = true;
        let usernameValid = true;
        let passwordValid = true;
        if( this.refs.username.value.trim() === ''){
            usernameValid = false;
        }

        if( this.refs.password.value.trim() === ''){
            passwordValid = false;
        }

        if( !usernameValid || !passwordValid ){
            isFormValid = false;
        }

        this.setState({ 
            usernamePresent : usernameValid, 
            passwordPresent : passwordValid, 
        });

        return isFormValid;
    }

    forwardToParent = (formFields) => {
        this.props.onLogin({
            username : formFields.username,
            password : formFields.password,
        });
    }

    render(){
        return(
            <React.Fragment>
                <form>    
                    <h2 className="text-center">Log in</h2>       
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" ref="username"/>
                        <p className="login-form-error">{ this.state.usernamePresent ? '' : 'Username is Required' }</p>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" ref="password"/>
                        <p className="login-form-error">{ this.state.passwordPresent ? '' : 'Password is Required' }</p>
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary btn-block" onClick={this.validateAndForwardToParent}>Log in</button>
                    </div>
                </form>
            </React.Fragment>                       
        );
    }
}

export default LoginForm;