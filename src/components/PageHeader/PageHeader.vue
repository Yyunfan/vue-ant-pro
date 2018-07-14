<style lang="less" src="./index.less" scoped></style>

<template>
    <div :class="clsString" :style="{ background: '#fff', padding: '16px 32px 0', bordrBottom: '1px solid #e8e8e8' }">
        <a-breadcrumb :separator="breadcrumbSeparator" v-if="showBread">
            <a-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if='item.meta.title'>
                <span v-if='item.redirect === "noredirect" || index === levelList.length - 1' class="no-redirect">{{item.meta.title}}</span>
                <router-link v-else :to="item.redirect || item.path">{{item.meta.title}}</router-link>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <div class="detail">
            <slot name="logo"></slot>
            <div class="main">
                <div class="row">
                    <h1 class="title" v-if="title">{{ title }}</h1>
                    <slot name="title" v-else></slot>
                    <div class="action">
                        <slot name="action"></slot>
                    </div>
                </div>
                <div class="row">
                    <div class="content">
                        <slot name="content"></slot>
                    </div>
                    <div class="extraContent">
                        <slot name="extraContent"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'PageHeader',
    data () {
        return {
            breadcrumb: null,
            levelList: null
        }
    },
    props: {
        className: {
            type: String,
            default: ''
        },
        breadcrumbList: {
            type: Array,
            default () {
                return []
            }
        },
        breadcrumbSeparator: {
            type: [String, Object],
            default: '/'
        },
        linkElement: {
            type: String,
            default: 'a'
        },
        routes: {
            type: Array,
            default () {
                return []
            }
        },
        params: {
            type: Object,
            default () {
                return {}
            }
        },
        location: {
            type: Object,
            default () {
                return {}
            }
        },
        breadcrumbNameMap: {
            type: Object,
            default () {
                return {}
            }
        },
        title: [String],
        content: [String],
        extraContent: [String],
    },
    computed: {
        clsString () {
            return ['pageHeader', this.className].join(' ')
        },
        showBread () {
            return this.$route && this.$route.meta && !this.$route.meta.hideInBreadcrumb
        }
    },
    created () {
        this.getBreadcrumb()
    },
    watch: {
        $route () {
            this.getBreadcrumb()
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name)
            console.log(matched, 'mt')
            const first = matched[0]
            if (first && first.name !== 'dashboard') {
                matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
            }
            this.levelList = matched
        },
    }
}
</script>
