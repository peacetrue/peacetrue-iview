(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("peacetrue-iview/src/components/upload"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["peacetrue-iview/src/components/upload", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["VideoUpload"] = factory(require("peacetrue-iview/src/components/upload"), require("lodash"));
	else
		root["PeaceIview"] = root["PeaceIview"] || {}, root["PeaceIview"]["VideoUpload"] = factory(root["PeaceIview"]["Upload"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__upload__, __WEBPACK_EXTERNAL_MODULE_lodash__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/video-upload/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../upload":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["PeaceIview","Upload"],"commonjs":"peacetrue-iview/src/components/upload","commonjs2":"peacetrue-iview/src/components/upload","amd":"peacetrue-iview/src/components/upload"} ***!
  \******************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE__upload__;\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/external_%7B%22root%22:%5B%22PeaceIview%22,%22Upload%22%5D,%22commonjs%22:%22peacetrue-iview/src/components/upload%22,%22commonjs2%22:%22peacetrue-iview/src/components/upload%22,%22amd%22:%22peacetrue-iview/src/components/upload%22%7D?");

/***/ }),

/***/ "./src/components/video-upload/index.js":
/*!**********************************************!*\
  !*** ./src/components/video-upload/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let Upload = __webpack_require__(/*! ../upload */ \"../upload\");\nlet Lodash = __webpack_require__(/*! lodash */ \"lodash\");\n\nmodule.exports = Lodash.merge({}, Upload, {\n    name: 'VideoUpload',\n    template: Upload.template.replace(\n        '<slot name=\"content\" class=\"upload-item-content\" :item=\"item\"></slot>',\n        '<video :src=\"item.url\" class=\"upload-item-content\" controls></video>'),\n    props: {\n        text: {type: String, required: false, default: '选择视频'},\n        format: {type: Array, required: false, default() {return ['mp4', 'mkv', 'rmvb']},},\n        maxSize: {type: Number, default: 1024 * 5},\n    }\n});\n\n\n\n//# sourceURL=webpack://PeaceIview.%5Bname%5D/./src/components/video-upload/index.js?");

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