<template>
    <DrawerMenu
        :getContainer="null"
        :level="null"
        :onHandleClick="onHandleClick"
        :open="!collapsed"
        :onMaskClick="onMaskClick"
        v-if="isMobile">
        <SiderMenu :collapsed="isMobile ? false : collapsed" :logo="logo" :menuData="menuData"></SiderMenu>
    </DrawerMenu>
    <SiderMenu :collapsed="collapsed" :logo="logo" :menuData="menuData" v-else></SiderMenu>
</template>

<script>
import DrawerMenu from '../Drawer'
import SiderMenu from './SiderMenu'

export default {
    name: 'SiderMenuWrapper',
    components: {
        DrawerMenu,
        SiderMenu
    },
    props: {
        isMobile: {
            type: Boolean,
            default: false
        },
        collapsed: {
            type: Boolean,
            default: false
        },
        collapse: {
            type: Function,
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
    methods: {
        onHandleClick () {
            this.$emit('collapse', !this.collapsed)
            // if (this.onCollapse && typeof this.onCollapse === 'function') {
            //     this.onCollapse(!this.collapsed)
            // }
        },
        onMaskClick () {
            this.$emit('collapse', true)
            // if (this.onCollapse && typeof this.onCollapse === 'function') {
            //     this.onCollapse(true)
            // }
        }
    }
}
</script>
