const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',
    // mode: 'production',
    entry: {
        'PageTable': './src/components/page-table/index.js',
        'Upload': './src/components/upload/index.js',
        'ImageUpload': './src/components/image-upload/index.js',
        'VideoUpload': './src/components/video-upload/index.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {from: './src/components/upload/style.css', to: './components/upload/style.css'},
            {from: './src/components/video-upload/style.css', to: './components/video-upload/style.css'},
        ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename(chunkData) {
            let name = chunkData.chunk.name.replace(/([A-Z])/g, (value) => '-' + value.toLowerCase()).substr(1);
            return `components/${name}/index.js`;
        },
        library: ['PeaceIview', '[name]'],
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
        'iview/dist/iview': 'iview',
        'lodash': {
            root: '_',
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash'
        },
        'vuedraggable': 'vuedraggable',
        'sortablejs': {
            root: 'Sortable',
            commonjs: 'sortable',
            commonjs2: 'sortable',
            amd: 'sortable'
        },
        '../upload': {
            root: ['PeaceIview', 'Upload'],
            commonjs: 'peacetrue-iview/src/components/upload',
            commonjs2: 'peacetrue-iview/src/components/upload',
            amd: 'peacetrue-iview/src/components/upload'
        }
    }
};