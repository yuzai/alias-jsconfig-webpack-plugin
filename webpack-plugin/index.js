const fs = require('fs');
const path = require('path');
const jsconfig = require('./template');

const promisify = fn => (...args) => new Promise((resolve, reject) => {
    args.push((err, data) => {
        if (err) return reject(err);
        resolve(data);
    });
    fn.apply(this, args);
});

function Test(options) {
    this.options = {
        ...options,
        indentation: 4,
        language: 'js',
        jsx: true,
    };
}

Test.prototype.apply = async function (compiler) {
    const { resolve } = compiler.options;
    let alias = {};
    if (resolve) {
        alias = resolve.alias || {};
    }
    const cwd = process.cwd();
    const file = path.join(cwd, this.options.language === 'ts' ? 'tsconfig.json' : 'jsconfig.json');
    let exsits = true;
    try {
        await promisify(fs.access)(file);
    } catch(e) {
        if (e.code === 'ENOENT') exsits = false;
    }
    let result;
    let baseUrl = './';
    if (!exsits) {
        result = JSON.parse(JSON.stringify(jsconfig));
    } else {
        const res = await promisify(fs.readFile)(file, 'utf-8');
        try {
            result = JSON.parse(res);
        } catch(e) {
            result = JSON.parse(JSON.stringify(jsconfig));
        }
        result.compilerOptions = result.compilerOptions || {};
        baseUrl = result.compilerOptions.baseUrl || './';
        if (this.options.jsx) {
            result.compilerOptions.jsx = result.compilerOptions.jsx || 'preserve';
        }
        result.compilerOptions.paths = {};
    }
    baseUrl = path.join(cwd, baseUrl);
    for (let key in alias) {
        const relative = path.relative(baseUrl, alias[key]);
        result.compilerOptions.paths[key] = [relative];
        result.compilerOptions.paths[`${key}/*`] = [`${relative}/*`];
    }
    try {
        await promisify(fs.writeFile)(file, JSON.stringify(result, null, 4));
    } catch(e) {
        throw e;
    }
}

module.exports = Test;
