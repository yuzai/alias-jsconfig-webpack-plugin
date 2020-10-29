## webpack plugin

convert alias to jsconfig.json or tsconfig.json

## how to use

npm i --save-dev webpack-plugin-alias-jsconfig

in webpack.config.js:

```js
const Alias = require('webpack-plugin-alias-jsconfig');

// ...plugins
export default {
    // your other config
    // ...
    plugins: [
        // your other plugins
        new Alias({
            language: 'js', // or 'ts'
            jsx: true, // default to true,
            indentation: 4, // default to 4, the indentation of jsconfig.json file
        }),
    ]
}
```

## what it can do 

when there is no jsconfig/tsconfig.json file, this plugin with generater one with the alias in webpack will be written into paths for vscode to find it.

if there had this file, it will rewrite the paths with the alias read from webpack.
