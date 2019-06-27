let {Upload, Icon, Progress} = require('iview/dist/iview');
let Draggable = require('vuedraggable');

module.exports = {
    name: 'Upload',
    template: `
    <Draggable class="upload" :list="currentItems" @change="setModelValue" :options="{draggable:'.upload-item'}">
        <div class="upload-item" v-for="item in currentItems" :key="item.id">
            <template v-if="item.status === 'finished'">
                <slot name="content" class="upload-item-content" :item="item"></slot>
                <div class="upload-item-cover">
                    <Icon type="ios-eye-outline" @click.native="view(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :default-file-list="items"
                :on-success="handleSuccess"
                :format="format"
                :max-size="maxSize"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :action="action"
                class="upload-selector"
                v-show="showUploader">
            <div>{{text}}</div>
        </Upload>
    </Draggable>`,
    model: {
        prop: 'items',
    },
    props: {
        /**模型属性，组件内不能修改，该属性在组件内无具体用处*/
        items: {type: Array, default() {return [];}},
        /**请求地址*/
        action: {type: String, default: '/file',},
        /**选择图片的文本内容*/
        text: {type: String, required: true},
        /**数据格式化器，格式化服务端返回的数据，组件接收的数据格式为：{id: '', url: ''}*/
        formatData: {type: Function, default: function (res) {return res;}},
        /**文件格式*/
        format: {type: Array, required: true,},
        /**可上传的最大文件数*/
        maxCount: {type: Number, default: 5},
        /**可上传的文件大小*/
        maxSize: {type: Number, default: 1024 * 2},
    },
    data() {
        return {
            currentItems: [],
        };
    },
    methods: {
        /**同步模型数据*/
        setModelValue() {
            this.$emit('input', [...this.currentItems.map(file => ({id: file.id, url: file.url}))]);
        },
        /**查看*/
        view(item) {
            window.open(item.url, 'target=_blank')
        },
        handleSuccess(res, file) {
            let data = this.formatData(res);
            file.id = data.id;
            file.url = data.url;
            this.setModelValue();
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: `文件'${file.name}'格式不正确，请上传[${this.format.join('、')}]格式的文件`
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: `文件'${file.name}'太大，不能超过 ${this.maxSize / 1024}M`
            });
        },
        handleBeforeUpload() {
            const check = this.currentItems.length < this.maxCount;
            if (!check) this.$Notice.warning({title: `最多只能上传${this.maxCount}个文件`});
            return check;
        },
        handleRemove(file) {
            this.currentItems.splice(this.currentItems.indexOf(file), 1);
            this.setModelValue();
        },
    },
    computed: {
        showUploader() {
            return this.maxCount > this.currentItems.length;
        },
    },
    mounted() {
        this.currentItems = this.$refs.upload.fileList;
    },
    watch: {
        items() {
            //items->defaultFileList->fileList->currentItems
            this.$nextTick(() => this.currentItems = this.$refs.upload.fileList);
        }
    },
    components: {
        Upload,
        Draggable,
        Progress,
        Icon
    },
};

