import React from 'react'
import './flight-list.style.scss'
import { Flight } from '../flight/flight.component'
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['arrival', 'departure']).isRequired,
}


export const FlightList = (props) => {
  console.log(props)

  return (
    <div>
      <div className='flight-type'>{props.type.toUpperCase()}</div>

      <div className="table-container">
        <div className="flex-table">
          <div className="flex-row">ICAO</div>
          <div className="flex-row">Departure Time</div>
          <div className="flex-row">Departure Airport</div>
          <div className="flex-row">Arrival Time</div>
          <div className="flex-row">Arrival Airport</div>
          <div className="flex-row">Call Sign</div>
        </div>

        {props.flights.map((flight, index) => (
          <Flight key={index} flight={flight} />
        ))}
      </div>
    </div>
  )
}

FlightList.propTypes = propTypes;