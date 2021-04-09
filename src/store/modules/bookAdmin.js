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

        async loadCardList(ctx) {
            let response = await AXIOS.get('/cards/getListCardsTwo',
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


            console.log(" SEC response")
            console.log(response)
            ctx.commit("cleanCardInfo");
            ctx.commit("fillCardInfo", response.data);
        },
        async updBookData(ctx, data) {
            let response = await AXIOS.post('/admin/updBookData',
                data,
                {
                    headers: authHeader()
                    , "Content-Type": "multipart/form-data"
                }).catch(error => {
                console.log(error.response.data);
            })
                .then(res => {
                    console.log(res);
                });
        }
    }
}
