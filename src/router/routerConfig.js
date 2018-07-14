// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import BasicLayout from '../layouts/BasicLayout';
import Page3 from '../pages/Page3';
import NotFound from '../pages/NotFound';
import TableList from '../module/list/TableList'
import WorkPlace from '../module/dashboard/WorkPlace'
import BasicProfile from '../module/profile/BasicProfile'

const routerConfig = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: BasicLayout,
        redirect: 'noredirect',
        meta: {
            title: 'dashboard'
        },
        children: [
            {
                path: 'analysis',
                name: 'analysis',
                component: Page3,
                meta: {
                    title: '分析页'
                }
            },
            {
                path: 'monitor',
                name: 'monitor',
                component: Page3,
                meta: {
                    title: '监控页'
                }
            },
            {
                path: 'workplace',
                name: 'workplace',
                component: WorkPlace,
                meta: {
                    title: '工作台'
                }
            },
        ],
    },
    {
        path: '/form',
        name: 'form',
        redirect: 'noredirect',
        meta: { title: '表单页' },
        component: BasicLayout,
        children: [
            {
                path: 'basic-form',
                name: 'basic-form',
                meta: {
                    title: '基础表单'
                },
                component: Page3,
            },
            {
                path: 'step-form',
                name: 'step-form',
                component: Page3,
                meta: {
                    title: '分步表单'
                }
            },
        ],
    },
    {
        name: 'list',
        path: '/list',
        redirect: 'noredirect',
        component: BasicLayout,
        meta: {
            title: '列表页'
        },
        children: [
            {
                meta: {
                    title: '查询表格'
                },
                path: 'table-list',
                name: 'table-list',
                component: TableList
            },
            {
                path: 'basic-list',
                name: 'basic-list',
                meta: {
                    title: '标准列表'
                },
            },
            {
                path: 'card-list',
                name: 'card-list',
                meta: {
                    title: '卡片列表'
                }
            },
            {
                pageName: '搜索列表',
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
        path: '/profile',
        component: BasicLayout,
        redirect: 'noredirect',
        children: [
            {
                path: 'basic',
                component: BasicProfile,
                meta: {
                    title: '基础详情页'
                }
            },
            {
                path: 'advanced',
                component: Page3,
            },
        ],
    },
    {
        path: '/result',
        component: BasicLayout,
        redirect: 'noredirect',
        children: [
            {
                path: 'success',
                name: 'success',
                component: Page3,
            },
            {
                path: 'fail',
                name: 'fail',
                component: Page3,
            },
        ],
    },
    {
        path: '/exception',
        redirect: 'noredirect',
        component: BasicLayout,
        children: [
            {
                path: '403',
                component: Page3,
            },
            {
                path: '404',
                component: Page3,
            },
            {
                path: '500',
                component: Page3,
            },
        ],
    },
    {
        path: '*',
        component: BasicLayout,
        children: [
            {
                path: '',
                component: NotFound
            }
        ]
    },
];

export default routerConfig;
