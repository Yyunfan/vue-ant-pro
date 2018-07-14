import List from '@/layouts'
import TableList from '@/module/list/Table'
import BasicList from '@/module/list/Basic'
import CardList from '@/module/list/Card'

export default [
    {
        name: 'list',
        path: '/list',
        redirect: 'noredirect',
        component: List,
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
                component: BasicList
            },
            {
                path: 'card-list',
                name: 'card-list',
                meta: {
                    title: '卡片列表'
                },
                component: CardList
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
]
