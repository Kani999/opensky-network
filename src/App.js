import React, { Component } from 'react';
import './App.css';

import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'
import { FlightDate } from './components/flight-date/flight-date.component'

import ErrorBoundary from './components/error-boundary.component'
// HOC fetch api data
import flightData from './api/flight-data.api';

class App extends Component {
  constructor() {
    super()

    this.state = {
      flightType: "arrival", // arrival vs departure list - arrival default
      startDate: new Date(), // endDate = startDate + 1 days
    }

    this.changeFlightDate = this.changeFlightDate.bind(this)
    this.flightTypeChanged = this.flightTypeChanged.bind(this)
  }

  componentDidMount() {
    // get flightType from LocalStorage and check if its valid 
    const local_flightType = localStorage.getItem("flightType")

    this.setState({ flightType: returnFlightStatus(local_flightType) })

    // get startDate from localStorage and check if its valid
    const local_startDate = localStorage.getItem("startDate")
    const s_date = new Date(local_startDate)

    if (local_startDate !== null && !isNaN(s_date.getTime())) {
      this.setState({ startDate: s_date })
    }

    // switch between arrival/departure every 30 seconds
    this.interval = setInterval(() => {
      this.setState({ flightType: returnFlightStatus(this.state.flightType) })
    }, 30000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  // sets flightType - Default arrival
  flightTypeChanged = changeEvent => {
    const status = changeEvent.target.value;

    // Save flightType to localStorage
    localStorage.setItem('flightType', status);

    // set proper status to state
    this.setState({ flightType: returnFlightStatus(status) })
  };

  // Load new arrival/departure data based on selected date
  changeFlightDate(startDate) {
    // Save date to localStorga and check date validity otherwise set default
    localStorage.setItem('startDate', startDate);
    var date = new Date(startDate)

    if (isNaN(date.getTime())) {
      date = new Date()
    }

    this.setState({ startDate: date })
  }

  // Fetch arrival or departure data and return HOC component
  fetchFlightsComponent(startDate, flightType) {
    // start date plus 1 day
    let endDate = new Date(startDate)
    endDate = new Date(endDate.setDate(endDate.getDate() + 1))

    // Convert to unix epoch in SECONDS for api call
    var startUnix = this.state.startDate.getTime() / 1000;
    var endUnix = endDate.getTime() / 1000;

    //HOC
    return flightData(FlightList, startUnix, endUnix, returnFlightStatus(flightType))
  }

  render() {
    const { startDate, flightType } = this.state
    // HOC FlightList component arrival/departure
    const FlightListComponent = this.fetchFlightsComponent(startDate, flightType)

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
              <FlightDate onChange={this.changeFlightDate} date={startDate} />
            </ErrorBoundary>
          </div>
          <div className="col">
          </div>
        </div>
        <ErrorBoundary>
          <FlightListComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

function returnFlightStatus(status) {
  // if status is arrival/departure return in, otherwise return arrival as default
  return (status === "departure") ? 'departure' : 'arrival'
}

export default App;

