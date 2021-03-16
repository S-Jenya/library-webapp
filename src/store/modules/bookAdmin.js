import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {

    },

    getters: {
    },

    mutations: {
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
        }
    }
}
