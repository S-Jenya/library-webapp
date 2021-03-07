import {AXIOS} from "@/httpCommons";

export default {
    state: {
        registration: {
            name: '',
            email: '',
            password: ''
        }
    },

    mutations: {
        clearRegData(state) {
            console.log("Произошла очистка поля registration!")
            state.registration = []
        },
        setRegData(state, data) {
            state.registration.name = data.name;
            state.registration.email = data.email;
            state.registration.password = data.password;
        }
    },

    actions: {
        async createUser(ctx, data) {
            let response = await AXIOS.post('/registration/createUser',
                {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            );
            ctx.commit("clearListRole");
        }
    }
}
