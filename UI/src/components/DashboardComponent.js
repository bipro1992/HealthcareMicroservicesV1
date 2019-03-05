import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MemberComponent from './MemberComponent';
import ClaimsComponent from './ClaimsComponent';

class DashboardComponent extends Component{

    getHeaderCssStyles = () => {
        let classes = "dashboard-header py-3 d-flex flex-row align-items-center justify-content-between ";
        classes = classes + this.props.header;
        return classes;
    }

    loadDashboardContent = () =>{
        if(this.isMemberDashboard()){
            return <MemberComponent/>;
        }
        
        if(this.isClaimsDashboard()){
            return <ClaimsComponent/>;
        }
    }

    isMemberDashboard = () =>{
        if(this.props.header === 'Member'){
            return true;
        }
    }

    isClaimsDashboard = () =>{
        if(this.props.header === 'Claims'){
            return true;
        }
    }

    render(){
        return(
            <div className="col-xl-4">
                  <div className="dashboard dashboard-shadow mb-4">
                    <div className={ this.getHeaderCssStyles() }>
                      <h6 className="m-0 font-weight-bold">{ this.props.header } Dashboard</h6>
                    </div>
                    
                    <div className="dashboard-content text-gray">
                        { this.loadDashboardContent() }
                    </div>
                  </div>
            </div>
        );
    }
}

DashboardComponent.protoTypes = {
    header: PropTypes.string
}

export default DashboardComponent;