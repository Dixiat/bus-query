import { GOTO_MAIN_PAGE, GOTO_SUB_PAGE } from '../mutationTypes';

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
    }
};

export default common;