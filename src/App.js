import React, { Component } from 'react';
import './App.css';
import { FlightList } from './components/flight-list/flight-list.component'

class App extends Component {
  constructor() {
    super()

    this.state = {
      arrivals: [],
      departures: []
  }
}

  componentDidMount() {
    fetch('https://opensky-network.org/api/flights/departure?airport=EDDF&begin=1517227200&end=1517230800')
    .then(response => response.json())
    .then(departures => this.setState({ departures: departures }))

    fetch('https://opensky-network.org/api/flights/arrival?airport=EDDF&begin=1517227200&end=1517230800')
    .then(response => response.json())
    .then(arrivals => this.setState({ arrivals: arrivals }))
  }

  render(){
    return (
      <div className="App">
        <FlightList flights={this.state.arrivals} type='arrival' />
        <FlightList flights={this.state.departures} type='departure' />
      </div>
    );
  }
}

export default App;

