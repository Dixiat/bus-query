import { ADD_QUERY_HISTORY_ITEM, DELETE_QUERY_HISTORY_ITEM, CLEAR_QUERY_HISTORY_LIST, UPDATE_QUERY_RESULT, CLEAR_QUERY_RESULT, SELECT_BUS_LINE, UPDATE_BUS_STATION_LIST } from '../mutationTypes';

import { getBusLineList, getBusStationList, getBusRealTimeStatus } from '../../api';

const realTimeQuery = {
    namespaced: true,
    state: {
        queryResults: {},
        queryHistoryList: [],
        selectedBusLine: '',
        busStationList: [],
        busStationStatus: {},
    },
    getters: {
        busLines(state) {
            let busLines = [];
            const queryResults = state.queryResults;
            if (queryResults && queryResults.data && !queryResults.error) {
                const { data, flag } = queryResults.data;
                if (data && flag !== 1004) {
                    busLines = data.map(result => ({
                        id: result.Id,
                        number: result.LineNumber,
                        direction: `${result.FromStation} -> ${result.ToStation}`,
                        fromStation: result.FromStation,
                        toStation: result.ToStation,
                        price: result.Price,
                        beginTime: result.BeginTime,
                        endTime: result.EndTime
                    }));
                }
            }
            return busLines;
        },
        selectedBusLineInfo(state, getters) {
            const busLines = getters.busLines.length ? getters.busLines
                                                     : state.queryHistoryList;
            return busLines.find(line => {
                return line.id === state.selectedBusLine;
            });
        },
        showQueryResult(state, getters) {
            return !!getters.busLines.length;
        },
        realTimeStatus(state) {
            let realTimeStatus = [];
            const busStationList = state.busStationList;
            if (busStationList && busStationList.data && !busStationList.error) {
                const { data, flag } = busStationList.data;
                if (data && flag !== 1004) {
                    realTimeStatus = data.map(busStation => ({
                        id: busStation.Id,
                        stationName: busStation.Name,
                        busListAtStation: [],
                        busListBeforeStation: []
                    }));
                }
            }
            return realTimeStatus;
        }
    },
    mutations: {
        [ADD_QUERY_HISTORY_ITEM](state, item) {
            if (!state.queryHistoryList.find(listItem => listItem.id === item.id ))
                state.queryHistoryList = [...state.queryHistoryList, item];
        },
        [DELETE_QUERY_HISTORY_ITEM](state, index) {
            state.queryHistoryList.splice(index, 1);
        },
        [CLEAR_QUERY_HISTORY_LIST](state) {
            state.queryHistoryList = [];
        },
        [UPDATE_QUERY_RESULT](state, queryResults) {
            state.queryResults = queryResults;
        },
        [CLEAR_QUERY_RESULT](state) {
            state.queryResults = {};
        },
        [SELECT_BUS_LINE](state, id) {
            state.selectedBusLine = id;
        },
        [UPDATE_BUS_STATION_LIST](state, busStationList) {
            state.busStationList = busStationList;
        }
    },
    actions: {
        async getQueryResult({ commit, state }, query) {
            if (query) {
                const queryResults = await getBusLineList(query);
                commit(UPDATE_QUERY_RESULT, queryResults);
            } else {
                commit(CLEAR_QUERY_RESULT);
            }
        },
        async getRealTimeStatusFromQuery({ commit, state, getters }, id) {
            // 获取查询路线信息
            commit(SELECT_BUS_LINE, id);
            commit(ADD_QUERY_HISTORY_ITEM, getters.selectedBusLineInfo);
            // 获取并更新路线站点列表
            const stationList = await getBusStationList(id);
            commit(UPDATE_BUS_STATION_LIST, stationList);
            // 获取公交实时信息
            const { number, fromStation} = getters.selectedBusLineInfo;
            const realTimeStatus = await getBusRealTimeStatus(number, fromStation);
        },
        getRealTimeStatusFromHistory({ commit, state, getters }, id) {
            commit(SELECT_BUS_LINE, id);
        }
    }
};

export default realTimeQuery;