/* import modules */
import axios from 'axios';

/* api instance */
const busQueryInstance = axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 1000,
});

/* bus query api */
const successCb = response => {
    if (response.data && !response.data.error)
        return response.data;
};
const errorCb = (error, url) => error => {
    console.error(`Request ${url} error:`, error);
};

// get bus line list
export const getBusLineList = query => {
    const key = encodeURIComponent(query),
          url = '/real_time/bus_line_list';

    return busQueryInstance.post(url, { key })
            .then(successCb)
            .catch(e => errorCb(e, url));
};

// get bus station list
export const getBusStationList = id => {
    const url = '/real_time/bus_station_list';

    return busQueryInstance.post(url, { id })
            .then(successCb)
            .catch(e => errorCb(e, url));
};

// get bus real-time status
export const getBusRealTimeStatus = (number, station) => {
    const url = '/real_time/bus_real_time_status',
          id = encodeURIComponent(number),
          fromStation = encodeURIComponent(station);

    return busQueryInstance.post(url, { id, fromStation })
            .then(successCb)
            .catch(e => errorCb(e, url));
};