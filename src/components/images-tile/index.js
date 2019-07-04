let ItemsTile = require('../items-tile/index');

module.exports = {
    template: `
        <ItemsTile :items="items" :span="span" :format="format">
            <template v-slot:default="{item}">
                <img :src="item" @click="view(item)" class="item-content"/>                            
            </template>        
        </ItemsTile>    
    `,
    props: {
        items: {type: Array, required: true},
        span: {type: Number, required: false, default: 6},
        format: {type: Function, required: false, default(item) {return item;}},
        view: {type: Function, required: false, default(item) {window.open(item, '_blank');}}
    },
    components: {
        ItemsTile
    }
};