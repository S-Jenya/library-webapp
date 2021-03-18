import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        genre: []
    },

    getters: {
        getGenres(state) {
            return state.genre;
        }
    },

    mutations: {
        fillGenre(state, data) {
            data.forEach(element => state.genre.push(element));
        },
        cleanGenre(state) {
            state.genre = []
        }
    },

    actions: {
        async getGenreList(ctx) {
            let response = await AXIOS.get('/admin/getGenres',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanGenre");
            ctx.commit("fillGenre", response.data);
        },

        async addGenre(ctx, data) {
            let response = await AXIOS.post('/admin/addGenre',
                {
                    name: data.name
                }, {headers: authHeader()}).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanGenre");
            getGenreList();
            ctx.commit("fillGenre", response.data);
        }
    }
}
