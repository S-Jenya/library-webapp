import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"
import toastFunc from "@/toastFunc";

export default {
    state: {
        genre: [],
        genreModal: {
            title: '',
            text: '',
            inputText: '',
            idGenre: '',
            mode: '',    // 0 - new; 1 - edit
            status: ''
        },
        serverStatus: ""
    },

    getters: {
        getGenres(state) {
            return state.genre;
        },
        getGenreModal(state) {
            return state.genreModal;
        },
        getGenreStatus(state) {
            console.log("getGenreStatus: " + state.lastStatus)
            return state.serverStatus
        }
    },

    mutations: {
        fillGenre(state, data) {
            data.forEach(element => state.genre.push(element));
        },
        cleanGenre(state) {
            state.genre = []
        },
        cleanGenreModal(state) {
            state.genreModal = {}
        },
        setGenreModal(state, data) {
            state.genreModal = {};
            state.genreModal.title = data.title;
            state.genreModal.text = data.text;
            state.genreModal.inputText = data.inputText;
            state.genreModal.idGenre = data.idGenre;
            state.genreModal.mode = data.mode;
        },
        changeInput(state, data) {
            state.genreModal.inputText = data.str;
            console.log(state.genreModal.inputText)
        },
        setServerResult(state, data) {
            console.log("setStatus data: ")
            console.log(data)
            state.serverStatus = data.status
        }
    },

    actions: {
        async getGenreList(ctx) {
            let response = await AXIOS.get('/getGenres',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanGenre");
            ctx.commit("fillGenre", response.data);
        },

        async addGenre(ctx, data) {

            console.log(data);
            let response = await AXIOS.post('/admin/addGenre',
                {
                    name: data.name
                },
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    var erMes = document.getElementById('idGenreError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.commit("setServerResult", res);
                    ctx.commit("cleanGenre");
                    // toastFunc('success');
                    ctx.commit("fillGenre", response.data);
                });
        },

        async updGenre(ctx, data) {
            let response = await AXIOS.post('/admin/updateGenre',
                {
                    id: data.id,
                    name: data.name
                },
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    var erMes = document.getElementById('idGenreError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.commit("setServerResult", res);
                    ctx.commit("cleanGenre");
                    ctx.commit("fillGenre", res.data.toString());
                     this.$bvToast.toast('Toast body content', {
                         title: `Variant ${'success' || 'default'}`,
                         variant: 'success',
                         solid: true
                     })
                });
        }
    }
}
