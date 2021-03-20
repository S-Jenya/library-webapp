import VueRouter from 'vue-router'
import adminComponent from './components/Administration/adminComponent'
import mainContent from './components/mainContent'
import registrationComponent from "@/components/registrationComponent";
import login from '@/components/login'
import UserList from "@/components/Administration/User/UserList";
import roleContent from "@/components/Administration/Role/roleContent";
import boorCreate from "@/components/Administration/Book/BookCreate";
import GenreList from "@/components/Administration/Genre/GenreList";
import AuthorList from "@/components/Administration/Author/AuthorList";

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
        },
        {
            path: "/admin/bookCreate",
            name: 'bookCreate',
            component: boorCreate
        },
        {
            path: "/admin/genreList",
            name: 'genreList',
            component: GenreList
        },
        {
            path: "/admin/authorList",
            name: 'authorList',
            component: AuthorList
        }
    ]
})
