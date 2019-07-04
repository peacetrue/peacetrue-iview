let ItemsTile = require('../items-tile/index');

module.exports = {
    name: 'VideosTile',
    template: `
        <ItemsTile :items="items" :span="span" :format="format">
            <template v-slot:default="{item}">
                <video :src="item" @click="view(item)" controls class="item-content"></video>                            
            </template>        
        </ItemsTile>    
    `,
    props: {
        items: {type: Array, required: true},
        span: {type: Number, required: false, default: 4},
        format: {type: Function, required: false, default(item) {return item;}},
        view: {type: Function, required: false, default(item) {window.open(item, '_blank');}}
    },
    components: {
        ItemsTile
    }
};