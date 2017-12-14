import { ADD_QUERY_HISTORY_ITEM, DELETE_QUERY_HISTORY_ITEM, CLEAR_QUERY_HISTORY_LIST, UPDATE_QUERY_RESULT, CLEAR_QUERY_RESULT, SELECT_BUS_LINE } from '../mutationTypes';

import { getBusLineList } from '../../api';

const realTimeQuery = {
    namespaced: true,
    state: {
        queryResults: {},
        queryHistoryList: [],
        selectedBusLine: '',
        busStationStatus: {},
        realTimeStatus: {}
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
        getRealTimeStatusFromQuery({ commit, state, getters }, id) {
            commit(SELECT_BUS_LINE, id);
            commit(ADD_QUERY_HISTORY_ITEM, getters.selectedBusLineInfo);
        },
        getRealTimeStatusFromHistory({ commit, state, getters }, id) {
            commit(SELECT_BUS_LINE, id);
        }
    }
};

export default realTimeQuery;