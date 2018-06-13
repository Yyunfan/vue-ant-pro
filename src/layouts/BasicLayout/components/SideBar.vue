<template>
    <scroll-bar>
        <div class="logo">
            <img src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png" width="40">
            <span class="site-name">ADMIN LITE</span>
        </div>
        <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
        <a-menu :defaultSelectedKeys="['1']" :defaultOpenKeys="['sub1']" mode="inline" theme="dark" :inlineCollapsed="collapsed">
            <template v-for="(item, index) in asideMenuConfig">
                <router-link v-if="!item.children" :to="item.path" :key="item.name">
                    <a-menu-item :index="index">
                        <a-icon v-if="item.icon" :type="item.icon" />
                        <span v-if="item.name">{{item.name}}</span>
                    </a-menu-item>
                </router-link>
                <a-sub-menu :key="index" v-else>
                    <span slot="title">
                        <a-icon :type="item.icon" />
                        <span>{{ item.name }}</span>
                    </span>
                    <a-menu-item :key="_index" v-for="(child, _index) in item.children">
                        <router-link :to="item.path + child.path" :key="child.name">
                            <span>{{ child.name }}</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </scroll-bar>
</template>

<script>
import ScrollBar from './ScrollBar'
import { getMenuData } from '@/common/menu'

export default {
    components: { ScrollBar },
    name: 'SideBar',
    props: {},
    data() {
        return {
            asideMenuConfig: getMenuData(),
            collapsed: false
        }
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed
        }
    }
}
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 64px;
    line-height: 64px;
    background: #002140;
    color: #fff;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
}
.site-name {
    margin-left: 10px;
}
.sidebar-container {
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    transition: width 0.28s;
    width: 256px !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    a {
        display: inline-block;
        width: 100%;
    }
    .el-menu {
        padding-top: 16px;
        width: 100% !important;
        border: none;
    }
    .el-submenu .el-menu-item {
        min-width: 256px !important;
        padding-left: 48px !important;
        background-color: #000c17 !important;
        &:hover {
            color: #fff !important;
        }
    }
    .el-menu-item,
    .el-submenu .el-menu-item {
        &.is-active {
            background-color: #188fff !important;
            color: #fff !important;
        }
    }
    .el-submenu__title i {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.65);
    }
}
</style>
