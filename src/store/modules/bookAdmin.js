import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"
import axios from "axios";

export default {
    state: {
        cardInfo: [],
        editBookModal: []
    },

    getters: {
        getCardInfo(state) {
            return state.cardInfo
        },
        getEditBookDataModal(state) {
            return state.editBookModal
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
        }
    },

    actions: {

        async uploadBookInetImage(ctx, data) {
            console.log(data)
            let isErrorExist = false
            let response = await AXIOS.post('/admin/uploadBookInetImage',
                data,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                    /* , Accept: 'application/json'*/
                }).catch(error => {
                console.log(error.response.data);
                let erMes = document.getElementById('idBookError')
                erMes.innerText = error.response.data.message
            })
                .then(res => {
                    if (!isErrorExist) {
                        let message = res.data.message
                        window.location.href = "/";
                    }
                });
        },

        async uploadBookUserImage(ctx, data) {
            console.log(data)
            let isErrorExist = false
            let response = await AXIOS.post('/admin/uploadBookUserImage',
                data,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                }).catch(error => {
                console.log(error.response.data);
                let erMes = document.getElementById('idBookError')
                erMes.innerText = error.response.data.message
            })
                .then(res => {
                    if (!isErrorExist) {
                        let message = res.data.message
                        window.location.href = "/";
                    }
                });
        },

        async updBookData(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.post('/admin/updBookData',
                data.baseData,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data);
                }).then(response => {
                    console.log("УСПЕХ");
                    console.log(response.data);
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
            ctx.commit("cleanCardInfo");
            let link
            if(data.mode === "all") {
                link = "/book/searchBook/all/"
            }
            if(data.mode === "byName") {
                link = "/book/searchBook/byName/"
            }
            if(data.mode === "byGenreName") {
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
                        let url = response.data.items[0].volumeInfo.imageLinks.smallThumbnail
                        ctx.commit("swapData", {element: element, url: url});
                    })
                    .catch(error => {
                        console.log("Произошла ошибка:")
                        console.log(error)
                    })
            })

            ctx.commit("fillCardInfo", response.data);
        }
    }
}
