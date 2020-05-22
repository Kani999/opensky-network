import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'
import { FlightDate } from './components/flight-date/flight-date.component'
import { FlightSearch } from './components/flight-search/flight-search.component'
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
      startDate: new Date(1517227200 * 1000), // 29.1.2018 13:00 // epoch miliseconds
      // endDate = startDate + 1 days
      searchCallSign: ''
    }

    this.changeFlightDate = this.changeFlightDate.bind(this)
    this.fetchFlights = this.fetchFlights.bind(this)
    this.setFlights = this.setFlights.bind(this)
    this.searchCallSignFlights = this.searchCallSignFlights.bind(this)
  }

  // Fetch arrival and departure data
  // * date - new Date(date)
  fetchFlights(startDate) {
    // clear current flight list
    this.setState({ arrivals: [], departures: [], startDate: startDate })

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
  }

  // Load flights data when page renders
  componentDidMount() {
    const local_flightType = localStorage.getItem("flightType")

    // if local flightType is set to arrival/departure 
    if (local_flightType === 'arrival' || local_flightType === 'departure') {
      console.log("LocalStorage hit and valid: " + local_flightType)
      this.setState({ flightType: local_flightType })
    }

    const local_startDate = localStorage.getItem("startDate")
    const s_date = new Date(local_startDate)

    // if localStorage contains startDate and is valid
    if (local_startDate !== null && !isNaN(s_date.getTime())) {
      console.log("LocalStorage hit and valid: " + local_startDate)
      this.fetchFlights(s_date)
    }
    else {
      this.fetchFlights(this.state.startDate)
    }
  }

  // sets flightType - Default arrival
  flightTypeChanged = changeEvent => {
    const status = changeEvent.target.value;

    // Save flightType to localStorage
    localStorage.setItem('flightType', status);

    (status === "departure") ? this.setState({ flightType: status }) : this.setState({ flightType: "arrival" })
  };

  // return array of arrival/departure data based on selected flightType
  setFlights(flightType) {
    return (flightType === "departure") ? this.state.departures : this.state.arrivals;
  }

  // Load new arrival/departure data based on selected date
  changeFlightDate(startDate) {
    // Save date to localStorga
    localStorage.setItem('startDate', startDate);

    //check date validity otherwise set default
    var date = new Date(startDate)
    if (isNaN(date.getTime())) {
      date = new Date()
    }

    this.fetchFlights(date)
  }

  handleSearch = (e) => {
    this.setState({ searchCallSign: e.target.value });
  }

  searchCallSignFlights(flights = [], match_string = '') {
    if (flights.length > 0 && match_string !== '') {
      // filter out flights where callsign is NULL
      flights = flights.filter(f => f.callsign !== null);
      // filter flights matching call sign in search box
      return flights.filter(flight => flight.callsign.toLowerCase().includes(match_string.toLowerCase()))
    }
    return flights
  }

  render() {
    const { flightType, searchCallSign } = this.state;
    var flights = this.setFlights(flightType);

    // filter flights based on Search box
    flights = this.searchCallSignFlights(flights, searchCallSign)

    return (
      <div className="App">
        <div className="flex-grid">
          <div className="col">
            <FlightSwitch handleOptionChange={this.flightTypeChanged} flightType={flightType}></FlightSwitch>
          </div>
          <div className="col">
            <FlightDate onChange={this.changeFlightDate} date={this.state.startDate} />
          </div>
          <div className="col">
            <FlightSearch
              placeholder="Enter Call Sign"
              handleChange={this.handleSearch}
              value={this.state.searchCallSign}
            />
          </div>
        </div>
        <FlightList flights={flights} type={flightType}/>
      </div>
    );
  }
}

export default App;

