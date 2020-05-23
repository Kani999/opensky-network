import React from "react";
import { trackPromise } from 'react-promise-tracker';
import './flight-data.style.css'

function flightData(WrappedComponent, startUnix, endUnix, type = 'arrival', airport = 'LKMT') {
    const url = `https://opensky-network.org/api/flights/${type}?airport=${airport}&begin=${startUnix}&end=${endUnix}`

    class WithFetchData extends React.Component {
        _isMounted = false;

        state = {
            data: [],
            error: false
        };

        componentDidMount() {
            this._isMounted = true;

            trackPromise(
                fetch(url)
                    .then(response => {
                        if (response.status === 200) {
                            return response.json()
                        } else if (response.status === 404) {
                            console.log(`No ${type} are found for the given time period.`)
                            return []
                        }
                    })
                    .catch(error => {
                        console.log(`Error: ${error}`)
                        if (this._isMounted) {
                            this.setState({ error })
                        }
                    })
                    .then(data => {
                        if (this._isMounted) {
                            this.setState({ data })
                        }
                    })
            )
        };

        componentWillUnmount() {
            this._isMounted = false;
        };

        render() {
            const { data, error } = this.state;
            if (error) return <div className="fetch-error"><p>Data could not be fetched! Try again later.</p></div>
            return <WrappedComponent flights={data} type={type} {...this.props} />;
        };
    }

    WithFetchData.displayName = `WithFetchData(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"})`;
    return WithFetchData;
}

export default flightData;
