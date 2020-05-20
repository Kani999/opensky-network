import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'
import { FlightDate } from './components/flight-date/flight-date.component'
import { trackPromise } from 'react-promise-tracker';


class App extends Component {
  constructor() {
    super()

    this.state = {
      arrivals: [],
      departures: [],
      flightType: "arrival", // arrival vs departure list - arrival default
      startDate: new Date(1517227200 * 1000) // 29.1.2018 13:00
      // endDate = startDate + 1 days
    }

    this.changeFlightDate = this.changeFlightDate.bind(this)
    this.fetchFlights = this.fetchFlights.bind(this)
    this.setFlights = this.setFlights.bind(this)
  }

  // Fetch arrival and departure data
  fetchFlights(date) {
    // clear current flight list so loading dots can be displayed
    this.setState({arrivals: [], departures: []})

    let startDate = date
    // endDate = startDay + 1 days // max + days is 7 by API
    let endDate = new Date(startDate)
    endDate = new Date(endDate.setDate(endDate.getDate() + 1))

    console.log("StartDate: " + startDate + "\nEndDate: " + endDate);

    // Convert to unix epoch for api call
    var startUnix = startDate.getTime() / 1000;
    var endUnix = endDate.getTime() / 1000;

    console.log("StartUnix: " + startUnix + "\nEndUnix: " + endUnix);

    //arrivals
    trackPromise(
      fetch(`https://opensky-network.org/api/flights/arrival?airport=LKMT&begin=${startUnix}&end=${endUnix}`)
        .then(response => {
          if (response.ok) {
            console.log('status:' + response.status + ' ok: ' + response.ok)
            return response.json()
          } else {
            console.log('status:' + response.status + ' ok: ' + response.ok)
            return Promise.reject(`No arrivals are found for the given period.
                                 \n start: ${startDate}
                                 \n end: ${endDate}
                                 \n HTTP stats 404 - Not found is returned with an empty response body.`)
          }
        })
        .then(data => this.setState({ arrivals: data }))
        .catch(error => {
          alert(error)
          this.setState({ arrivals: [] })
        }
        )
    );

    trackPromise(
      //departures
      fetch(`https://opensky-network.org/api/flights/departure?airport=LKMT&begin=${startUnix}&end=${endUnix}`)
        .then(response => {
          if (response.ok) {
            console.log('status:' + response.status + ' ok: ' + response.ok)
            return response.json()
          } else {
            console.log('status:' + response.status + ' ok: ' + response.ok)
            return Promise.reject(`No departures are found for the given period.
                                 \n start: ${startDate}
                                 \n end: ${endDate}
                                 \n HTTP stats 404 - Not found is returned with an empty response body.`)
          }
        })
        .then(data => this.setState({ departures: data }))
        .catch(error => {
          alert(error)
          this.setState({ departures: [] })
        }
        )
    );

    // Set DateTime value
    this.setState({ startDate: date })
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

