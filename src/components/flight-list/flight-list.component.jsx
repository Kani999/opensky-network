import React from 'react'
import './flight-list.style.css'
import { Flight } from '../flight/flight.component'

export const FlightList = (props) => {
    console.log(props)

      return(
          <div className='flight-list'>
            {props.flights.map(flight => (
              <Flight key={flight.id} flight={flight} type={props.type}/>
            ))}
          </div>
    )
}

