import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/userAdmin'
import regAuth from './modules/regAuth'
import bookAdmin from "@/store/modules/bookAdmin";
import genreAdmin from "@/store/modules/genreAdmin";
import authorAdmin from "@/store/modules/authorAdmin";
import bookInfo from "@/store/modules/bookInfo";
import Profile from "@/store/modules/Profile";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        admin,
        regAuth,
        bookAdmin,
        genreAdmin,
        authorAdmin,
        bookInfo,
        Profile
    }
});
