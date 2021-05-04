import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"
import axios from "axios";

export default {
    state: {
        cardInfo: [],
        editBookModal: [],
        isLoading: true
    },

    getters: {
        getCardInfo(state) {
            return state.cardInfo
        },
        getEditBookDataModal(state) {
            return state.editBookModal
        },
        bookIsLoading(state) {
            return state.isLoading
        }
    },

    mutations: {
        async fillCardInfo(state, data) {
            data.forEach(element => {
                state.cardInfo.push(element)
            });
        },
        cleanCardInfo(state) {
            state.cardInfo = []
        },
        swapData(state, data) {
            data.element.url = data.url
        },
        setEditDataModal(state, data) {
            state.editBookModal.title = data.title
            state.editBookModal.text = data.text
        },
        finishBookLoad(state) {
            state.isLoading = false
        },
        startBookLoad(state) {
            state.isLoading = true
        }
    },

    actions: {

        async uploadBookInetImage(ctx, data) {
            console.log(data);
            ctx.dispatch("checkAuthData").then(i => {
                if (i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let response = await AXIOS.post('/admin/uploadBookInetImage',
                data.book,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                    /* , Accept: 'application/json'*/
                })
                .catch(error => {
                    isErrorExist = true
                    let message = error.response.data.message
                    let erMes = document.getElementById('idBookError')
                    erMes.innerText = message
                    setTimeout(() => (data.vm.$bvToast.toast(message, {
                        title: 'Ошибка',
                        variant: 'danger',
                        solid: true
                    })), 10)
                })
                .then(result => {
                    if (!isErrorExist && result.status === 200) {
                        let message = "Книга успешно добавлена"
                        data.vm.$bvModal.msgBoxOk(message, {
                            title: 'Регистрация',
                            size: 'md',
                            buttonSize: 'lg',
                            okVariant: 'success',
                            okTitle: 'Принять',
                            footerClass: 'p-2',
                            hideHeaderClose: false,
                            centered: true
                        })
                            .then(value => {
                                if (value) {
                                    document.location.href = "/"
                                }
                            })
                    }
                });
        },

        async uploadBookUserImage(ctx, data) {
            console.log(data)
            ctx.dispatch("checkAuthData").then(i => {
                if (i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            console.log("GGG")
            let response = await AXIOS.post('/admin/uploadBookUserImage',
                data.book,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                })
                .catch(error => {
                    isErrorExist = true
                    let message = error.response.data.message
                    let erMes = document.getElementById('idBookError')
                    erMes.innerText = message
                    setTimeout(() => (data.vm.$bvToast.toast(message, {
                        title: 'Ошибка',
                        variant: 'danger',
                        solid: true
                    })), 10)
                })
                .then(result => {
                    if (!isErrorExist && result.status === 200) {
                        let message = result.data.message
                        data.vm.$bvModal.msgBoxOk(message, {
                            title: 'Регистрация',
                            size: 'md',
                            buttonSize: 'lg',
                            okVariant: 'success',
                            okTitle: 'Принять',
                            footerClass: 'p-2',
                            hideHeaderClose: false,
                            centered: true
                        })
                            .then(value => {
                                if (value) {
                                    document.location.href = "/"
                                }
                            })
                    }
                });
        },

        async updBookData(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if (i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let response = await AXIOS.post('/admin/updBookData',
                data.baseData,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                })
                .catch(error => {
                    isErrorExist = true
                    let message = error.response.data.message
                    let erMes = document.getElementById('idEditBookError')
                    erMes.innerText = message
                    setTimeout(() => (data.vm.$bvToast.toast(message, {
                        title: 'Ошибка',
                        variant: 'danger',
                        solid: true
                    })), 10)
                }).then(response => {
                    if (!isErrorExist) {
                        ctx.dispatch("loadBookInfo", data.idBook);
                        data.vm.$bvModal.hide('idEditBookModal')
                        let message = "Унига успешно обновлена!"
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },

        async filterCard(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if (i) {
                    ctx.dispatch("logout")
                }
            })
            ctx.commit("startBookLoad")
            ctx.commit("cleanCardInfo");
            let link
            if (data.mode === "all") {
                link = "/book/searchBook/all/"
            }
            if (data.mode === "byName") {
                link = "/book/searchBook/byName/"
            }
            if (data.mode === "byGenreName") {
                link = "/book/searchBook/byGenreName/"
            }
            let response = await AXIOS.get(link + data.strSearch,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data);
                });

            response.data.forEach(element => {
                axios.get(element.url)
                    .then(response => {
                        if (response.data.items !== undefined) {
                            let url = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
                            ctx.commit("swapData",
                                {
                                    element: element,
                                    url: url
                                });
                        }
                    })
                    .catch(error => {
                        console.log("Произошла ошибка:")
                        console.log(error)
                    })
            })
            ctx.commit("fillCardInfo", response.data);
            ctx.commit("finishBookLoad")
        },
    }
}
