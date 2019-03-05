import React, { Component } from 'react';
import { Redirect } from 'react-router';

import HeaderComponent from '../components/HeaderComponent';
import EmployerComponent from '../components/EmployerComponent';
import MemberComponent from '../components/MemberComponent';

class DashboardPage extends Component {

    state = {
        employer : {
            employerId : ''
        }
    }

    logout = () => {
        this.props.onLogout(false)
    }

    employerCallback = (employerData) => {
        this.setState({ employer : employerData});
    }
    
    render(){
        return(
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <HeaderComponent loggedIn={this.props.loggedIn} onLogout={this.logout}/>
                    <div className="container-fluid">
                        <h3 className="mb-4 mt-4 text-gray">Welcome to HealthCare Admin Portal</h3>
                        <div className="row">
                            { !this.props.loggedIn && <Redirect to="/login"/>}
                            <EmployerComponent employerData={this.employerCallback}/>
                            <MemberComponent employerDetails={this.state.employer}/>                                  
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPage;