import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

var inlineStyle = {
    display : 'inline'
}

class SearchComponent extends Component{

    getSearchButtonClass = () => {
        let classes = "btn button-search ";
        if(this.props.forMember){
            classes = classes + "btn-success";
        }

        if(this.props.forClaims){
            classes = classes + "btn-warning";
        }

        if(this.props.forEmployer){
            classes = classes + "btn-danger";
        }
        
        return classes;
    }

    searchData = () => {
        this.props.onSearch(this.refs.searchInput.value.trim());
    }

    render(){
        return(
            <div id="search">
                <input type="text" className="form-control bg-light border-0 small input-search" placeholder="Search using Id"  style={inlineStyle} ref="searchInput"/>
                <button className={this.getSearchButtonClass()} type="button" style={inlineStyle} onClick={this.searchData}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        );
    }
}

SearchComponent.protoTypes = {
    forMember: PropTypes.bool,
    forClaims: PropTypes.bool,
    forEmployer: PropTypes.bool
}

export default SearchComponent;