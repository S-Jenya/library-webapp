import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/administration'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        admin
    }
});
