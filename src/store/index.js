import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/administration'
import regAuth from './modules/regAuth'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        admin,
        regAuth
    }
});
