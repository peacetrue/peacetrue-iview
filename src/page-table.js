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
               stripe border ellipsis>
        </Table>
        <Page ref="page" style="text-align: right"
              v-show="result.totalElements>0"
              :show-total="true"
              :show-sizer="true"
              :total="result.totalElements"
              :page-size="innerParams.size"
              :current="innerParams.page+1"
              size="small"
              @on-change="onPageChange"
              @on-page-size-change="onPageSizeChange">
        </Page>
    </div>
    `,
    props: {
        url: {type: String, required: true},
        params: {type: Object, required: false, default() {return {};}},
        filter: {type: Function, required: false, default(data) {return data;}},
        columns: {type: Array, required: true,}
    },
    data() {
        return {
            //查询参数
            innerParams: {page: 0, size: 10,},
            //查询结果
            result: {totalElements: 0, content: []},
            loading: false,//是否加载中
        };
    },
    methods: {
        initSort() {
            this.columns.filter(t => t.sortType).forEach(t => {
                this.innerParams.sort = t.key + ',' + t.sortType;
            });
        },
        backupParams() {
            //保存初始化副本，重置时使用
            this.backup = Lodash.extend({}, this.innerParams, this.params);
        },
        query(reset) {
            if (reset) this.innerParams.page = this.backup.page;
            this.loading = true;
            return Axios.get(this.url, {params: Lodash.extend({}, this.innerParams, this.params)})
                .then(response => {
                    this.loading = false;
                    this.result = this.filter(response.data);
                })
                .finally(() => this.loading = false);
        },
        onPageChange(page) {
            this.innerParams.page = page - 1;
            this.query();
        },
        onPageSizeChange(size) {
            this.innerParams.size = size;
            this.query(true);
        },
        onSortChange(options) {
            this.innerParams.sort = options.order === 'normal'
                ? this.backup.sort : options.key + ',' + options.order;
            return this.query(true);
        },
        appendLocationParams() {
            let params = new URLSearchParams(location.search);
            [...params.keys()].forEach(key => {
                this.innerParams[key] = params.get(key);
            });
        },
    },
    components: {
        Table, Page,
    },
    created() {
        this.initSort();
        this.appendLocationParams();
        this.backupParams();
        this.query();
    }
};

