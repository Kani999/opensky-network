import React from 'react';
import DatePicker from 'react-date-picker'
//import DatePicker from 'react-date-picker/dist/entry.nostyle';
import './flight-date.style.css'

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