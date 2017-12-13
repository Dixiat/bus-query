import Vue from 'vue';
import VueRouter from 'vue-router';

import ViewRealTimeQuery from 'views/realTimeQuery';
import ViewRealTimeStatus from 'views/realTimeStatus';

Vue.use(VueRouter);

const routes = [
    { path: '/real_time', component: ViewRealTimeQuery },
    { path: '/real_time/status', component: ViewRealTimeStatus }
];
const router = new VueRouter({ routes });
router.replace({ path: '/real_time/status', component: ViewRealTimeStatus, props: true });

export default router;