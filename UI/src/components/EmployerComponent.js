import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit} from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons';

import SearchComponent from './SearchComponent';
import LoadingSpinner from './LoadingSpinner';
import api from '../Api'

const API_ROOT = api.employerAPI;

var inlineStyle = {
    display : 'inline'
}

class EmployerComponent extends Component{

    state = {
        employerDetails : null,
        componentMessage : 'Search using employer id to see details',
        loading : false,
        showElectionEdit: false,
        updatingElection : false,
        updateMessage : ''
    }

    searchForId = (searchId) => {
        if(searchId !== ''){
            this.setState({ loading: true, editElection : false, updateMessage : '', updateElection : false }, () => {
                            axios.get(API_ROOT+'/'+searchId)
                            .then( res=> {
                                            if( res.data !== '' ){
                                                this.props.employerData(res.data);
                                                this.setState({ employerDetails : res.data, loading: false});
                                            } else {
                                                this.props.employerData({ employerId : '' });
                                                this.setState({ componentMessage : 'No data found', employerDetails : null, loading: false});
                                            }
                             }).catch(error => {
                                console.log(error);
                                this.props.employerData({ employerId : '' });
                                this.setState({ componentMessage : 'Unable to fetch data', employerDetails : null, loading: false});
                            })
                        });
        } else {
            this.setState({ componentMessage : 'Id cannot be blank', employerDetails : null});
        } 
    }

    editElection = () => {
        this.setState({editElection : true, updateMessage: ''});
    }

    cancelUpdate = () => {
        this.setState({editElection : false, updateMessage: ''});
    }

    updateElection = () => {
        if(this.refs.electionAmount.value !== ''){
            this.setState({ updatingElection: true}, () => {
                axios.put(API_ROOT + '/'+ this.state.employerDetails.employerId , {
                    employerId : this.state.employerDetails.employerId,
                    employerName : this.state.employerDetails.employerName,
                    electionAmount : this.refs.electionAmount.value
                }).then( res => {
                    if(res.data !== ''){
                        this.props.employerData(res.data);
                        this.setState({ employerDetails : res.data , updateMessage : 'Successfully Updated Election Amount', updatingElection: false, editElection: false})
                    } else {
                        this.setState({ updateMessage : 'Unable to update election amount.', updatingElection: false, editElection: false})
                    }
                }).catch(error => {
                    console.log(error)
                    this.setState({ updateMessage : 'Unable to update election amount.', updatingElection: false, editElection: false})
                })
            });
        } else {
            this.setState({ updateMessage : 'Election amount cannot be empty'});
        }
        
    }

    getDashboardContent = () => {
        if(this.state.employerDetails !== null){
            return <React.Fragment>
                        <p><b>Employer Id :</b> {this.state.employerDetails.employerId}</p>
                        <p><b>Employer Name :</b> {this.state.employerDetails.employerName}</p>
                        <p>
                            <b>Election Amount :</b>&nbsp;
                            { 
                                this.state.editElection 
                                ? 
                                <React.Fragment>
                                    &nbsp;<input type="text" className="form-control bg-light border-0 small edit-election" style={inlineStyle} ref="electionAmount" />
                                    &nbsp;&nbsp;<i className="btn-ok" onClick={this.updateElection}>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                    </i>
                                    &nbsp;&nbsp;<i className="btn-cancel" onClick={this.cancelUpdate}>
                                        <FontAwesomeIcon icon={faTimesCircle} />
                                    </i>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    ${this.state.employerDetails.electionAmount}&nbsp;&nbsp;
                                    <i className="btn-edit" onClick={this.editElection}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </i>
                                </React.Fragment>
                            }    
                        </p>
                        <p>{ this.state.updatingElection ? <LoadingSpinner spinnerMessage={'Updating'}/> : this.state.updateMessage }</p>
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
            <div className="col-xl-4">
                  <div className="dashboard dashboard-shadow mb-4">
                    <div className="dashboard-header py-3 d-flex flex-row align-items-center justify-content-between Employer">
                      <h6 className="m-0 font-weight-bold">Employer Dashboard</h6>
                    </div>
                    
                    <div className="dashboard-content text-gray">
                        <div className="search-bar-container">
                            <SearchComponent forEmployer onSearch={this.searchForId}/>
                        </div>
                        <div className="dashboard-content-text">
                            { this.state.loading ? <LoadingSpinner spinnerMessage={'Searching'}/> : this.getDashboardContent() }
                        </div>
                    </div>
                </div>
            </div>         
        );
    }
}

export default EmployerComponent;