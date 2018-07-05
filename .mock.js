// const registerBabel = require('./mock/registerBabel')
// const cwd = process.cwd()

// const babel = {
//     presets: [
//         '@vue/app'
//     ]
// }
// registerBabel(babel, {
//     cwd,
//     configOnly: true,
// })

const url = require('url')
const path = require('path')
const { join, resolve } = require('path')
const proxy = require('express-http-proxy')
const mockPath = resolve(__dirname, 'mockData.js')
const config = require(mockPath)

// console.log(config, 'mock config')

function parseKey(key) {
    let method = 'get';
    let path = key;

    if (key.indexOf(' ') > -1) {
        const splited = key.split(' ');
        method = splited[0].toLowerCase();
        path = splited[1];
    }

    return {
        method,
        path
    };
}
function winPath (path) {
    return path.replace(/\\/g, '/');
}

function createMockHandler(method, path, value) {
    return function mockHandler(...args) {
      const res = args[1];
      if (typeof value === 'function') {
        value(...args);
      } else {
        res.json(value);
      }
    };
}

function createProxy(method, path, target) {
    return proxy(target, {
        filter(req) {
            return method ? req.method.toLowerCase() === method.toLowerCase() : true;
        },
        forwardPath(req) {
            let matchPath = req.originalUrl;
            const matches = matchPath.match(path);
            if (matches.length > 1) {
                matchPath = matches[1];
            }
            return winPath(join(url.parse(target).path, matchPath));
        },
    });
}

module.exports = function (app) {
    Object.keys(config).forEach(key => {
        const keyParsed = parseKey(key);
        if (typeof config[key] === 'string') {
            let { path } = keyParsed;
            if (/\(.+\)/.test(path)) {
                path = new RegExp(`^${path}$`);
            }
            app.use(path, createProxy(keyParsed.method, path, config[key]));
        } else {
            app[keyParsed.method](
                keyParsed.path,
                createMockHandler(keyParsed.method, keyParsed.path, config[key]),
            );
        }
    })
}
