module.exports = function registerBabel(opts = {}) {
    const {
        only,
        ignore,
        babelPreset,
        disablePreventTest
    } = opts;
    console.log(process.env.NODE_ENV)
    if (disablePreventTest || process.env.NODE_ENV !== 'test') {
        process.env.BABEL_DISABLE_CACHE = 1;
        require('@babel/register')({
            // eslint-disable-line
            presets: [babelPreset],
            // presets: ['@vue/app'],
            plugins: [
                require.resolve('babel-plugin-add-module-exports'),
                require.resolve('@babel/plugin-transform-modules-commonjs'),
            ],
            only,
            ignore,
            babelrc: false,
            cache: false,
        });
    }
}
