import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader";

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
                    login: data.login,
                    password: data.password
                }
            ).then(result => {
                if (result.status === 200) {
                    document.location.href = "/"
                }
            }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("clearListRole");
        },

        async loginSubmitHandler(ctx, data) {
            let response = await AXIOS.post('/authenticate',
                {
                    login: data.login,
                    password: data.password
                }
            ).then(result => {
                console.log('result from server:\n', result);
                if (result.status === 200) {
                    localStorage.setItem('user', JSON.stringify(result.data));
                    document.location.href = "/"
                }

            }).catch(error => {
                document.getElementById('errorField').append(error.response.data.message)
                console.log(error.response.data);
            });
        },

        async changeBaseUserData(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let response = await AXIOS.post('/user/changeBaseUserData',
                data.baseData,
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
                let erMes = document.getElementById('idPerDataChangeError')
                erMes.innerText = ""
                erMes.innerText = error.response.data.message
            })
                .then(res => {
                    if (!isErrorExist) {
                        if(data.mode === 0) {
                            let message = 'Логин успешно обновлён. Для продолжения работы пройдите повторную авторизацию'
                            data.vm.$bvModal.msgBoxOk(message, {
                                title: 'Смена логина',
                                size: 'lg',
                                buttonSize: 'sm',
                                okVariant: 'success',
                                // footerClass: 'p-2',
                                hideHeaderClose: false,
                                footerClass: 'p-2 border-top-0',
                                centered: true
                            })
                                .then(value => {
                                    if (value) {
                                        ctx.dispatch('logout')
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else {
                            let user = JSON.parse(localStorage.getItem('user'));
                            console.log(user)
                            user.login = data.baseData.login;
                            ctx.dispatch("loadUserData");
                            let message = res.data.message
                            data.vm.$bvModal.hide('idPerDataChangeModal')
                            setTimeout(() => (data.vm.$bvToast.toast(message, {
                                title: 'Успех',
                                variant: 'success',
                                solid: true
                            })), 10)
                        }
                    }
                });
        },

        logout() {
            localStorage.removeItem('user');
            document.location.href = "/"
        }

    }
}
