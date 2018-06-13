<template>
    <a-layout>
        <SiderMenu :collapsed="collapsed" @collapse="handleMenuCollapse"></SiderMenu>
        <a-layout>
            <a-layout-header :style="{ padding: 0, background: '#fff' }">
                <GlobalHeader :collapsed="collapsed" @collapse="handleMenuCollapse"></GlobalHeader>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 24px 0', height: '100%' }">
                <div style="margin: -24px -24px 0px;">
                    <PageHeader></PageHeader>
                    <div style="margin: 24px 24px 0; background: #fff; min-height: 360px;">
                        <app-main></app-main>
                    </div>
                </div>
            </a-layout-content>
            <a-layout-footer :style="{ padding: '0' }">
                Ant Design ©2016 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
    <!-- <div class="app-wrapper">
        <side-bar class="sidebar-container"></side-bar>
        <div class="main-container">
            <nav-bar></nav-bar>
            <app-main></app-main>
        </div>
    </div> -->
</template>

<script>
import { mapState } from 'vuex'
import { NavBar, SideBar, AppMain } from './components'
import GlobalHeader from '@/components/GlobalHeader/index'
import PageHeader from '@/components/PageHeader/index'
import SiderMenu from '@/components/SiderMenu/index'
// import { getMenuData }

export default {
    name: 'Layout',
    components: {
        NavBar,
        SideBar,
        AppMain,
        GlobalHeader,
        PageHeader,
        SiderMenu
    },
    data () {
        return {
            // collapsed: false
        }
    },
    created () {
    },
    computed: {
        ...mapState({
            collapsed: state => state.global.collapsed
        })
    },
    methods: {
        collapse (obj) {
            console.log(obj, 'obj')
        },
        handleMenuCollapse (collapsed) {
            this.$store.dispatch('CHANGE_LAYOUT_COLLAPSED', collapsed)
        }
    }
}
</script>

<style lang="scss" scoped>
// .app-wrapper {
//     position: relative;
//     height: 100%;
//     width: 100%;
//     &:after {
//         content: '';
//         display: table;
//         clear: both;
//     }
// }

// .main-container {
//     min-height: 100vh;
//     transition: margin-left 0.28s;
//     margin-left: 256px;
//     background-color: #f0f2f5;
// }
</style>
