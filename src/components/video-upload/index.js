let Upload = require('../upload');
let Lodash = require('lodash');

module.exports = Lodash.merge({}, Upload, {
    name: 'VideoUpload',
    template: Upload.template.replace(
        '<slot name="content" class="upload-item-content" :item="item"></slot>',
        '<video :src="item.url" class="upload-item-content" controls></video>'),
    props: {
        text: {type: String, required: false, default: '选择视频'},
        format: {type: Array, required: false, default() {return ['mp4', 'mkv', 'rmvb']},},
    }
});

