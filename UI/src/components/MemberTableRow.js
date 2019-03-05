import React, { Component } from 'react';
import ClaimComponent from './ClaimComponent';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

import api from '../Api'

const API_ROOT = api.claimAPI;

class MemberTableRow extends Component {

    state = {
        memberDetails : this.props.memberDetails,
        employerDetails : this.props.employerDetails,
        claimDetails : [],
        loading : false,
        claimsLoaded: false
    }

    getClaimDetailsFromAPI = () => {
        if(this.state.memberDetails.employeeId !== '' && !this.state.claimsLoaded){
            this.setState({ loading: true }, () => {
                            axios.get(API_ROOT+'/employee/'+this.state.memberDetails.employeeId)
                            .then( res=> {
                                            if( res.data !== '' ){
                                                this.setState({ claimDetails : res.data, loading: false, claimsLoaded : true });
                                            } else {
                                                this.setState({ claimDetails : [], loading: false, claimsLoaded : false});
                                            }
                             }).catch(error => {
                                console.log(error);
                                this.setState({ claimDetails : [], loading: false, claimsLoaded : false});
                            })
                        });
        } 
    }

    render(){
        const { memberDetails, employerDetails } = this.props;

        return(
            <React.Fragment>
                <tr>
                    <td>
                        <div className="accordion" id="memberAccordion">
                            <div id={'memberId'+ memberDetails.employeeId}>
                                <button className="btn btn-link collapsed" type="button" onClick={this.getClaimDetailsFromAPI} data-toggle="collapse" data-target={'#collapseMemberId'+ memberDetails.employeeId} aria-expanded="false" aria-controls={'collapseMemberId'+ memberDetails.employeeId}>
                                    {memberDetails.employeeId}
                                </button>
                            </div>    
                        </div>
                    </td>
                    <td>{memberDetails.firstName + ' ' + this.props.memberDetails.lastName}</td>
                    <td>{memberDetails.address1}</td>
                    <td>{memberDetails.address2}</td>    
                </tr>
                <tr className="member-claim-details">
                    <td colSpan="4">
                        <div id={'collapseMemberId'+ memberDetails.employeeId} className="collapse" aria-labelledby={'memberId'+ memberDetails.employeeId} data-parent="#memberAccordion">
                            <div className="member-claim-details-content">
                                { this.state.loading ? <LoadingSpinner spinnerMessage={'Loading Claim Details'}/> : <ClaimComponent claimDetails={this.state.claimDetails} electionAmount={employerDetails.electionAmount}/> }   
                            </div>
                        </div>
                    </td>  
                </tr>
            </React.Fragment>
        )
    }
}

export default MemberTableRow;