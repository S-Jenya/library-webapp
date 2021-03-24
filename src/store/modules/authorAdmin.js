import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        authorModal: {
            titleAuthModal: '',

            inputFirstName: '',
            inputLastName: '',
            inputPatronymic: '',

            idAuth: '',
            mode: ''    // 0 - new; 1 - edit
        },
        author: []
    },

    getters: {
        getAuthModal(state) {
            return state.authorModal
        },
        getAuthor(state) {
            return state.author;
        }
    },

    mutations: {
        setAuthModal(state, data) {
            state.authorModal.titleAuthModal = data.title;
            state.authorModal.inputFirstName = data.inputFirstName;
            state.authorModal.inputLastName = data.inputLastName;
            state.authorModal.inputPatronymic = data.inputPatronymic;

            state.authorModal.idAuth = data.idAuth;
            state.authorModal.mode = data.mode;
        },
        fillAuthor(state, data) {
            data.forEach(element => state.author.push(element));
        },
        cleanAuthor(state) {
            state.author = []
        }
    },

    actions: {
        async getAuthorList(ctx) {
            let response = await AXIOS.get('/admin/getAuthors',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanAuthor");
            ctx.commit("fillAuthor", response.data);
        },

        async addAuthor(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.post('/admin/addAuthor',
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    patronymic: data.patronymic
                }, {headers: authHeader()})
                .catch(error => {
                    console.log(error.response.data);
                    let erMes = document.getElementById('idAuthorError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.dispatch("getAuthorList");
                    if (!isErrorExist) {
                        let message = res.data.message
                        data.vm.$bvModal.hide('authorModal')
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async editAuthor(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.post('/admin/editAuthor',
                {
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    patronymic: data.patronymic
                }, {headers: authHeader()})
                .catch(error => {
                    console.log(error.response.data);
                    let erMes = document.getElementById('idAuthorError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.dispatch("getAuthorList");
                    if (!isErrorExist) {
                        let message = res.data.message
                        data.vm.$bvModal.hide('authorModal')
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async deleteAuthor(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.delete('/admin/deleteAuthor/' + data.id,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    let message = error.response.data.message
                    setTimeout(() => (data.vm.$bvToast.toast(message, {
                        title: 'Ошибка',
                        variant: 'danger',
                        solid: true
                    })), 10)
                })
                .then(res => {
                    ctx.dispatch("getAuthorList");
                    if (!isErrorExist) {
                        let message = res.data.message
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
