import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'
import { FlightDate } from './components/flight-date/flight-date.component'
import ErrorBoundary from './components/error-boundary.component'
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
    }

    this.changeFlightDate = this.changeFlightDate.bind(this)
    this.fetchFlights = this.fetchFlights.bind(this)
    this.setFlights = this.setFlights.bind(this)
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

    // switch between arrival/departure every 30 seconds
    this.interval = setInterval(() => {
      const new_type = this.state.flightType === 'arrival' ? 'departure' : 'arrival'
      this.setState({ flightType: new_type })
    }, 30000);

  }


  componentWillUnmount() {
    clearInterval(this.interval);
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

  render() {
    const { flightType } = this.state;
    var flights = this.setFlights(flightType);

    return (
      <div className="App">
        <div className="flex-grid">
          <div className="col">
            <ErrorBoundary>
              <FlightSwitch handleOptionChange={this.flightTypeChanged} flightType={flightType}></FlightSwitch>
            </ErrorBoundary>
          </div>
          <div className="col">
            <ErrorBoundary>
              <FlightDate onChange={this.changeFlightDate} date={this.state.startDate} />
            </ErrorBoundary>
          </div>
          <div className="col">
          </div>
        </div>
        <ErrorBoundary>
          <FlightList flights={flights} type={flightType} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

