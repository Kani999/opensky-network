import React from 'react'
import './flight-search.styles.css'

export const FlightSearch = ({ placeholder, handleChange }) => {
    return (
        <input className='search'
            type='search'
            placeholder={placeholder}
            onChange={handleChange}
        />
    )
}