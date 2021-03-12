import {AXIOS} from "@/httpCommons";

export default {
    state: {
        message: ''
    },

    getters: {
        isAuth() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (user === null) {
                return false
            } else {
                return true
            }
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
        },

        async loginSubmitHandler(ctx, data) {
            console.log(data)
            let response = await AXIOS.post('/authenticate',
                {
                    name: data.login,
                    password: data.password
                }
            ).then(result => {
                console.log('result from server:\n', result);
                if (result.status === 200) {
                    localStorage.setItem('user', JSON.stringify(result.data));
                    // console.log(JSON.parse(localStorage.getItem('user')));
                    document.location.href = "/"
                }

            }).catch(error => {
                document.getElementById('errorField').append(error.response.data.message)
                console.log(error.response.data);
            });
        },

        logout() {
            localStorage.removeItem('user');
            document.location.href = "/"
        }

    }
}
