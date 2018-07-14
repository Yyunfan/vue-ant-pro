<template>
    <div :class="clsString">
        <div class="links" v-if="links && links.length">
            <a :href="link.href" v-for="link in links" :key="link.key" :target="link.blankTarget ? '_blank' : '_self'">
                <template v-if="link.title">{{ link.title }}</template>
                <template v-ele><a-icon :type="link.icon" /></template>
            </a>
        </div>
        <div class="copyright">
            <slot name="copyright"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        className: {
            type: String,
            default: ''
        },
        links: {
            type: Array,
            default () {
                return []
            }
        },
    },
    computed: {
        clsString () {
            return ['globalFooter', this.className].join(' ')
        }
    }
}
</script>

<style lang="less" scoped src="./index.less"></style>
