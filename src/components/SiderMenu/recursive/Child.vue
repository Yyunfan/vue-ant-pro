<template>
    <div>
        <template v-for="item in children">
            <Parent v-if="item.children" :content="item.children" :key="item.name"></Parent>
            <a-sub-menu :key="item.name" v-else>
                <span slot="title">
                    <a-icon :type="item.icon" />
                    <span>{{ item.name }}</span>
                </span>
                <a-menu-item>
                    <router-link :to="item.path">
                        <span>{{ item.name }}</span>
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </template>
    </div>
</template>

<script>
    import Parent from './Parent'

    export default {
        name: 'Child',
        props: {
            children: {
                type: [Array],
            }
        },
        components: {
            Parent
        }
    }
</script>
