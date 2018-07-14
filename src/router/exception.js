import Exception from '@/layouts'
import NoAuth from '@/module/exception/403'
import NotFound from '@/module/exception/404'
import ServerError from '@/module/exception/500'

export default [
    {
        path: '/exception',
        redirect: 'noredirect',
        component: Exception,
        children: [
            {
                path: '403',
                component: NoAuth,
                meta: {
                    hideInBreadcrumb: true
                }
            },
            {
                path: '404',
                component: NotFound,
                meta: {
                    hideInBreadcrumb: true
                }
            },
            {
                path: '500',
                component: ServerError,
                meta: {
                    hideInBreadcrumb: true
                }
            },
        ],
    },
]
