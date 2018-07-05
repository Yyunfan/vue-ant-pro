module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true // fix import the antd theme, webpack build show .bezierEasingMixin error // https://github.com/ant-design/ant-design/issues/7927
            }
        }
    },
    devServer: {
        before: require('./.mock')
    }
    // configureWebpack: {
    // }
}
