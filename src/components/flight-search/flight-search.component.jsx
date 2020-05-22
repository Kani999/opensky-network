import React from 'react'
import './flight-search.styles.css'
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FlightSearch = ({ placeholder, handleChange }) => {
    const search_icon = <FontAwesomeIcon icon={faSearch} />

    return (
        <div className="search-container">
            <button disabled={true}>{search_icon}</button>

            <input className='search'
                type='search'
                placeholder={placeholder}
                onChange={handleChange}
            />
        </div>
    )
}