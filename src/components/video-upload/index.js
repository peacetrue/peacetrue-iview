let {Modal} = require('iview/dist/iview');
let Upload = require('../upload');
let Lodash = require('lodash');

module.exports = Lodash.merge({}, Upload, {
    name: 'VideoUpload',
    template:
        `<div>
            ${Upload.template.replace(
            '<slot name="content" class="upload-item-content" :item="item"></slot>',
            '<video :src="item.url" class="upload-item-content" controls></video>')}
            <Modal v-model="visible" footer-hide fullscreen mask-closable title="视频">
                <video v-if="url" :src="url" class="upload-item-content" style="width: 100%;height:100%" controls autoplay></video>
            </Modal>
        </div>`,
    props: {
        text: {type: String, required: false, default: '选择视频'},
        format: {type: Array, required: false, default() {return ['mp4', 'mkv', 'rmvb']},},
        maxSize: {type: Number, default: 1024 * 5},
    },
    data() {
        return {
            currentItems: [],
            visible: false,
            url: null,
        };
    },
    methods: {
        /**查看*/
        view(item) {
            this.visible = true;
            this.url = item.url;
        },
    },
    components: {
        Modal,
    }
});

