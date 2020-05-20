import React from 'react';
import DateTimePicker from 'react-datetime-picker'

export const FlightDate = (props) => {
    return (
        <div>
            <DateTimePicker
                onChange={props.onChange}
                value={props.date}
            />
        </div>
    )
}