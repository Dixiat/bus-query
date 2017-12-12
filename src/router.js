import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewRealTimeQuery from 'views/realTimeQuery';

Vue.use(VueRouter);

const routes = [
    { path: '/real_time', component: ViewRealTimeQuery }
];
const router = new VueRouter({ routes });
router.replace({ path: '/real_time', component: ViewRealTimeQuery });

export default router;