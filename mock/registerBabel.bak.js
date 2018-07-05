const { join } = require('path');
const excapeRegExp = require('lodash/escapeRegExp');
const cwd = process.cwd()
console.log(cwd, 'cwd   ')

function registerBabel(opts = {}) {
    const { only, ignore, babelPreset, disablePreventTest } = opts;
    if (disablePreventTest || process.env.NODE_ENV !== 'test') {
        process.env.BABEL_DISABLE_CACHE = 1;
        require('@babel/register')({
        // eslint-disable-line
            presets: [babelPreset],
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
const babelPreset = function(context, opts = {}) {
    return {
        presets: [[require.resolve('babel-preset-umi'), opts]],
    };
}
module.exports = function (opts = {}) {
    const {
        configOnly = true,
        disablePreventTest,
        ignore,
        cwd
    } = opts;
    const fileNames = ['.mock.js']
    const files = fileNames.map(file => {
        console.log(file, 'file', cwd)
        // return excapeRegExp(join(cwd, file));
    });
    console.log(files, 'files')
    // const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;

    // registerBabel({
    //     only,
    //     ignore,
    //     babelPreset,
    //     disablePreventTest,
    // });
}
