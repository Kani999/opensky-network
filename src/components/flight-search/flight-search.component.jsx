import React from 'react'
import './flight-search.styles.css'
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';

const propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

export const FlightSearch = ({ placeholder, handleChange, value }) => {
    const search_icon = <FontAwesomeIcon icon={faSearch} />

    return (
        <div className="search-container">
            <input className='input-field'
                type='search'
                placeholder={placeholder}
                onChange={handleChange}
                value={value} >
                </input>
            <i className="icon">{search_icon}</i>
        </div>
    )
}

FlightSearch.propTypes = propTypes;