import VueRouter from 'vue-router'
import adminComponent from './components/Administration/adminComponent'
import mainContent from './components/mainContent'
import registrationComponent from "@/components/registrationComponent";
import login from '@/components/login'
import UserList from "@/components/Administration/UserList";
import roleContent from "@/components/Administration/Role/roleContent";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'App',
            component: mainContent
        },
        {
            path: "/admin",
            name: 'admin',
            component: adminComponent
        },
        {
            path: "/registration",
            name: 'registration',
            component: registrationComponent
        },
        {
            path: "/login",
            name: 'login',
            component: login
        },
        {
            path: "/admin/userlist",
            name: 'UserList',
            component: UserList
        },
        {
            path: "/admin/rolelist",
            name: 'rolelist',
            component: roleContent
        }
    ]
})
