import React, { useState, useEffect } from 'react';
import './flight-list.style.scss'
import { Flight } from '../flight/flight.component'
import { FlightSearch } from '../flight-search/flight-search.component'
import PropTypes from 'prop-types';

const propTypes = {
  type: PropTypes.oneOf(['arrival', 'departure']).isRequired
}

export const FlightList = (props) => {
  const [searchCallSign, setSearchCallSign] = useState('');
  let [flights, setFlights] = useState(props.flights)

  useEffect(() => {
    var flightArr = props.flights

    setFlights(flightArr)

    if (flightArr.length > 0 && searchCallSign !== '') {
      // filter out flights where callsign is NULL
      flightArr = flightArr.filter(f => f.callsign !== null);
      // filter flights matching call sign in search box
      flightArr = flightArr.filter(flight => flight.callsign.toLowerCase().includes(searchCallSign.toLowerCase()))
      setFlights(flightArr)
    }
  }, [props, searchCallSign])


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