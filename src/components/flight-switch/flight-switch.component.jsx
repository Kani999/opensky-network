import React from 'react'
import './flight-switch.style.css'
import PropTypes from 'prop-types';


const propTypes = {
    flightType: PropTypes.oneOf(['arrival', 'departure']).isRequired,
    handleOptionChange: PropTypes.func.isRequired
}


export const FlightSwitch = (props) => (
    <div className="flight-switcher">
        <label className="flight-switch">
            <input type="radio"
                name="fswitch"
                value="arrival"
                checked={props.flightType === "arrival"}
                onChange={props.handleOptionChange}
            />
              Arrival
              <span className="checkmark"></span>
        </label>

        <label className="flight-switch">
            <input type="radio"
                name="fswitch"
                value="departure"
                checked={props.flightType === "departure"}
                onChange={props.handleOptionChange}
            />
              Departure
              <span className="checkmark"></span>
        </label>
    </div>
);

FlightSwitch.propTypes = propTypes;