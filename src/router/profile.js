import Profile from '@/layouts'
import BasicProfile from '@/module/profile/Basic'
import AdvancedProfile from '@/module/profile/Advanced'

export default [
    {
        path: '/profile',
        component: Profile,
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
                component: AdvancedProfile,
                meta: {
                    title: '高级详情页'
                }
            },
        ],
    },
]
