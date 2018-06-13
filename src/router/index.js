// const routes = [
//     {
//         path: '/'
//     },
//     {
//         path: '/form',
//         name: 'form',
//         component: () => import('../module/form/index'),
//         children: [
//             {
//                 path: 'basic-form',
//                 name: 'basicForm',
//                 meta: {
//                     label: '基础表单',
//                     desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。'
//                 },
//                 component: () => import('../module/form/basicForm')
//             }
//         ]
//     },
//     {
//         path: '/list',
//         name: 'list',
//         component: () => import('../module/list/index'),
//         children: [
//             {
//                 path: 'table-list',
//                 name: 'tableList',
//                 meta: {
//                     label: '查询表格',
//                     desc: ''
//                 },
//                 component: () => import('../module/list/tableList')
//             }
//         ]
//     }
// ]
import Vue from 'vue';
import Router from 'vue-router';
import routerConfig from './routerConfig';

/**
 * 将路由配置扁平化
 * @param {Array} config 路由配置
 * @return {Route}
 * @example
 * const routes = [
 *   {
 *     path: '/dashboard/analysis',
 *     component: HeaderAsideLayout,
 *     children: [
 *       {
 *         path: '',
 *         component: Dashboard,
 *       },
 *     ],
 *   },
 * ];
 */

const routerMap = [];

const recursiveRouterConfig = (config = [], parentPath = '/') => {
    config.forEach((item) => {
        const { path: _path } = item
        const path = _path !== '*' ? parentPath + _path + '/' : '*'
        const route = {
            path,
            component: item.layout,
            children: [{
                path: '',
                component: item.component,
            }],
        };

        if (Array.isArray(item.children)) {
            recursiveRouterConfig(item.children, path);
        }
        routerMap.push(route);
    });

    return routerMap;
};

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    ...recursiveRouterConfig(routerConfig)
]
console.log(routes, 'routes')

Vue.use(Router);

export default new Router({
    routes,
});
