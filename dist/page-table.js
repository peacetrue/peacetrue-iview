(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("iview"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["axios", "iview", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["PageTable"] = factory(require("axios"), require("iview"), require("lodash"));
	else
		root["PageTable"] = factory(root["axios"], root["iview"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_axios__, __WEBPACK_EXTERNAL_MODULE_iview_dist_iview__, __WEBPACK_EXTERNAL_MODULE_lodash__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/page-table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/page-table.js":
/*!***************************!*\
  !*** ./src/page-table.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let {Table, Page} = __webpack_require__(/*! iview/dist/iview */ "iview/dist/iview");
let Lodash = __webpack_require__(/*! lodash */ "lodash");
let Axios = __webpack_require__(/*! axios */ "axios");

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



/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;

/***/ }),

/***/ "iview/dist/iview":
/*!************************!*\
  !*** external "iview" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_iview_dist_iview__;

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"root":"_","commonjs":"lodash","commonjs2":"lodash","amd":"lodash"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9zcmMvcGFnZS10YWJsZS5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL1tuYW1lXS9leHRlcm5hbCBcIml2aWV3XCIiLCJ3ZWJwYWNrOi8vW25hbWVdL2V4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJsb2Rhc2hcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoXCIsXCJhbWRcIjpcImxvZGFzaFwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLEtBQUssWUFBWSxHQUFHLG1CQUFPLENBQUMsMENBQWtCO0FBQzlDLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixZQUFZLG1CQUFPLENBQUMsb0JBQU87O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZCQUE2QjtBQUMzQyxpQkFBaUIsMENBQTBDLFlBQVk7QUFDdkUsaUJBQWlCLGdEQUFnRCxjQUFjO0FBQy9FLGtCQUFrQjtBQUNsQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQjtBQUM3QztBQUNBLHFCQUFxQiw4QkFBOEI7QUFDbkQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHdCQUF3QixpQ0FBaUM7QUFDakc7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0ZBLG1EOzs7Ozs7Ozs7OztBQ0FBLDhEOzs7Ozs7Ozs7OztBQ0FBLG9EIiwiZmlsZSI6InBhZ2UtdGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJheGlvc1wiKSwgcmVxdWlyZShcIml2aWV3XCIpLCByZXF1aXJlKFwibG9kYXNoXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImF4aW9zXCIsIFwiaXZpZXdcIiwgXCJsb2Rhc2hcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUGFnZVRhYmxlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXhpb3NcIiksIHJlcXVpcmUoXCJpdmlld1wiKSwgcmVxdWlyZShcImxvZGFzaFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUGFnZVRhYmxlXCJdID0gZmFjdG9yeShyb290W1wiYXhpb3NcIl0sIHJvb3RbXCJpdmlld1wiXSwgcm9vdFtcIl9cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9heGlvc19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2l2aWV3X2Rpc3RfaXZpZXdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9sb2Rhc2hfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UtdGFibGUuanNcIik7XG4iLCJsZXQge1RhYmxlLCBQYWdlfSA9IHJlcXVpcmUoJ2l2aWV3L2Rpc3QvaXZpZXcnKTtcbmxldCBMb2Rhc2ggPSByZXF1aXJlKCdsb2Rhc2gnKTtcbmxldCBBeGlvcyA9IHJlcXVpcmUoJ2F4aW9zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG5hbWU6ICdQYWdlVGFibGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cInBhZ2UtdGFibGVcIj5cbiAgICAgICAgPFRhYmxlIHJlZj1cInRhYmxlXCJcbiAgICAgICAgICAgICAgIDpjb2x1bW5zPVwiY29sdW1uc1wiXG4gICAgICAgICAgICAgICA6bG9hZGluZz1cImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgOmRhdGE9XCJyZXN1bHQuY29udGVudFwiXG4gICAgICAgICAgICAgICBzaXplPVwic21hbGxcIlxuICAgICAgICAgICAgICAgQG9uLXNvcnQtY2hhbmdlPVwib25Tb3J0Q2hhbmdlXCJcbiAgICAgICAgICAgICAgIHN0cmlwZSBib3JkZXIgZWxsaXBzaXM+XG4gICAgICAgIDwvVGFibGU+XG4gICAgICAgIDxQYWdlIHJlZj1cInBhZ2VcIiBzdHlsZT1cInRleHQtYWxpZ246IHJpZ2h0XCJcbiAgICAgICAgICAgICAgdi1zaG93PVwicmVzdWx0LnRvdGFsRWxlbWVudHM+MFwiXG4gICAgICAgICAgICAgIDpzaG93LXRvdGFsPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIDpzaG93LXNpemVyPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIDp0b3RhbD1cInJlc3VsdC50b3RhbEVsZW1lbnRzXCJcbiAgICAgICAgICAgICAgOnBhZ2Utc2l6ZT1cImlubmVyUGFyYW1zLnNpemVcIlxuICAgICAgICAgICAgICA6Y3VycmVudD1cImlubmVyUGFyYW1zLnBhZ2UrMVwiXG4gICAgICAgICAgICAgIHNpemU9XCJzbWFsbFwiXG4gICAgICAgICAgICAgIEBvbi1jaGFuZ2U9XCJvblBhZ2VDaGFuZ2VcIlxuICAgICAgICAgICAgICBAb24tcGFnZS1zaXplLWNoYW5nZT1cIm9uUGFnZVNpemVDaGFuZ2VcIj5cbiAgICAgICAgPC9QYWdlPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvcHM6IHtcbiAgICAgICAgdXJsOiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gICAgICAgIHBhcmFtczoge3R5cGU6IE9iamVjdCwgcmVxdWlyZWQ6IGZhbHNlLCBkZWZhdWx0KCkge3JldHVybiB7fTt9fSxcbiAgICAgICAgZmlsdGVyOiB7dHlwZTogRnVuY3Rpb24sIHJlcXVpcmVkOiBmYWxzZSwgZGVmYXVsdChkYXRhKSB7cmV0dXJuIGRhdGE7fX0sXG4gICAgICAgIGNvbHVtbnM6IHt0eXBlOiBBcnJheSwgcmVxdWlyZWQ6IHRydWUsfVxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC8v5p+l6K+i5Y+C5pWwXG4gICAgICAgICAgICBpbm5lclBhcmFtczoge3BhZ2U6IDAsIHNpemU6IDEwLH0sXG4gICAgICAgICAgICAvL+afpeivoue7k+aenFxuICAgICAgICAgICAgcmVzdWx0OiB7dG90YWxFbGVtZW50czogMCwgY29udGVudDogW119LFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsLy/mmK/lkKbliqDovb3kuK1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgaW5pdFNvcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMuZmlsdGVyKHQgPT4gdC5zb3J0VHlwZSkuZm9yRWFjaCh0ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyUGFyYW1zLnNvcnQgPSB0LmtleSArICcsJyArIHQuc29ydFR5cGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmFja3VwUGFyYW1zKCkge1xuICAgICAgICAgICAgLy/kv53lrZjliJ3lp4vljJblia/mnKzvvIzph43nva7ml7bkvb/nlKhcbiAgICAgICAgICAgIHRoaXMuYmFja3VwID0gTG9kYXNoLmV4dGVuZCh7fSwgdGhpcy5pbm5lclBhcmFtcywgdGhpcy5wYXJhbXMpO1xuICAgICAgICB9LFxuICAgICAgICBxdWVyeShyZXNldCkge1xuICAgICAgICAgICAgaWYgKHJlc2V0KSB0aGlzLmlubmVyUGFyYW1zLnBhZ2UgPSB0aGlzLmJhY2t1cC5wYWdlO1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBBeGlvcy5nZXQodGhpcy51cmwsIHtwYXJhbXM6IExvZGFzaC5leHRlbmQoe30sIHRoaXMuaW5uZXJQYXJhbXMsIHRoaXMucGFyYW1zKX0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHQgPSB0aGlzLmZpbHRlcihyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJQYXJhbXMucGFnZSA9IHBhZ2UgLSAxO1xuICAgICAgICAgICAgdGhpcy5xdWVyeSgpO1xuICAgICAgICB9LFxuICAgICAgICBvblBhZ2VTaXplQ2hhbmdlKHNpemUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJQYXJhbXMuc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5KHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBvblNvcnRDaGFuZ2Uob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5pbm5lclBhcmFtcy5zb3J0ID0gb3B0aW9ucy5vcmRlciA9PT0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICA/IHRoaXMuYmFja3VwLnNvcnQgOiBvcHRpb25zLmtleSArICcsJyArIG9wdGlvbnMub3JkZXI7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5xdWVyeSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgYXBwZW5kTG9jYXRpb25QYXJhbXMoKSB7XG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgICAgWy4uLnBhcmFtcy5rZXlzKCldLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyUGFyYW1zW2tleV0gPSBwYXJhbXMuZ2V0KGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgVGFibGUsIFBhZ2UsXG4gICAgfSxcbiAgICBjcmVhdGVkKCkge1xuICAgICAgICB0aGlzLmluaXRTb3J0KCk7XG4gICAgICAgIHRoaXMuYXBwZW5kTG9jYXRpb25QYXJhbXMoKTtcbiAgICAgICAgdGhpcy5iYWNrdXBQYXJhbXMoKTtcbiAgICAgICAgdGhpcy5xdWVyeSgpO1xuICAgIH1cbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9heGlvc19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9pdmlld19kaXN0X2l2aWV3X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2xvZGFzaF9fOyJdLCJzb3VyY2VSb290IjoiIn0=