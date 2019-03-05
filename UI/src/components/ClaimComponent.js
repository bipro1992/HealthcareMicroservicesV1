import React, { Component } from 'react';

class ClaimsComponent extends Component {

    state = {
        electionAmount : this.props.electionAmount,
        claimDetails : this.props.claimDetails,
        componentMessage : 'No data Found'
    }

    getClaimSummary = () => {
        let availablebalance = this.state.electionAmount;
        let totalPaidAmount = 0;
        let totalDeniedAmount = 0;
        let claimsDenied = 0;
        let claimsAdjucated = 0;
        let claimsPaid = 0;
        let totalClaims = 0;
        if(this.state.claimDetails.length !== 0){    
            totalClaims = this.state.claimDetails.length;
            this.state.claimDetails.forEach(function (claim) {
                availablebalance = availablebalance - claim.paidAmount;
                totalPaidAmount = totalPaidAmount + claim.paidAmount;
                totalDeniedAmount = totalDeniedAmount + claim.deniedAmount;
                if(claim.deniedAmount > 0){
                    claimsDenied++;
                }
                if(claim.paidAmount > 0){
                    claimsPaid++;
                }
                if(claim.adjudicated === 1){
                    claimsAdjucated++;
                }
            });      
        }
        return <React.Fragment>
                    <h5>Claims Summary</h5> 
                    <table className="table table-bordered table-responsive-xl" id="claim-summary">
                        <tbody>
                            <tr>
                                <td><p><b>Total Election : </b>&#36;{this.state.electionAmount}</p></td>
                                <td><p><b>Available Balance : </b>&#36;{availablebalance}</p></td>
                            </tr>
                            <tr>
                                <td><p><b>No. of Claims Paid : </b>{claimsPaid}</p></td>
                                <td><p><b>Total Paid : </b>&#36;{totalPaidAmount}</p></td>
                            </tr>
                            <tr>
                                <td><p><b>No. of Claims Denied : </b>{claimsDenied}</p></td>
                                <td><p><b>Total Denied : </b>&#36;{totalDeniedAmount}</p></td>
                            </tr>
                            <tr>
                                <td><p><b>No. of Claims Adjudicated : </b>{ claimsAdjucated }</p></td>
                                <td><p><b>No. of Claims Pending Adjudication : </b>{ totalClaims - claimsAdjucated }</p></td>
                            </tr>
                        </tbody>
                    </table>    
                </React.Fragment>;
        
    }

    render(){
        return(
            <React.Fragment>       
                { this.getClaimSummary() }
            </React.Fragment>
        )
    }
}

export default ClaimsComponent;