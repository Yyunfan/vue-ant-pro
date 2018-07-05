// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideLayout from '../layouts/BasicLayout';
import Dashboard from '../pages/Dashboard';
import Page3 from '../pages/Page3';
import NotFound from '../pages/NotFound';
import TableList from '../module/list/TableList'
import WorkPlace from '../module/dashboard/WorkPlace'
import BasicProfile from '../module/profile/BasicProfile'

const routerConfig = [
    {
        path: 'dashboard',
        layout: HeaderAsideLayout,
        component: WorkPlace,
        children: [
            {
                path: 'analysis',
                layout: HeaderAsideLayout,
                component: Dashboard,
            },
            {
                path: 'monitor',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'workplace',
                layout: HeaderAsideLayout,
                component: WorkPlace,
            },
        ],
    },
    {
        path: 'table',
        name: 'table',
        layout: HeaderAsideLayout,
        component: Page3,
        children: [
            {
                path: 'basic-form',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'fixed',
                layout: HeaderAsideLayout,
                component: Page3,
            },
        ],
    },
    {
        path: 'form',
        name: 'form',
        layout: HeaderAsideLayout,
        component: Page3,
        children: [
            {
                path: 'basic',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'signup',
                layout: HeaderAsideLayout,
                component: Page3,
            },
        ],
    },
    {
        name: 'list',
        path: 'list',
        layout: HeaderAsideLayout,
        component: TableList,
        children: [
            {
                name: '查询表格',
                path: 'table-list',
                layout: HeaderAsideLayout,
                component: TableList
            },
            {
                name: '标准列表',
                path: 'basic-list',
            },
            {
                name: '卡片列表',
                path: 'card-list',
            },
            {
                name: '搜索列表',
                path: 'search',
                children: [
                    {
                        name: '搜索列表（文章）',
                        path: 'articles',
                    },
                    {
                        name: '搜索列表（项目）',
                        path: 'projects',
                    },
                    {
                        name: '搜索列表（应用）',
                        path: 'applications',
                    },
                ],
            },
        ],
    },
    {
        path: 'charts',
        layout: HeaderAsideLayout,
        component: Page3,
        children: [
            {
                path: 'line',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'histogram',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'bar',
                layout: HeaderAsideLayout,
                component: Page3,
            },
        ],
    },
    {
        path: 'profile',
        layout: HeaderAsideLayout,
        component: BasicProfile,
        children: [
            {
                path: 'basic',
                layout: HeaderAsideLayout,
                component: BasicProfile,
            },
            {
                path: 'advanced',
                layout: HeaderAsideLayout,
                component: Page3,
            },
        ],
    },
    {
        path: 'result',
        layout: HeaderAsideLayout,
        component: Page3,
        children: [
            {
                path: 'success',
                layout: HeaderAsideLayout,
                component: Page3,
            },
            {
                path: 'fail',
                layout: HeaderAsideLayout,
                component: Page3,
            },
        ],
    },
    {
        path: 'page3',
        layout: HeaderAsideLayout,
        component: Page3,
    },
    {
        path: '*',
        layout: HeaderAsideLayout,
        component: NotFound,
    },
];

export default routerConfig;
