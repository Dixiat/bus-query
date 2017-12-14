import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import realTimeQuery from './modules/realTimeQuery';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        common,
        realTimeQuery
    }
});

export default store;