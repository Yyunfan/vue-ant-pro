<template>
    <div>
        <template v-for="item in content">
            <router-link v-if="!item.children" :to="item.path" :key="item.name">
                <a-menu-item>
                    <a-icon v-if="item.icon" :type="item.icon" />
                    <span v-if="item.name">{{item.name}}</span>
                </a-menu-item>
            </router-link>
            <Child :children="item.children" :key="item.name" v-else></Child>
        </template>
    </div>
</template>
<script>
export default {
    name: 'Parent',
    props: {
        content: {
            type: [Array],
        },
        // collapsed: {
        //     type: Boolean,
        //     default: false
        // },
    },
    // beforeCreate () {
    //     this.$options.components.child = require('./content.vue')
    // }
    components: {
        Child: () => import('./Child.vue')
    },
}
</script>
