<style lang="less" src="./index.less" scoped></style>

<template>
    <div class="header">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />

        <div class="right">
            <HeaderSearch class="action search" placeholder="站内搜索" :dataSource="dataSource" :onSearch="onSearch" :onPressEnter="onPressEnter"></HeaderSearch>
            <a-tooltip title="使用文档">
                <a target="_blank" href="http://pro.ant.design/docs/getting-started" rel="noopener noreferrer" class="action">
                    <a-icon type="question-circle-o" />
                </a>
            </a-tooltip>
            <!-- <notice-icon></notice-icon> -->
            <a-dropdown>
                <span class="action account">
                    <a-avatar size="small" class="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"></a-avatar>
                    <span class="name">Serati Ma</span>
                </span>
                <a-menu class="menu" slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="usercenter" disabled>
                        <a-icon type="user" />个人中心
                    </a-menu-item>
                    <a-menu-item key="setting" disabled>
                        <a-icon type="setting" />设置
                    </a-menu-item>
                    <a-menu-item key="triggerError">
                        <a-icon type="close-circle" />触发报错
                    </a-menu-item>
                    <a-menu-divider></a-menu-divider>
                    <a-menu-item key="logout">
                        <a-icon type="logout" />退出登录
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </div>
</template>
<script>
import HeaderSearch from '@/components/HeaderSearch'
import NoticeIcon from '@/components/NoticeIcon'
import debounce from 'lodash/debounce'

export default {
    name: 'GlobalHeader',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        notices: {},
        fetchingNotices: {
        },
        isMobile: {
            type: Boolean,
            default: false
        },
        logo: {
            type: String,
            default: ''
        },
        onNoticeVisibleChange: {
            type: Function,
            default: () => {}
        },
        onMenuClick: {
            type: Function,
            default: () => {}
        },
        onNoticeClear: {
            type: Function,
            default: () => {}
        },
    },
    components: {
        HeaderSearch,
        NoticeIcon
    },
    data () {
        return {
            dataSource: ['搜索提示一', '搜索提示二', '搜索提示三'],
            menus: [],
        }
    },
    methods: {
        toggle () {
            this.$emit('collapse', !this.collapsed)
            this.triggerResizeEvent()
        },
        triggerResizeEvent: debounce(function () {
            const event = document.createEvent('HTMLEvents')
            event.initEvent('resize', true, false)
            window.dispatchEvent(event)
        }, 600),
        onSearch (value) {
            console.log('input', value); // eslint-disable-line
        },
        onPressEnter (value) {
            console.log('enter', value); // eslint-disable-line
        },
        handleMenuClick () {
            console.log('handleMenuClick')
            this.$emit('')
        }
    },
}
</script>
