let Upload = require('../upload');
let Lodash = require('lodash');

module.exports = Lodash.merge({}, Upload, {
    name: 'ImageUpload',
    template: Upload.template.replace(
        '<slot name="content" class="upload-item-content" :item="item"></slot>',
        '<img class="upload-item-content" :src="item.url"/>'),
    props: {
        /**选择图片的文本内容*/
        text: {type: String, required: false, default: '选择图片'},
        /**文件格式*/
        format: {type: Array, required: false, default() {return ['jpg', 'jpeg', 'png']},},
    }
});

