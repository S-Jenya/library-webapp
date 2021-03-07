import {AXIOS} from "@/httpCommons";

export default {
    state: {
        nameNewRole: '',
        role: [],
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
        getRoleModal(state) {
            return state.roleModal;
        },
        getId(state, data){
            return state.roleModal.idRole;
        },
        getName(state, data){
            return state.roleModal.inputText;
        }
    },

    mutations: {
        clearListRole(state) {
            state.role = []
        },
        fillRol(state, data) {
            data.forEach(element => state.role.push(element));
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
        }
    },

    actions: {
        async loadRole(ctx) {
            let response = await AXIOS.get('/admin/getRole');
            ctx.commit("fillRol", response.data);
        },
        async addRoleFunc(ctx) {
            await AXIOS.post('/admin/addRole', {name: this.nameNewRole});
        },
        async updRoleFunc(ctx, data) {
            await AXIOS.post('/admin/updRole', {
                id: data.id,
                name: data.name
            });
            ctx.dispatch("loadRole");
        },

        async createUser(ctx, data) {
            console.log("Я здесь был!")
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
