import React, { Component } from 'react';
import axios from 'axios';

import MemberTableRow from '../components/MemberTableRow';
import LoadingSpinner from './LoadingSpinner';
import AddMemberForm from '../forms/AddMemberForm';
import api from '../Api'

const API_ROOT = api.employeeAPI;

class MemberComponent extends Component{

    state = {
        memberDetails : null,
        employerDetails : null,
        componentMessage : 'Search for Employer to see member details',
        loading: false,
        adding: false,
        addMemberMessage : ''
    }

    componentWillReceiveProps({employerDetails}){
        this.setState({...this.state,employerDetails}, () => {
            this.getMemberDetailsFromAPI();
        })
    }

    getMemberDetailsFromAPI = () => {
        if(this.state.employerDetails.employerId !== ''){
            this.setState({ loading: true }, () => {
                            axios.get(API_ROOT+'/employer/'+this.state.employerDetails.employerId)
                            .then( res1=> {
                                            if( res1.data !== '' ){
                                                this.setState({ memberDetails : res1.data, loading: false});
                                            } else {
                                                this.setState({ componentMessage : 'No data found', memberDetails : null, loading: false});
                                            }
                             }).catch(error => {
                                console.log(error);
                                this.setState({ componentMessage : 'Unable to fetch data', memberDetails : null, loading: false});
                            })
                        });
        } else {
            this.setState({ componentMessage : 'Search for Employer to see member details', memberDetails : null });
        }
    }

    addMemberDetailUsingAPI = (formfields) => {
        if(this.state.employerDetails.employerId !== ''){
            this.setState({ adding: true }, () => {
                            axios.post(API_ROOT, {
                                employerId : this.state.employerDetails.employerId,
                                firstName : formfields.firstName,
                                lastName : formfields.lastName,
                                address1 : formfields.address1,
                                address2 : formfields.address2
                            })
                            .then( res=> {
                                            if( res.data !== '' ){
                                                let tempMemberDetails = this.state.memberDetails;
                                                tempMemberDetails.push(res.data);
                                                this.setState({ memberDetails : tempMemberDetails , adding: false, addMemberMessage : 'Successfully added member'});
                                            } else {
                                                this.setState({ addMemberMessage : 'Unable to add Member', adding: false});
                                            }
                             }).catch(error => {
                                console.log(error);
                                this.setState({ addMemberMessage : 'Unable to add Member', adding: false});
                            })
                        });
        }
    }

    getMemberTable = () => {
        return this.state.memberDetails.map((member) => 
            <MemberTableRow key={member.employeeId} memberDetails={member} employerDetails={this.state.employerDetails}/>
        )
    }

    handleAddMemberSubmit = (formFields) => {
        console.log(formFields);
        this.addMemberDetailUsingAPI(formFields);
    }

    getDashboardContent = () => {
        if(this.state.memberDetails !== null){
            return <React.Fragment>
                        <div className="add-member">
                            <div className="accordion" id="addMemberAccordion">
                                <div id="addMemberLink">
                                    <button className="btn btn-secondary collapsed" type="button" data-toggle="collapse" data-target="#addMemberForm" aria-expanded="false" aria-controls="addMemberForm">
                                        Add Member
                                    </button>
                                </div>
                                <div id="addMemberForm" className="collapse" aria-labelledby="addMemberLink" data-parent="#addMemberAccordion">
                                    <div className="member-add-form">
                                        <AddMemberForm onAddMember={this.handleAddMemberSubmit}/>
                                        { this.state.adding ? <LoadingSpinner spinnerMessage={'Adding Member Details'}/> : this.state.addMemberMessage }
                                    </div>
                                    
                                </div>    
                            </div>
                        </div>
                        <table className="table table-bordered table-responsive-xl" id="member-table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Member Id</th>
                                    <th>Member Name</th>
                                    <th>Address 1</th>
                                    <th>Address 2</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.getMemberTable() }
                            </tbody>
                        </table>
                    </React.Fragment>
        }
        else{
            return <React.Fragment>
                <p>{ this.state.componentMessage}</p>
            </React.Fragment>
        } 
    }

    render(){
        return(
            <div className="col-xl-8">
                  <div className="dashboard dashboard-shadow mb-4">
                    <div className="dashboard-header py-3 d-flex flex-row align-items-center justify-content-between Member">
                      <h6 className="m-0 font-weight-bold">Member Dashboard</h6>
                    </div>
                    
                    <div className="dashboard-content text-gray">
                        <div className="dashboard-content-text">
                            <div className="member-details-table">
                                { this.state.loading ? <LoadingSpinner spinnerMessage={'Loading Member Details'}/> : this.getDashboardContent() }
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

export default MemberComponent;