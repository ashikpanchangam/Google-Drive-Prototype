import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        gridView: true,

        detailsSectionOpen: false,

        folderSelected: -1,

        fileSelected: -1,

        recentFileSelected: -1
    }

})