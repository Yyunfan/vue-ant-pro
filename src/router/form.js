import Form from '@/layouts'
import BasicForm from '@/module/form/Basic'
import StepForm from '@/module/form/Step'
import AdvancedForm from '@/module/form/Advanced'

export default [
    {
        path: '/form',
        name: 'form',
        redirect: 'noredirect',
        meta: { title: '表单页' },
        component: Form,
        children: [
            {
                path: 'basic-form',
                name: 'basicForm',
                meta: {
                    title: '基础表单'
                },
                component: BasicForm,
            },
            {
                path: 'step-form',
                name: 'stepForm',
                component: StepForm,
                meta: {
                    title: '分步表单'
                }
            },
            {
                path: 'advanced-form',
                name: 'advancedForm',
                component: AdvancedForm,
                meta: {
                    title: '高级表单'
                }
            },
        ],
    },
]
