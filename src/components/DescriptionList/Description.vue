<template>
    <a-col
        :class="clsString"
        v-bind="reactive"
    >
        <div class="term" v-if="term">{{ term }}</div>
        <slot class="detail"></slot>
    </a-col>
</template>

<script>
const responsive = {
    1: { xs: 24 },
    2: { xs: 24, sm: 12 },
    3: { xs: 24, sm: 12, md: 8 },
    4: { xs: 24, sm: 12, md: 6 },
}
export default {
    data () {
        return {
            responsive
        }
    },
    props: {
        term: {
            type: String,
            default: ''
        },
        column: {
            type: Number,
            default: 3
        },
        className: [String],
    },
    computed: {
        clsString () {
            return [this.className, 'description']
        },
        reactive () {
            return this.responsive[this.column]
        }
    }
}
</script>
<style lang="less" scoped src="./index.less">

</style>

