import React from 'react';
import DatePicker from 'react-date-picker'
import PropTypes from 'prop-types';
import './flight-date.style.css'

const propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired
}

export const FlightDate = (props) => {
    return (
        <div>
            <DatePicker
                onChange={props.onChange}
                value={props.date}
                required={true}
                clearIcon={null}
            />
        </div>
    )
}

FlightDate.propTypes = propTypes;