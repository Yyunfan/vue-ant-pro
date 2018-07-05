const {
    join
} = require('path');
const registerBabel = require('./registerHandler');
const excapeRegExp = require('lodash/escapeRegExp');

module.exports = function (babelPreset, opts) {
    const {
        configOnly,
        disablePreventTest,
        ignore,
        cwd
    } = opts;
    const files = [
        '.mock.js',
        'mockData.js',
        'src/mock',
        'mock'
    ].map(file => {
        return excapeRegExp(join(cwd, file));
    });
    const only = configOnly ? [new RegExp(`(${files.join('|')})`)] : null;
    console.log(only, 'only')
    registerBabel({
        only,
        ignore,
        babelPreset,
        disablePreventTest,
    });
}
