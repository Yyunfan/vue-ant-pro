<style lang="less" src="./index.less" scoped></style>

<template>
    <div :class="className" class="pageHeader" :style="{ background: '#fff', padding: '16px 32px 0', bordrBottom: '1px solid #e8e8e8' }">
        <a-breadcrumb :style="{ marginBottom: '16px' }">
            <a-breadcrumb-item>
                <router-link :to="{ path: '/' }">首页</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link :to="{ name: 'basicForm' }">表单页</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <div class="detail">
            <div class="main">
                <div class="row">
                    <h1 class="title">{{ $route.meta && $route.meta.label }}</h1>
                    <div class="action"></div>
                </div>
                <div class="row">
                    <div class="content">{{ $route.meta && $route.meta.desc }}</div>
                    <div class="extraContnt"></div>
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
            }
        },
        props: {
            className: {
                type: String,
            }
        },
    }
</script>
