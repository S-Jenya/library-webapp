import VueRouter from 'vue-router'
import adminComponent from './components/Administration/adminComponent'
import mainContent from './components/mainContent'
import registrationComponent from "@/components/registrationComponent";

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
        }
    ]
})
