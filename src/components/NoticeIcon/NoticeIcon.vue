<style lang="less" src="./index.less" scoped></style>

<template>
    
</template>

<script>
    export default {
        name: 'NoticeIcon',
        props: {
            onItemClick: {
                type: Function,
                defualt: () => {}
            },
            onPopupVisibleChange: {
                type: Function,
                defualt: () => {}
            },
            onTabChange: {
                type: Function,
                defualt: () => {}
            },
            onClear: {
                type: Function,
                defualt: () => {}
            },
            loading: {
                type: Boolean,
                defualt: false
            },
            locale: {
                type: Object,
                default () {
                    return {
                        emptyText: '暂无数据',
                        clear: '清空',
                    }
                }
            },
            emptyImage: {
                type: String,
                default: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
            },
        },
        data () {
            return {
            }
        },
        computed: {
        },
        methods: {}
    }
</script>
