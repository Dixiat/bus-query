import { GOTO_MAIN_PAGE, GOTO_SUB_PAGE } from '../mutationTypes';

const routesMap = {
    'real_time': 'realTimeQuery'
};

const common = {
    namespaced: true,
    state: {
        isInMainPage: true
    },
    mutations: {
        [GOTO_MAIN_PAGE](state) {
            state.isInMainPage = true;
        },
        [GOTO_SUB_PAGE](state) {
            state.isInMainPage = false;
        }
    },
    actions: {
        backforward({ commit }) {
            commit(GOTO_MAIN_PAGE);
        }
    }
};

export default common;