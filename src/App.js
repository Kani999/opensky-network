import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'
import { FlightSwitch } from './components/flight-switch/flight-switch.component'

class App extends Component {
  constructor() {
    super()

    this.state = {
      arrivals: [],
      departures: [],
      // arrival vs departure list - arrival default
      selectedFlights: "arrival"
    }
  }

  componentDidMount() {
    fetch('https://opensky-network.org/api/flights/departure?airport=EDDF&begin=1517227200&end=1517230800')
      .then(response => response.json())
      .then(departures => this.setState({ departures: departures }))

    // Load default flights as arrival
    fetch('https://opensky-network.org/api/flights/arrival?airport=EDDF&begin=1517227200&end=1517230800')
      .then(response => response.json())
      .then(arrivals => this.setState({ arrivals: arrivals }))
  }

  // sets selectedFlights - Default arrival
  handleOptionChange = changeEvent => {
    const status = changeEvent.target.value

    if (status === "arrival") {
      this.setState({ selectedFlights: status });

    } else if (status === "departure") {
      this.setState({ selectedFlights: status });

    } else { //default - different value selected
      this.setState({ selectedFlights: "arrival" });
    }
  };

  setFlights(type) {
    const flights = (type === "arrival") ? this.state.arrivals : this.state.departures;
    return flights
  }

  render() {
    // arrival vs departure
    const flightType = this.state.selectedFlights;
    const flights = this.setFlights(flightType);

    return (
      <div className="App">
        <FlightSwitch handleOptionChange={this.handleOptionChange} flightType={flightType}></FlightSwitch>
        <FlightList flights={flights} type={flightType} />
      </div>
    );
  }
}

export default App;

