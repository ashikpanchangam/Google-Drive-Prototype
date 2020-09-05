import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// LightBootstrap plugin
import BootstrapMain from './bootstrap-main'

import { store } from './store/store'

// router setup
import routes from './routes/routes'

// plugin setup
Vue.use(VueRouter)
Vue.use(BootstrapMain)

// configure router
const router = new VueRouter({
    routes // short for routes: routes
})

export const eventBus = new Vue({
    methods: {
        emitRecentFileDetails(recentFileDetails) {
            this.$emit('recentFileDetailsSent', recentFileDetails);
        },

        emitFolderDetails(folderDetails) {
            this.$emit('folderDetailsSent', folderDetails);
        },

        emitFileDetails(fileDetails) {
            this.$emit('fileDetailsSent', fileDetails);
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
})