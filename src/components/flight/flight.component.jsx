import React from 'react'
import '../flight-list/flight-list.style.scss'

export const Flight = (props) => {
      return(
        <div className="flex-table row" role="rowgroup">
            <div className="flex-row" role="cell"> {props.flight.icao24}</div>
            <div className="flex-row" role="cell">{Unix_timestamp(props.flight.firstSeen)} </div>
            <div className="flex-row" role="cell">{props.flight.estDepartureAirport} </div>
            <div className="flex-row" role="cell">{Unix_timestamp(props.flight.lastSeen) } </div>
            <div className="flex-row" role="cell">{props.flight.estArrivalAirport} </div>
            <div className="flex-row" role="cell">{props.flight.callsign} </div>
        </div>
      )
}

function Unix_timestamp(t) {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2) + ':' + s.substr(-2);
}

/*

icao24					string	Unique ICAO 24-bit address of the transponder in hex string representation. All letters are lower case.
firstSeen				integer	Estimated time of departure for the flight as Unix time (seconds since epoch).
estDepartureAirport			string	ICAO code of the estimated departure airport. Can be null if the airport could not be identified.
lastSeen				integer	Estimated time of arrival for the flight as Unix time (seconds since epoch)
estArrivalAirport			string	ICAO code of the estimated arrival airport. Can be null if the airport could not be identified.
callsign				string	Callsign of the vehicle (8 chars). Can be null if no callsign has been received.
estDepartureAirportHorizDistance	integer	Horizontal distance of the last received airborne position to the estimated departure airport in meters
estDepartureAirportVertDistance		integer	Vertical distance of the last received airborne position to the estimated departure airport in meters
estArrivalAirportHorizDistance		integer	Horizontal distance of the last received airborne position to the estimated arrival airport in meters
estArrivalAirportVertDistance		integer	Vertical distance of the last received airborne position to the estimated arrival airport in meters
departureAirportCandidatesCount		integer	Number of other possible departure airports. These are airports in short distance to estDepartureAirport.
arrivalAirportCandidatesCount		integer	Number of other possible departure airports. These are airports in short distance to estArrivalAirport.

*/
