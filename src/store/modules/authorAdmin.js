import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        authorModal: {
            titleAuthModal: '',
            textFirstName: '',
            textLastName: '',
            textPatronymic: '',
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
            state.authorModal.textFirstName = data.textFirstName;
            state.authorModal.textLastName = data.textLastName;
            state.authorModal.textPatronymic = data.textPatronymic;
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
            let response = await AXIOS.post('/admin/addAuthor',
                {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    patronymic: data.patronymic
                }, {headers: authHeader()}).catch(error => {
                console.log(error.response.data);
            });
        }
    }
}
