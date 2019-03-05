import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

class Header extends Component{

    getLogoutBtn = () => {
        if(this.props.loggedIn){
            return <React.Fragment>
                        <NavLink className="btn btn-light btn-logout" to="/login" onClick={this.logoutUser} >
                            <FontAwesomeIcon icon={faPowerOff} /> Logout
                        </NavLink>
                    </React.Fragment>
        }
    }

    logoutUser = () => {
        this.props.onLogout(false)
    }

    render(){
        return(
            <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top shadow-bottom">
                <h1>Healthcare UI</h1>
                {this.getLogoutBtn()}
            </nav>
        );
    }
}

export default Header;