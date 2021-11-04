import Vue from 'vue'
import VueRouter from 'vue-router'
// import QuerySearch from '../components/search/QuerySearch'

Vue.use(VueRouter);

const routes = [
    {
        // path: "/",
        // component: QuerySearch,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
});


export default router;