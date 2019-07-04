let {Row, Col} = require('iview/dist/iview');

//多项平铺展示
module.exports = {
    name: 'ItemsTile',
    template: `
    <Row class="items-tile">
        <Col v-for="item,index in items" :span="span" class="item-col" :key="index">
            <slot :item="format(item)" class="item-content"></slot>
        </Col>
    </Row>
    `,
    props: {
        items: {type: Array, required: true},
        span: {type: Number, required: false, default: 4},
        format: {type: Function, required: false, default(item) {return item;}},
    },
    components: {
        Row, Col,
    },
};