const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'PageTable': './src/page-table.js',
    },
    devtool: 'inline-source-map',
    module: {},
    plugins: [
        new CleanWebpackPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename(chunkData) {
            let name = chunkData.chunk.name.replace(/([A-Z])/g, (value) => '-' + value.toLowerCase()).substr(1);
            return `${name}.js`;
        },
        library: '[name]',
        libraryExport: '',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        },
        'iview/dist/iview': {
            root: 'iview',
            commonjs: 'iview',
            commonjs2: 'iview',
            amd: 'iview'
        },
        'lodash': {
            root: '_',
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        },
        'qs': {
            root: 'Qs',
            commonjs: 'qs',
            commonjs2: 'qs',
            amd: 'qs'
        },
        'axios': {
            root: 'axios',
            commonjs: 'axios',
            commonjs2: 'axios',
            amd: 'axios'
        },
    }
};