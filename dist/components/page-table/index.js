(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("iview"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["axios", "iview", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["PageTable"] = factory(require("axios"), require("iview"), require("lodash"));
	else
		root["PeaceIview"] = root["PeaceIview"] || {}, root["PeaceIview"]["PageTable"] = factory(root["axios"], root["iview"], root["_"]);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/page-table/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/page-table/index.js":
/*!********************************************!*\
  !*** ./src/components/page-table/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let {Table, Page} = __webpack_require__(/*! iview/dist/iview */ \"iview/dist/iview\");\nlet Lodash = __webpack_require__(/*! lodash */ \"lodash\");\nlet Axios = __webpack_require__(/*! axios */ \"axios\");\n\nmodule.exports = {\n    name: 'PageTable',\n    template: `\n    <div class=\"page-table\">\n        <Table ref=\"table\"\n               :columns=\"columns\"\n               :loading=\"loading\"\n               :data=\"result.content\"\n               size=\"small\"\n               @on-sort-change=\"onSortChange\"\n               @on-selection-change=\"onSelectionChange\"\n               stripe border ellipsis>\n        </Table>\n        <Page ref=\"page\" style=\"text-align: right\"\n              v-show=\"result.totalElements>0\"\n              :show-total=\"true\"\n              :show-sizer=\"true\"\n              :total=\"result.totalElements\"\n              :page-size=\"params.size\"\n              :current=\"params.page+1\"\n              size=\"small\"\n              @on-change=\"onPageChange\"\n              @on-page-size-change=\"onPageSizeChange\">\n        </Page>\n    </div>\n    `,\n    props: {\n        url: {type: [String, Function], required: true},\n        params: {type: Object, required: false, default() {return {page: 0, size: 10};}},\n        successFormat: {type: Function, required: false, default(data) {return data.data;}},\n        errorFormat: {type: Function, required: false, default(data) {return data;}},\n        columns: {type: Array, required: true,}\n    },\n    model: {\n        prop: 'params',\n    },\n    data() {\n        return {\n            result: {totalElements: 0, content: []},\n            loading: false,//是否加载中\n            selection: [],\n        };\n    },\n    methods: {\n        initSort() {\n            !this.params.sort\n            && this.columns.filter(t => t.sortType).forEach(t => {\n                this.params.sort = t.key + ',' + t.sortType;\n            });\n        },\n        backupParams() {\n            //保存初始化副本，重置时使用\n            this.backup = Lodash.merge({}, this.params);\n        },\n        query(reset) {\n            if (reset) this.params.page = this.backup.page;\n            this.loading = true;\n            let params = Lodash.merge({}, this.params);\n            return (typeof this.url === 'string'\n                ? Axios.get(this.url, {params: params})\n                : this.url(params))\n                .then(response => {\n                    this.loading = false;\n                    this.result = this.successFormat(response);\n                }, response => {\n                    this.$Message.error(this.errorFormat(response))\n                })\n                .finally(() => this.loading = false);\n        },\n        onPageChange(page) {\n            this.params.page = page - 1;\n            this.query();\n        },\n        onPageSizeChange(size) {\n            this.params.size = size;\n            this.query(true);\n        },\n        onSelectionChange(selection) {\n            this.selection.splice(0, this.selection.length, ...selection);\n        },\n        onSortChange(options) {\n            this.params.sort = options.order === 'normal'\n                ? this.backup.sort\n                : options.key + ',' + options.order;\n            return this.query(true);\n        },\n        appendLocationParams() {\n            let params = new URLSearchParams(location.search);\n            [...params.keys()].forEach(key => {\n                this.params[key] = params.get(key);\n            });\n        },\n    },\n    components: {\n        Table, Page,\n    },\n    created() {\n        this.initSort();\n        this.appendLocationParams();\n        Lodash.defaults(this.params, {page: 0, size: 10});\n        this.backupParams();\n        this.query();\n    }\n};\n\n\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/./src/components/page-table/index.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/external_%22axios%22?");

/***/ }),

/***/ "iview/dist/iview":
/*!************************!*\
  !*** external "iview" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_iview_dist_iview__;\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/external_%22iview%22?");

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"root":"_","commonjs":"lodash","commonjs2":"lodash","amd":"lodash"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/external_%7B%22root%22:%22_%22,%22commonjs%22:%22lodash%22,%22commonjs2%22:%22lodash%22,%22amd%22:%22lodash%22%7D?");

/***/ })

/******/ });
});