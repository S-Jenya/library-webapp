import {AXIOS} from "@/httpCommons";
import authHeader from "@/authHeader"

export default {
    state: {
        nameNewRole: '',
        role: [],
        users: [],
        roleModal: {
            titleRoleModal: '',
            textRoleModal: '',
            inputText: '',
            idRole: '',
            mode: ''    // 0 - new; 1 - edit
        }
    },

    getters: {
        getRole(state) {
            return state.role;
        },
        getUsers(state) {
            return state.users;
        },
        getRoleModal(state) {
            return state.roleModal;
        },
        getId(state) {
            return state.roleModal.idRole;
        },
        getName(state) {
            return state.roleModal.inputText;
        },
        isAdmin() {
            let user = JSON.parse(localStorage.getItem('user'));
            if (typeof user === 'undefined' || user === null) {
                return false
            } else {
                if (user.roles[0] === "ADMIN") {
                    return true;
                } else {
                    return false
                }
            }

        },

        getAuthIdUser() {
            let user = JSON.parse(localStorage.getItem('user'));
            if(user !== null) {
                return user.idUser;
            }
        },

        getLocalStoreName() {
            if(localStorage.length > 1) {
                let user = JSON.parse(localStorage.getItem('user'));
                return user.name
            }
        }


    },

    mutations: {
        clearListRole(state) {
            state.role = []
        },
        fillRol(state, data) {
            data.forEach(element => state.role.push(element));
        },
        fillUsers(state,data) {
            data.forEach(element => state.users.push(element));
        },
        addRole(state, data) {
            this.nameNewRole = data.name;
        },
        setRoleModal(state, data) {
            state.roleModal.titleRoleModal = data.title;
            state.roleModal.textRoleModal = data.text;
            state.roleModal.inputText = data.inputText;
            state.roleModal.idRole = data.idRole;
            state.roleModal.mode = data.mode;
        },
        updNameRole(state, data) {
            state.roleModal.inputText = data.name;
        },
        cleanUserList(state) {
            state.users = []
        }
    },

    actions: {
        async loadRole(ctx) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let response = await AXIOS.get('/admin/getRole',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("clearListRole");
            ctx.commit("fillRol", response.data);
        },
        async loadUsers(ctx) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let response = await AXIOS.get('/admin/getUsers',
                {
                    headers: authHeader()
                })
                .catch(error => {
                    console.log(error.response.data);
                });
            ctx.commit("cleanUserList");
            ctx.commit("fillUsers", response.data);
        },
        async addRoleFunc(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            await AXIOS.post('/admin/addRole',
                {name: this.nameNewRole},
                {headers: authHeader()})
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data);
                    let erMes = document.getElementById('idRoleError')
                    erMes.innerText = error.response.data.message
                }).then(response => {
                    console.log(response.data);
                    if (!isErrorExist) {
                        ctx.dispatch("loadRole");
                        data.vm.$bvModal.hide('roleModal')
                        let message = response.data.message
                        setTimeout(() => (data.vm.$bvToast.toast(message, {
                            title: 'Успех',
                            variant: 'success',
                            solid: true
                        })), 10)
                    }
                });
        },
        async updRoleFunc(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            await AXIOS.post('/admin/updRole', {
                    id: data.id,
                    name: data.name
                },
                {
                    headers: authHeader()
                });
            ctx.commit("clearListRole");
            ctx.dispatch("loadRole");
        },

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

        getLocalStoreInfo() {
            console.log(JSON.parse(localStorage.getItem('user')))
        },

        checkAuthData() {
            let token = JSON.parse(localStorage.getItem('user'))
            // console.log(token)
            if (token !== null) {
                token = token.jwt
                let jsonJWT = JSON.parse(atob(token.split('.')[1]));
                // console.log(jsonJWT)

                let finish = jsonJWT.exp  * 1000
                let curDate = Date.now()
                // console.log("finish: \t" + finish + "\nCurDate:\t" + curDate)

                if(finish >= curDate){
                    return false
                } else {
                    return  true
                }

            }
            return  false
        },

        async changeUserPassword(ctx, data) {
            ctx.dispatch("checkAuthData").then(i => {
                if(i) {
                    ctx.dispatch("logout")
                }
            })
            let isErrorExist = false
            let user = JSON.parse(localStorage.getItem('user'));
            let idUser = user.idUser;
            await AXIOS.get('/user/changePassword/' + idUser + '/' + data.pwdOld + '/' + data.pwdNew,
                {
                    headers: authHeader()
                })
                .catch(error => {
                    isErrorExist = true
                    console.log(error.response.data.message);
                    let erMes = document.getElementById('idPwdChangeError')
                    erMes.innerText = error.response.data.message
                })
                .then(res => {
                    ctx.dispatch("loadUserData");
                    if (!isErrorExist) {
                        let message = res.data.message
                        data.vm.$bvModal.hide('idPwdChangeModal')
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
