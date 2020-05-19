import React from 'react'

export const FlightSwitch = (props) => (
    <div className="flight-switch">
        <div className="form-check">
            <label>
                <input type="radio" 
                       name="react-tips" 
                       value="arrival"
                       checked={props.flightType === "arrival"} 
                       onChange={props.handleOptionChange} 
                       className="form-check-input" />
              Arrival
            </label>
        </div>

        <div className="form-check">
            <label>
                <input type="radio" 
                       name="react-tips" 
                       value="departure" 
                       checked={props.flightType === "departure"} 
                       onChange={props.handleOptionChange} 
                       className="form-check-input" />
              Departure
            </label>
        </div>
    </div>
);