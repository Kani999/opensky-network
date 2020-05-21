/*
* airport - ICAO identier for the airport
* startUnix - Start of time interval to retrieve flights for as Unix time (seconds since epoch)
* endUnix - End of time interval to retrieve flights for as Unix time (seconds since epoch)
* type - arrival/departure
*/
export function fetchFlightsApi(startUnix, endUnix, type = 'arrival', airport = 'LKMT') {
    if (type !== 'arrival' && type !== 'departure') {
        alert("Wrong flight type: " + type + "\n only arrival/departure allowed")
        return fetch().then(response => { return response.json() })
    }

    return fetch(`https://opensky-network.org/api/flights/${type}?airport=${airport}&begin=${startUnix}&end=${endUnix}`)
        .then(response => {
            if (response.ok) {
                console.log('status:' + response.status + ' ok: ' + response.ok)
                return response.json()
            } else {
                console.log('status:' + response.status + ' ok: ' + response.ok)
                return Promise.reject(`No ${type} are found for the given period.
                                 \n start: ${startUnix}
                                 \n end: ${endUnix}
                                 \n HTTP stats 404 - Not found is returned with an empty response body.`)
            }
        })
}