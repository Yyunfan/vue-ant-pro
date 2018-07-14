<template>
    <div :class="clsString" style="background: none;">
        <div class="imgBlock">
            <div class="imgEle" :style="{ backgroundImage: `url(${backgroundImg})` }"></div>
        </div>
        <div class="content">
            <h1>{{ pageTitle }}</h1>
            <div class="desc">{{ pageDesc }}</div>
            <div class="actions">
                <slot name="actions">
                    <router-link to="/">
                        <a-button type="primary">返回首页</a-button>
                    </router-link>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import config from './typeConfig'

export default {
    props: {
        className: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
    },
    computed: {
        pageType () {
            return this.type in config ? this.type : '404'
        },
        clsString () {
            return ['exception', this.className].join(' ')
        },
        backgroundImg () {
            return this.img || config[this.pageType].img
        },
        pageTitle () {
            return this.title || config[this.pageType].title
        },
        pageDesc () {
            return this.desc || config[this.pageType].desc
        },
    }
}
</script>

<style lang="less" scoped src="./index.less"></style>
