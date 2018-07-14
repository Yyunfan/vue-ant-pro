import Vue from 'vue';
import Router from 'vue-router';

import dashboard from './dashboard'
import form from './form'
import list from './list'
import profile from './profile'
import result from './result'
import exception from './exception'

const routes = [
    {
        path: '',
        redirect: '/dashboard/analysis'
    },
    ...dashboard,
    ...form,
    ...list,
    ...profile,
    ...result,
    ...exception
]
console.log(routes, 'routes')

Vue.use(Router);

export default new Router({
    path: '/',
    routes,
});
