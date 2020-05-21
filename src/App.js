import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'
import { FlightDate } from './components/flight-date/flight-date.component'
import { trackPromise } from 'react-promise-tracker';

// function callign fetch
import { fetchFlightsApi } from './api/flights.api'


class App extends Component {
  constructor() {
    super()

    this.state = {
      arrivals: [],
      departures: [],
      flightType: "arrival", // arrival vs departure list - arrival default
      startDate: new Date(1517227200 * 1000) // 29.1.2018 13:00 // epoch miliseconds
      // endDate = startDate + 1 days
    }

    this.changeFlightDate = this.changeFlightDate.bind(this)
    this.fetchFlights = this.fetchFlights.bind(this)
    this.setFlights = this.setFlights.bind(this)
  }

  // Fetch arrival and departure data
  // * date - new Date(date)
  fetchFlights(startDate) {
    // clear current flight list
    this.setState({ arrivals: [], departures: [] })

    // endDate = startDay + 1 days // max + days is 7 by API
    let endDate = new Date(startDate)
    endDate = new Date(endDate.setDate(endDate.getDate() + 1))

    console.log("StartDate: " + startDate + "\nEndDate: " + endDate);

    // Convert to unix epoch in SECONDS for api call
    var startUnix = startDate.getTime() / 1000;
    var endUnix = endDate.getTime() / 1000;

    console.log("StartUnix: " + startUnix + "\nEndUnix: " + endUnix);

    //arrivals
    trackPromise(
      fetchFlightsApi(startUnix, endUnix, 'arrival')
        .then(response => this.setState({ arrivals: response }))
        .catch(error => {
          alert("Error:   " + error)
          this.setState({ arrivals: [] })
        }
        )
    )

    trackPromise(
      fetchFlightsApi(startUnix, endUnix, 'departure')
        .then(response => this.setState({ departures: response }))
        .catch(error => {
          alert("Error:   " + error)
          this.setState({ departures: [] })
        }
        )
    )
    // Set DateTime value
    this.setState({ startDate: startDate })
  }

  // Load flights data when page renders
  componentDidMount() {
    this.fetchFlights(this.state.startDate)
  }

  // sets flightType - Default arrival
  flightTypeChanged = changeEvent => {
    const status = changeEvent.target.value;

    (status === "departure") ? this.setState({ flightType: status }) : this.setState({ flightType: "arrival" })
  };

  // return array of arrival/departure data based on selected flightType
  setFlights(flightType) {
    return (flightType === "departure") ? this.state.departures : this.state.arrivals;
  }

  // Load new arrival/departure data based on selected date
  changeFlightDate(startDate) {
    this.fetchFlights(startDate)
  }

  render() {
    // arrival vs departure
    const flightType = this.state.flightType;
    const flights = this.setFlights(flightType);

    return (
      <div className="App">
        <FlightSwitch handleOptionChange={this.flightTypeChanged} flightType={flightType}></FlightSwitch>
        <FlightDate onChange={this.changeFlightDate} date={this.state.startDate} />
        <FlightList flights={flights} type={flightType} />
      </div>
    );
  }
}

export default App;

