import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"
import axios from "axios";

export default {
    state: {
        ctxModal: ''
    },

    getters: {
        getCtxModalCom(state) {
            return state.ctxModal
        }
    },

    mutations: {
        setCtxModalCom(state, ctx) {
            state.ctxModal = ctx
        }
    },

    actions: {

        async addComment(ctx, data) {
            console.log(data);

            let isErrorExist = false
            let user = JSON.parse(localStorage.getItem('user'));
            let idUser = user.idUser;
            let response = await AXIOS.post('/comment/addComment',
                {
                    idUser: idUser,
                    idBook: data.idBook,
                    text: data.text
                }, {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error);
                })
                .then(res => {
                    ctx.dispatch("loadBookInfo", data.idBook);
                    if (!isErrorExist) {
                        let message = res.data.message
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async deleteComment(ctx, data) {
            let isErrorExist = false
            const response = AXIOS.get('/comment/delComment/' + data.idComment, {
                headers: authHeader()
            })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data);
                }).then(response => {
                    if (!isErrorExist) {
                        ctx.dispatch("loadBookInfo", data.idBook);
                        let message = "Комментарий успешно удалён!"
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async editComment(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.post('/comment/editComment',
                {
                    idComment: data.idComment,
                    text: data.text
                }, {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error);
                })
                .then(res => {
                    if (!isErrorExist) {
                        ctx.dispatch("loadBookInfo", data.idBook);
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
