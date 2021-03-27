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
            console.log(state.users)
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
            let response = await AXIOS.get('/admin/getRole',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("fillRol", response.data);
        },
        async loadUsers(ctx) {
            let response = await AXIOS.get('/admin/getUsers',
                {
                    headers: authHeader()
                }).catch(error => {
                console.log(error.response.data);
            });
            ctx.commit("cleanUserList");
            ctx.commit("fillUsers", response.data);
        },
        async addRoleFunc(ctx) {
            await AXIOS.post('/admin/addRole', {name: this.nameNewRole}, {headers: authHeader()});
        },
        async updRoleFunc(ctx, data) {
            await AXIOS.post('/admin/updRole', {
                    id: data.id,
                    name: data.name
                },
                {
                    headers: authHeader()
                });
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
        }


    }
}
