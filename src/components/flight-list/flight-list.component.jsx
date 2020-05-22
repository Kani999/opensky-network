import React, { useState } from 'react';
import './flight-list.style.scss'
import { Flight } from '../flight/flight.component'
import { FlightSearch } from '../flight-search/flight-search.component'
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['arrival', 'departure']).isRequired
}

export const FlightList = (props) => {
  const [searchCallSign, setSearchCallSign] = useState('');

  console.log(searchCallSign)
  // filter flights based on Search box
  var flights = props.flights
  flights = searchCallSignFlights(flights, searchCallSign)

  console.log(props)

  return (
    <div>
      <div className='flight-type'>{props.type.toUpperCase()}</div>

      <div className="table-container">
        <div className="flex-table">
          <div className="flex-row"><p>ICAO</p></div>
          <div className="flex-row"><p>Departure Time</p></div>
          <div className="flex-row"><p>Departure Airport</p></div>
          <div className="flex-row"><p>Arrival Time</p></div>
          <div className="flex-row"><p>Arrival Airport</p></div>
          <div className="flex-row">
            <FlightSearch
              placeholder="Call Sign"
              handleChange={(e) => setSearchCallSign(e.target.value)}
              value={searchCallSign}
            />
          </div>
        </div>

        {flights.map((flight, index) => (
          <Flight key={index} flight={flight} />
        ))}
      </div>
    </div>
  )
}

FlightList.propTypes = propTypes;

// Search for flights with given call sign string
function searchCallSignFlights(flights = [], match_string = '') {
  if (flights.length > 0 && match_string !== '') {
    // filter out flights where callsign is NULL
    flights = flights.filter(f => f.callsign !== null);
    // filter flights matching call sign in search box
    return flights.filter(flight => flight.callsign.toLowerCase().includes(match_string.toLowerCase()))
  }
  return flights
}