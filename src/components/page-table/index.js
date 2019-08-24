let {Table, Page} = require('iview/dist/iview');
let Lodash = require('lodash');
let Axios = require('axios');

module.exports = {
    name: 'PageTable',
    template: `
    <div class="page-table">
        <Table ref="table"
               :columns="columns"
               :loading="loading"
               :data="result.content"
               size="small"
               @on-sort-change="onSortChange"
               @on-selection-change="onSelectionChange"
               stripe border ellipsis>
        </Table>
        <Page ref="page" style="text-align: right"
              v-show="result.totalElements>0"
              :show-total="true"
              :show-sizer="true"
              :total="result.totalElements"
              :page-size="params.size"
              :current="params.page+1"
              size="small"
              @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange">
        </Page>
    </div>
    `,
    props: {
        url: {type: [String, Function], required: true},
        params: {type: Object, required: false, default() {return {page: 0, size: 10};}},
        successFormat: {type: Function, required: false, default(data) {return data;}},
        errorFormat: {type: Function, required: false, default(data) {return data;}},
        columns: {type: Array, required: true,}
    },
    model: {
        prop: 'params',
    },
    data() {
        return {
            result: {totalElements: 0, content: []},
            loading: false,//是否加载中
            selection: [],
        };
    },
    methods: {
        initSort() {
            !this.params.sort
            && this.columns.filter(t => t.sortType).forEach(t => {
                this.params.sort = t.key + ',' + t.sortType;
            });
        },
        backupParams() {
            //保存初始化副本，重置时使用
            this.backup = Lodash.merge({}, this.params);
        },
        query(reset) {
            if (reset) this.params.page = this.backup.page;
            this.loading = true;
            let params = Lodash.merge({}, this.params);
            return (typeof this.url === 'string'
                ? Axios.get(this.url, {params: params})
                : this.url(params))
                .then(response => {
                    this.loading = false;
                    this.result = this.successFormat(response.data);
                }, response => {
                    this.$Message.error(this.errorFormat(response))
                })
                .finally(() => this.loading = false);
        },
        onPageChange(page) {
            this.params.page = page - 1;
            this.query();
        },
        onPageSizeChange(size) {
            this.params.size = size;
            this.query(true);
        },
        onSelectionChange(selection) {
            this.selection.splice(0, this.selection.length, ...selection);
        },
        onSortChange(options) {
            this.params.sort = options.order === 'normal'
                ? this.backup.sort
                : options.key + ',' + options.order;
            return this.query(true);
        },
        appendLocationParams() {
            let params = new URLSearchParams(location.search);
            [...params.keys()].forEach(key => {
                this.params[key] = params.get(key);
            });
        },
    },
    components: {
        Table, Page,
    },
    created() {
        this.initSort();
        this.appendLocationParams();
        Lodash.defaults(this.params, {page: 0, size: 10});
        this.backupParams();
        this.query();
    }
};

