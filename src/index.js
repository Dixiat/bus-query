// vue
import Vue from 'vue';
import { Vuetify, VApp, VNavigationDrawer, VSubheader, VTextField, VList, VBtn, VDivider, VToolbar, VIcon, VGrid } from 'vuetify';

// styles
import 'vuetify-stylus/app.styl';
import './styles/icons.css';
import './styles/transitions.css';

// store
import store from './store/index';

// router
import router from './router';
import Layout from 'views/layout'

// use elements
Vue.use(Vuetify, {
    components: {
      VApp,
      VNavigationDrawer,
      VSubheader,
      VTextField,
      VList,
      VBtn,
      VDivider,
      VToolbar,
      VIcon,
      VGrid
    }
});

const app = new Vue({
    el: '#app',
    template: '<div><layout></layout></div>',
    components: {Layout},
    router,
    store
});