<template>
    <div class="linkGroup">
        <router-link :tag="linkElement" :to="link.href" v-for="link in links" :key="`linkGroup-item-${link.id || link.title}`">{{ link.title }}</router-link>
        <a-button size="small" type="primary" ghost @click="onAdd" icon="plus">添加</a-button>
    </div>
</template>

<script>
export default {
    props: {
        links: {
            type: Array,
            default () {
                return []
            }
        },
        onAdd: {
            type: Function,
            default () {}
        },
        linkElement: {
            type: [String, Function],
            default: 'a'
        }
    }
}
</script>
<style lang="less" scoped src="./index.less"></style>
