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
                <h1>vue ant pro</h1>
            </router-link>
        </div>
        <a-menu
            mode="inline"
            theme="dark"
            :openKeys="openKeys"
            :defaultSelectedKeys="defaultSelectedKeys"
            @openChange="onOpenChange"
            :inlineCollapsed="collapsed"
        >
            <template v-for="(item, index) in menuData">
                <router-link v-if="!item.children" :to="item.path" :key="item.name">
                    <a-menu-item :key="index">
                        <a-icon v-if="item.icon" :type="item.icon" />
                        <span v-if="item.name">{{item.name}}</span>
                    </a-menu-item>
                </router-link>
                <a-sub-menu :key="'sub' + index">
                    <span slot="title">
                        <a-icon :type="item.icon" />
                        <span>{{ item.name }}</span>
                    </span>
                    <a-menu-item :key="`sub${index}-${_index}`" v-for="(child, _index) in item.children">
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
import findIndex from 'lodash/findIndex'

export default {
    name: 'SiderMenu',
    data () {
        return {
            openKeys: ['sub0'],
            defaultSelectedKeys: ['sub0-0']
        }
    },
    created () {
        this.getMenuKey()
        // console.log(index, 'index', subIndex)
    },
    props: {
        collapsed: {
            type: Boolean,
            default: false
        },
        menuData: {
            type: Array,
            default () {
                return []
            }
        },
        logo: {
            type: String,
            default: ''
        }
    },
    watch: {
        $route () {
            this.getMenuKey()
        }
    },
    methods: {
        getMenuKey () {
            const { path } = this.$route || {}
            let subIndex = 0
            const index = findIndex(this.menuData, config => {
                if (config.children) {
                    const _index = findIndex(config.children, child => child.path === path)
                    if (_index >= 0) {
                        subIndex = _index
                        return true
                    }
                }
            })
            index >= 0 && (this.openKeys = [`sub${index}`])
            subIndex >= 0 && (this.defaultSelectedKeys = [`sub${index}-${subIndex}`])
        },
        onCollapse: (collapsed, type) => {
            console.log(collapsed, type, 'onCollapse event')
            // this.$emit('collapse', {
            //     type,
            //     collapsed,
            // })
        },
        onOpenChange (openKeys) {
            // console.log(openKeys, 'keys')
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            // console.log(latestOpenKey, 'last')
            this.openKeys = latestOpenKey ? [latestOpenKey] : []
        },
    },
    components: {
        // Parent
    }
}
</script>
