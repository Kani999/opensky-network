# Flightboard of Leoš Janáček Airport
## Opensky Network simple React app [Opensky Network API](https://opensky-network.org/apidoc/rest.html)

Implementation of an application that will serve as a flightboard for flights from Leoš Janáček Airport.
Data are obtained from the open [OpenSky REST API](https://opensky-network.org/apidoc/rest.html)

- Application functionalities:
  - [x] Option to select the date of arrivals/departures (saved in localStorage)
  - [x] Arrivals/Departures switch (saved in localStorage)
  - [x] List of arrivals/departures data
  - [x] Ability of finding a flight according to Call Sing value
  - [x] Application switchs between arrivals/departures every 30 seconds
  - [ ] Unit tests are not implemented

- Recommended:
  - [x] ReactJS, PropTypes
  - [x] CRA,  ~~ParcelJS~~
  - [x] React Hooks - useState, useEffect
  - [x] ErrorBoundary
  - [x] HOC

- To-do list:
  - [ ] Unit tests
  - [ ] Html/css refactor
  - [ ] Mobile friendly desing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Check it out

[Served by Heroku](https://opensky-network.herokuapp.com/)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
