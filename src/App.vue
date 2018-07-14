<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
}
</script>

<style>
#root,
body,
html {
    height: 100%;
}
</style>
<style scoped>
#root .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
}
#root .trigger:hover {
    color: #108ee9;
}
#root .ant-layout {
    min-height: 100vh;
    overflow-x: hidden;
}
#root .logo {
    height: 32px;
    background: #333;
    border-radius: 6px;
    margin: 16px;
}
#root .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
}
#root .ant-layout-sider-collapsed .nav-text {
    display: none;
}
.title {
    font-size: 20px;
    font-weight: 500;
    color: #000000d9;
    flex: 1 1;
    margin-bottom: 16px;
}
.row {
    display: flex;
}
.content {
    margin-bottom: 16px;
    flex: 1 1;
}
</style>
