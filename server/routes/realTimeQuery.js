//import modules
const log = require('../log.js');
const { getValue } = require('../utils.js');

// import api request
const { getBusLineList, getBusStationList, getBusRealTimeStatus } = require('../api/realTimeQuery');

const route4getBusLineList = async (ctx, next) => {
    try {
        const key = getValue(ctx.request.body, 'key');
        const result = await getBusLineList(key);
        ctx.response.body = JSON.stringify(result);
    } catch (error) {
        log.error('An error occurred:', error.message);
        ctx.response.body = { data: null, error };
    }
};

const route4getBusStationList = async (ctx, next) => {
    try {
        const id = getValue(ctx.request.body, 'id');
        const result = await getBusStationList(id);
        ctx.response.body = JSON.stringify(result);
    } catch (error) {
        log.error('An error occured:', error.message);
        ctx.response.body = { data: null, error };
    }
};

const route4getBusRealTimeStatus = async (ctx, next) => {
    try {
        const id = getValue(ctx.request.body, 'id'),
              fromStation = getValue(ctx.request.body, 'fromStation');
        const result = await getBusRealTimeStatus(id, fromStation);
        ctx.response.body = JSON.stringify(result);
    } catch (error) {
        log.error('An error occured:', error.message);
        ctx.response.body = { data: null, error };
    }
};



module.exports = {
    'POST /real_time/bus_line_list': route4getBusLineList,
    'POST /real_time/bus_station_list': route4getBusStationList,
    'POST /real_time/bus_real_time_status': route4getBusRealTimeStatus
};