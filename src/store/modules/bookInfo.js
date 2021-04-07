import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"
import axios from "axios";

export default {
    state: {
        bookInfo: []
    },

    getters: {
        getBookInfo(state) {
            console.log("RETURN: ");
            console.log(state.bookInfo);
            return state.bookInfo
        }
    },

    mutations: {
        async fillBookInfo(state, data) {
            state.bookInfo = data;
        },
        cleanBookInfo(state) {
            state.bookInfo = []
        }
    },

    actions: {
        async loadBookInfo(ctx, idBook) {

            let response = await AXIOS.get('/book/getInfo/' + idBook,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data);
                }).then(response => {
                    if (!response.data.fromData) {

                        axios.get(response.data.url)
                            .then(googleResponse => {
                                let url = googleResponse.data.items[0].volumeInfo.imageLinks.smallThumbnail
                                ctx.commit("swapData", {element: response.data, url: url});
                            })
                            .catch(error => {
                                console.log("Произошла ошибка:")
                                console.log(error)
                            })
                    }
                    ctx.commit("cleanBookInfo");
                    ctx.commit("fillBookInfo", response.data);
                });
        },

        async downloadBook(ctx, data) {
            console.log("Data:")
            console.log(data)
            let user = JSON.parse(localStorage.getItem('user'));
            let idUser = user.idUser;

            let isErrorExist = false
            let response = await AXIOS.get('/book/downloadBookContent/' + idUser + '/' + data.idBook,
                {
                    responseType: 'blob',
                    headers: authHeader(),
                    'Content-Type': 'application/pdf'
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data);
                })
                .then((response) => {
                    console.log(response);
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);

                    fileLink.click();

                    if (!isErrorExist) {
                        let message = "Файл успешно скачен"
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }

                });

        },

        async deleteBook(ctx, data) {
            let isErrorExist = false
            let response = await AXIOS.delete('/admin/book/deleteBook/' + data.id,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error);
                })
                .then(res => {
                    if (!isErrorExist) {
                        let message = res.data.message
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                        window.location.href = "/";
                    }
                });
        }

    }
}
