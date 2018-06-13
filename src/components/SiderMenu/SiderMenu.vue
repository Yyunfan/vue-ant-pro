<style lang="less" src="./index.less" scoped></style>

<template>
    <a-layout-sider
        :trigger="null"
        :collapsible="true"
        :collapsed="collapsed"
        breakpoint="lg"
        @collapse="onCollapse"
        :width="256"
        class="sider"
    >
        <div class="logo">
            <router-link to="/">
                <img :src="logo" alt="" />
                <h1>Ant Design Pro</h1>
            </router-link>
        </div>
        <!-- <a-menu :defaultSelectedKeys="['1']" :defaultOpenKeys="['sub1']" mode="inline" theme="dark" :inlineCollapsed="collapsed">
            <Parent :content="asideMenuConfig"></Parent>
        </a-menu> -->
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
                        <router-link :to="child.path" :key="child.name">
                            <span>{{ child.name }}</span>
                        </router-link>
                    </a-menu-item>
                </a-sub-menu>
            </template>
        </a-menu>
    </a-layout-sider>
</template>
<script>
    import { getMenuData } from '@/common/menu'
    import logo from '@/assets/logo.png'
    import Parent from './recursive/Parent'
    // console.log(getMenuData, 'getMenuData')

    export default {
        name: 'SiderMenu',
        data () {
            return {
                asideMenuConfig: getMenuData(),
                logo,
            }
        },
        props: {
            collapsed: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            onCollapse: (collapsed, type) => {
                console.log(collapsed, type, 'onCollapse event')
                // this.$emit('collapse', {
                //     type,
                //     collapsed,
                // })
            }
        },
        components: {
            Parent
        }
    }
</script>
