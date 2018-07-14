import Result from '@/layouts'
import Success from '@/module/result/Success'
import Fail from '@/module/result/Fail'

export default [
    {
        path: '/result',
        component: Result,
        redirect: 'noredirect',
        children: [
            {
                path: 'success',
                name: 'success',
                component: Success,
            },
            {
                path: 'fail',
                name: 'fail',
                component: Fail,
            },
        ],
    },
]
