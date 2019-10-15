let {Modal, Row, Col} = require('iview/dist/iview');

module.exports = {
    name: 'ImageSelect',
    template: `
        <div class="image-select">
            <!-- 选中值 -->
            <template v-if="value">
                <img :src="prefix+value" />
                <div class="image-select-cover">
                    <Icon type="ios-eye-outline" @click.native="viewImage(prefix+value)"></Icon>
                    <Icon type="md-add" @click.native="openDialog()"></Icon>
                </div>
            </template>
            <Button v-else size="small" @click="openDialog()">选择图片</Button>
            <!-- 选项 -->
            <Modal v-model="dialog.visible" footer-hide mask-closable title="图片列表" class="image-select-dialog">
                <Row>
                    <Col v-for="item in items" :key="item" span="4">
                        <img :src="prefix+item" @click="selectOption(item)" :class="getOptionClass(item)"/>
                    </Col>
                </Row>    
            </Modal>
        </div>                    
    `,
    props: {
        /** 图片选项值 */
        items: {type: Array, required: false, default() {return [];}},
        /** 选中图片值 */
        value: {type: String, required: false},
        /** 图片前缀 */
        prefix: {type: String, required: false, default: ""},
    },
    data() {
        return {
            dialog: {
                visible: false,
            }
        };
    },
    methods: {
        /** 查看 */
        viewImage(item) {
            window.open(item, 'target=_blank')
        },
        /** 打开列表选择对话框 */
        openDialog() {
            this.dialog.visible = true;
        },
        /** 选中选项 */
        selectOption(item) {
            this.$emit('input', item);
        },
        /** 选项样式 */
        getOptionClass(item) {
            return item === this.value ? 'selected' : '';
        },
    },
    components: {
        Modal, Row, Col
    }
};

