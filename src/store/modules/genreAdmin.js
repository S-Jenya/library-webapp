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
            mode: ''    // 0 - new; 1 - edit
        }
    },

    getters: {
        getGenres(state) {
            return state.genre;
        },
        getGenreModal(state) {
            return state.genreModal;
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
        }
    },

    actions: {
        async getGenreList(ctx) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })

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
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let response = await AXIOS.post('/admin/addGenre',
                {
                    name: data.name
                },
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    let erMes = document.getElementById('idGenreError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.dispatch("getGenreList");
                    if (!isErrorExist) {
                        let message = res.data.message
                        data.vm.$bvModal.hide('idGenreModal')
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async updGenre(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })

            let isErrorExist = false
            let response = await AXIOS.post('/admin/updateGenre',
                {
                    id: data.id,
                    name: data.name
                },
                {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data.message);
                    let erMes = document.getElementById('idGenreError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.dispatch("getGenreList");
                    if (!isErrorExist) {
                        let message = res.data.message
                        // data.vm.closeGenreModal()
                        data.vm.$bvModal.hide('idGenreModal')
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async deleteGenre(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let response = await AXIOS.delete('/admin/deleteGenre/' + data.id,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    // console.log(error.response.data.message);
                    let message = error.response.data.message
                    setTimeout(() => (data.vm.$bvToast.toast(message, {
                        title: 'Ошибка',
                        variant: 'danger',
                        solid: true
                    })), 10)
                })
                .then(res => {
                    ctx.dispatch("getGenreList");
                    if (!isErrorExist) {
                        // console.log( res.data.message )
                        let message = res.data.message
                        // data.vm.closeGenreModal()
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        }
    }
}
