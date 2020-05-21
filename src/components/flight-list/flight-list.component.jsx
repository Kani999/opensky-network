import React from 'react'
import './flight-list.style.css'
import { Flight } from '../flight/flight.component'

export const FlightList = (props) => {
  console.log(props)

  return (
    <div className='flight-list'>
      <div className="header">
        <p> ICAO </p>
        <p> firstSeen </p>
        <p> estDepartureAirport </p>
        <p> lastSeen </p>
        <p> estArrivalAirport </p>
        <p> callsign </p>
      </div>

      {props.flights.map(flight => (
        <Flight key={flight.id} flight={flight} type={props.type} />
      ))}
    </div>
  )
}

