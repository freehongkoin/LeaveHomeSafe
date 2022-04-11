import {
    createRouter,
    createWebHistory,
} from 'vue-router'
import Home from '../views/Home.vue'

import Scan from '../views/Scan.vue'
import Records from '../views/Records.vue'
import History from '../views/History.vue'
import Inbox from '../views/Inbox.vue'
import Settings from '../views/Settings.vue'
import Enter from '../views/Enter.vue'
import Vaccination from '../views/Vaccination.vue'
import VaccinationDetail from '../views/VaccinationDetail.vue'

import * as K from "../constants/constants";




const routes = [{
        path: '/',
        name: 'Home',
        meta: { desc: "" },
        component: Home
    },
    {
        path: '/scan',
        name: 'Scan',
        meta: { desc: "Scan the QR Code" },
        component: Scan,
    },
    {
        path: '/history',
        name: 'History',
        meta: { desc: "Visit Records" },
        component: History,
    },
    {
        path: '/records',
        name: 'Records',
        meta: { desc: "Electronic Vaccination and Testing Record" },
        component: Records,
    },
    {
        path: '/inbox',
        name: 'Inbox',
        meta: { desc: "Inbox" },
        component: Inbox,
    },
    {
        path: '/enter',
        name: 'Enter',
        meta: { desc: "" },
        component: Enter,
        props: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: { desc: "Settings" },
        component: Settings,
    },
    {
        path: '/vaccination',
        name: 'Vaccination',
        meta: { desc: "Scan Vaccination Record" },
        component: Vaccination,
    },
    {
        path: '/vaccinationdetail',
        name: 'VaccinationDetail',
        meta: { desc: "COVID-19 Electronic Vaccination Record" },
        component: VaccinationDetail,
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'Home',
        meta: { desc: "" },
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router