import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

class LoadingSpinner extends Component{
    render(){
        return(
            <React.Fragment>
                <FontAwesomeIcon icon={faSpinner} spin/> {this.props.spinnerMessage}
            </React.Fragment>
        );
    }
}

export default LoadingSpinner;