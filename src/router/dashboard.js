import DashBoard from '@/layouts'
import Analysis from '@/module/dashboard/Analysis'
import Monitor from '@/module/dashboard/Monitor'
import WorkPlace from '@/module/dashboard/WorkPlace'

export default [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashBoard,
        redirect: 'noredirect',
        meta: {
            title: 'dashboard'
        },
        children: [
            {
                path: 'analysis',
                name: 'analysis',
                component: Analysis,
                meta: {
                    title: '分析页'
                }
            },
            {
                path: 'monitor',
                name: 'monitor',
                component: Monitor,
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
]
