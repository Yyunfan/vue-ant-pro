<template>
    <div :class="clsString">
        <div class="title" v-if="title">{{ title }}</div>
        <a-row :gutter="gutter">
            <slot :column="column"></slot>
        </a-row>
    </div>
</template>

<script>
export default {
    props: {
        className: {
            type: String,
            default: ''
        },
        title: [String],
        col: {
            type: Number,
            default: 3
        },
        layout: {
            type: String,
            default: 'horizontal'
        },
        gutter: {
            type: Number,
            default: 32
        },
        size: [String],
    },
    computed: {
        clsString () {
            const str = ['descriptionList', this.layout, this.className]
            this.size === 'small' && str.push('small')
            this.size === 'large' && str.push('large')
            return str.join(' ')
        },
        column () {
            return this.col > 4 ? 4 : this.col
        }
    }
}
</script>

<style lang="less" scoped src="./DescriptionList.less"></style>
