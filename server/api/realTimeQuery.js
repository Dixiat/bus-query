const { busQueryInstance } = require('./common');

/* define api request callback */
const successCb = response => { 
    return { data: response.data, error: null };
};
const errorCb = error => {
    return { data: null, error };
};

/* define api request */
const getBusLineList = key => {
    const timestamp = Date.now();

    return busQueryInstance.get(`/Handlers/BusQuery.ashx?handlerName=GetLineListByLineName&key=${key}&_=${timestamp}`)
                           .then(successCb)
                           .catch(errorCb);
};

const getBusStationList = id => {
    const timestamp = Date.now();
    return busQueryInstance.get(`/StationList/GetStationList?id=${id}&_=${timestamp}`)
                           .then(successCb)
                           .catch(errorCb);
};

const getBusRealTimeStatus = (id, fromStation) => {
    const timestamp = Date.now();
    return busQueryInstance.get(`/RealTime/GetRealTime?id=${id}&fromStation=${fromStation}&_=${timestamp}`)
                           .then(successCb)
                           .catch(errorCb);
};

module.exports = {
    getBusLineList,
    getBusStationList,
    getBusRealTimeStatus
};

