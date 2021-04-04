import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        UserDataProfile: [],
        isLoadDataProfile: false
    },

    getters: {
        getUserDataProfile(state) {
            return state.UserDataProfile
        },
        isLoadDataProfile(state) {
            return state.isLoadDataProfile;
        }
    },

    mutations: {
        cleanUserDataProfile(state) {
            state.UserDataProfile = []
        },
        async fillUserDataProfile(state, data) {
            state.UserDataProfile = data
            console.log(state.UserDataProfile);
            state.isLoadDataProfile = true
        },
    },

    actions: {

        async loadUserData(ctx) {
            let isErrorExist = false

            let user = JSON.parse(localStorage.getItem('user'));
            let idUser = user.idUser;
            let response = await AXIOS.get('/user/getUserData/' + idUser,
                {
                    headers: authHeader(),
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data);
                })


            ctx.commit("cleanUserDataProfile");
            ctx.commit("fillUserDataProfile", response.data);
        }
    }
}
