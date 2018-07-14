<template>
    <div :class="params">
        <a-layout>
            <SiderMenu
                :collapsed="collapsed"
                @collapse="handleMenuCollapse"
                :logo="logo"
                :isMobile="isMobile"
                :menuData="getMenuData()"
            ></SiderMenu>
            <a-layout>
                <a-layout-header class="header">
                    <GlobalHeader
                        :logo="logo"
                        :currentUser="currentUser"
                        :fetchingNotices="fetchingNotices"
                        :notices="notices"
                        :collapsed="collapsed"
                        :isMobile="isMobile"
                        @noticeClear="handleNoticeClear"
                        @collapse="handleMenuCollapse"
                        @menuClick="handleMenuClick"
                        @noticeVisibleChange="handleNoticeVisibleChange"
                    ></GlobalHeader>
                </a-layout-header>
                <a-layout-content class="content">
                    <div class="wrapper">
                        <PageHeader
                            :title="$route.meta && $route.meta.title"
                        ></PageHeader>
                        <div class="main-content">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </div>
                    </div>
                </a-layout-content>
                <a-layout-footer class="footer">
                    <GlobalFooter
                        :links="links"
                    >
                        <template slot="copyright">
                            <a-icon type="copyright" /> vue ant pro
                        </template>
                    </GlobalFooter>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMenuData } from '@/common/menu'

import GlobalHeader from '@/components/GlobalHeader/index'
import GlobalFooter from '@/components/GlobalFooter/index'
import PageHeader from '@/components/PageHeader/index'
import SiderMenu from '@/components/SiderMenu/index'

import ContainerQuery from './query'
import logo from '@/assets/logo.png'

const links = [{
    key: '首页',
    title: '首页',
    href: '/',
    blankTarget: true,
}, {
    key: 'github',
    icon: 'github',
    href: 'https://github.com/ant-design/ant-design-pro',
    blankTarget: true,
}, {
    key: 'Ant Design',
    title: 'Ant Design',
    href: 'http://ant.design',
    blankTarget: true,
}]
export default {
    name: 'Layout',
    extends: ContainerQuery,
    components: {
        GlobalHeader,
        GlobalFooter,
        PageHeader,
        SiderMenu
    },
    data () {
        return {
            // collapsed: false
            links,
            fetchingNotices: false,
            logo
        }
    },
    created () {
        this.dispatch({
            type: 'user/fetchCurrent'
        })
    },
    computed: {
        ...mapState({
            collapsed: state => state.global.collapsed,
            notices: state => state.global.notices,
            currentUser: state => state.user.currentUser
        })
    },
    methods: {
        getMenuData,
        collapse (obj) {
            console.log(obj, 'obj')
        },
        handleMenuCollapse (collapsed) {
            this.dispatch({
                type: 'global/changeLayoutCollapsed',
                payload: collapsed
            })
        },
        handleNoticeClear (type) {
            this.$message.success(`清空了${type}`);
            this.dispatch({
                type: 'global/clearNotices',
                payload: type,
            });
        },
        handleMenuClick ({ key }) {
            if (key === 'triggerError') {
                // this.dispatch(routerRedux.push('/exception/trigger'));
                return;
            }
            if (key === 'logout') {
                this.dispatch({
                    type: 'login/logout',
                });
            }
        },
        handleNoticeVisibleChange (visible) {
            if (visible) {
                this.fetchingNotices = true
                this.dispatch({
                    type: 'global/fetchNotices'
                })
                    .finally(() => {
                        this.fetchingNotices = false
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '~vue-antd-ui/lib/style/themes/default.less';
.header {
    padding: 0;
    background-color: #fff;
}
.content {
    margin: 24px 24px 0;
    height: 100%;
    .wrapper {
        margin: -24px -24px 0px;
    }
    .main-content {
        margin: 24px 24px 0;
        background-color: #fff;
        min-height: 360px;
    }
}
.footer {
    padding: 0
}
@media screen and (max-width: @screen-sm) {
  .content {
    margin: 24px 0 0;
  }
}
</style>
