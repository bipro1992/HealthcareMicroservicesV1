import React, { Component } from 'react';

class AddMemberForm extends Component {

    state = {
        address1Present : true,
        firstNamePresent : true,
        lastNamePresent : true,
    }

    validateAndForwardToParent = () => {
        if(this.validateFormFields()){
            this.forwardToParent({
                firstName : this.refs.firstName.value.trim(),
                lastName : this.refs.lastName.value.trim(),
                address1 : this.refs.address1.value.trim(),
                address2 : this.refs.address2.value.trim()
            });
        }
    }

    validateFormFields = () => {
        let isFormValid = true;
        let firstNameValid = true;
        let lastNameValid = true;
        let address1Valid = true;
        if( this.refs.firstName.value.trim() === ''){
            firstNameValid = false;
        }

        if( this.refs.lastName.value.trim() === ''){
            lastNameValid = false;
        }

        if( this.refs.address1.value.trim() === ''){
            address1Valid = false;
        }

        if( !firstNameValid || !lastNameValid || !address1Valid ){
            isFormValid = false;
        }

        this.setState({ 
            firstNamePresent : firstNameValid, 
            lastNamePresent : lastNameValid, 
            address1Present : address1Valid
        });

        return isFormValid;
    }

    forwardToParent = (formFields) => {
        this.props.onAddMember({
            firstName : formFields.firstName,
            lastName : formFields.lastName,
            address1 : formFields.address1,
            address2 : formFields.address2
        });
    }

    render(){
        return(
            <React.Fragment>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName">First Name<span className="required-field">*</span></label>
                            <input type="text" className="form-control" id="inputFirstName" placeholder="Enter First Name" ref="firstName"/>
                            <p className="add-member-form-error">{ this.state.firstNamePresent ? '' : 'First Name is Required' }</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName">Last Name<span className="required-field">*</span></label>
                            <input type="text" className="form-control" id="inputLastName" placeholder="Enter Last name" ref="lastName"/>
                            <p className="add-member-form-error">{ this.state.lastNamePresent ? '' : 'Last Name is Required' }</p>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress1">Address 1<span className="required-field">*</span></label>
                            <input type="text" className="form-control" id="inputAddress1" placeholder="1234 Main St" ref="address1"/>
                            <p className="add-member-form-error">{ this.state.address1Present ? '' : 'Address 1 is Required' }</p>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" ref="address2"/>
                        </div>
                    </div>
                     <button type="button" className="btn btn-success btn-add-member" onClick={this.validateAndForwardToParent}>Add Member</button>
                     <span className="add-member-form-note">[Note : Fields Marked with <span className="required-field">*</span> are required fields]</span>
                </form>
            </React.Fragment>
        );
    }
}

export default AddMemberForm;