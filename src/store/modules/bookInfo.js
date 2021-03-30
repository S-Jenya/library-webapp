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
                    if(!response.data.fromData) {

                        console.log("EE");
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
        }
    }
}
