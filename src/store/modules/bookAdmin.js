import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        cardInfo: []
    },

    getters: {
        getCardInfo(state) {
            return state.cardInfo
        }
    },

    mutations: {
        fillCardInfo(state, data) {
            data.forEach(element => state.cardInfo.push(element));
        },
        cleanCardInfo(state) {
            state.cardInfo = []
        }
    },

    actions: {
        async uploadBook(ctx, data) {
            console.log(data)
            let response = await AXIOS.post('/admin/uploadBook',
                data,
                {
                    headers: authHeader()
                   , "Content-Type": "multipart/form-data"
                    /* , Accept: 'application/json'*/
                }).catch(error => {
                console.log(error.response.data);
            });
        },

        async loadCardList(ctx) {
            let response = await AXIOS.get('/cards/getListCards',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanCardInfo");
            ctx.commit("fillCardInfo", response.data);
        }
    }
}
