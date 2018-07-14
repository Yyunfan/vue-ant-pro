<style lang="less" src="./index.less" scoped></style>

<template>
    <!-- <span class="noticeButtonClass">
        <a-badge :count="count" class="badge">
            <a-icon type="bell" class="iconn"></a-icon>
        </a-badge>
    </span> -->
    <a-popover trigger="click" placement="bottomRight" arrowPointAtCenter :popupAlign="popupAlign" @visibleChange="onPopupVisibleChange">
        <template slot="content">
            <a-spin :spinning="loading" :delay="0">
                <a-tabs class="tabs">
                    <a-tab-pane :tab="item.type" v-for="item in noticeType" :key="item.type">
                        <NoticeList
                            :data="noticeData[item.type]"
                            :title="item.type"
                            @click="onItemClick"
                            @clear="onClear"
                        ></NoticeList>
                    </a-tab-pane>
                </a-tabs>
            </a-spin>
        </template>
        <span class="noticeButtonClass">
            <a-badge :count="count" class="badge">
                <a-icon type="bell" class="iconn"></a-icon>
            </a-badge>
        </span>
    </a-popover>
</template>

<script>
import NoticeList from './NoticeList'

export default {
    name: 'NoticeIcon',
    props: {
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
        count: {
            type: Number,
            default: 0
        },
        popupAlign: {
            type: Object,
            default () {
                return {}
            }
        },
        noticeData: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            noticeType: [
                {
                    type: '通知',
                    emptyText: '你已查看所有通知',
                    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
                },
                {
                    type: '消息',
                    emptyText: '您已读完所有消息',
                    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
                },
                {
                    type: '待办',
                    emptyText: '你已完成所有待办',
                    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg'
                },
            ]
        }
    },
    created () {
        console.log(this, 'fdsf')
    },
    computed: {
    },
    methods: {
        getNotificationBox () {
        },
        onItemClick (item) {
            this.$emit('itemClick', item)
        },
        onPopupVisibleChange (visible) {
            console.log(visible, 'visible')
            this.$emit('popupVisibleChange', visible)
        },
        onTabChange () {
            this.$emit('tabChange')
        },
        onClear (type) {
            this.$emit('clear', type)
        },
    },
    components: {
        NoticeList
    }
}
</script>
