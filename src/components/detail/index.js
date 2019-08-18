/**详情容器*/
let Detail = {
    name: 'detail',
    props: {
        data: {type: Object},
        labelSpan: {type: Number, default: 4},
        valueSpan: {type: Number, default: 8},
        showClose: {type: Boolean, default: true},
        defaultValue: {default: '--'}
    },
    provide() {
        return {
            $_detail_data: this.data,
            $_detail_labelSpan: this.labelSpan,
            $_detail_valueSpan: this.valueSpan,
            $_detail_defaultValue: this.defaultValue,
        };
    },
    template: `<div class="detail">
                 <slot></slot>
                 <slot name="close" v-if="showClose">
                    <div class="detail-close">
                        <i-button @click="window.close()">关闭</i-button>
                    </div>
                 </slot>
              </div>`
};

let childComponentMixIn = {
    props: {
        data: {type: Object, default() {return this.$_detail_data}},
        name: {type: String,},
        defaultValue: {default() {return this.$_detail_defaultValue}},
        value: {
            default() {
                if (this.data && this.name) {
                    return (window.jsonpath
                        ? jsonpath.value(this.data, `$.${this.name}`)
                        : this.data[this.name])
                        || this.defaultValue;
                }
            }
        }
    },
    inject: ['$_detail_data', '$_detail_labelSpan', '$_detail_valueSpan', '$_detail_defaultValue'],
};

/**详情展开*/
let DetailHeader = {
    name: 'detail-header',
    template: '<div :class="className"><slot></slot></div>',
    props: {
        size: {type: Number, default: 1},
    },
    computed: {
        className() {
            return ['detail-header', 'detail-header-' + this.size].join(' ');
        }
    }
};

/**详情项*/
let DetailItem = {
    name: 'detail-item',
    mixins: [childComponentMixIn],
    props: {
        label: {type: String, required: true},
        labelSpan: {type: Number, default() {return this.$_detail_labelSpan}},
        value: {type: [String, Boolean, Number], default: childComponentMixIn.props.value.default},
        valueSpan: {type: Number, default() {return this.$_detail_valueSpan}},
    },
    template: `<div>
                    <i-col class="detail-item-label" :span="labelSpan">{{label}}</i-col>
                    <i-col class="detail-item-value" :span="valueSpan"><slot>{{value}}</slot></i-col>
                </div>`
};

/**详情表格*/
let DetailTable = {
    name: 'detail-table',
    mixins: [childComponentMixIn],
    props: {
        label: {type: Object, required: true},
        value: {type: Array, default: childComponentMixIn.props.value.default}
    },
    inject: ['$_detail_data'],
    template: '<i-table v-bind="label" v-bind:data="value"></i-table>'
};

module.exports = {
    Detail, DetailHeader, DetailItem, DetailTable
};