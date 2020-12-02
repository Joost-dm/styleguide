/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "build/" + ({"compiler":"compiler"}[chunkId]||chunkId) + "." + {"compiler":"1c4ab75b"}[chunkId] + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "C:\\styleguide";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomButton.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.index-of */ \"./node_modules/core-js/modules/es.array.index-of.js\");\n/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'LevitatingButton',\n  props: {\n    /**\n     * Background color.\n     */\n    background: {\n      type: String,\n      default: '#2c3e50'\n    },\n\n    /**\n     * Text color.\n     */\n    color: {\n      type: String,\n      default: 'white'\n    },\n\n    /**\n     * Button size.\n     * @values small, medium, large\n     */\n    size: {\n      type: String,\n      default: 'medium'\n    }\n  },\n  computed: {\n    styles: function styles() {\n      return {\n        background: this.background,\n        color: this.color\n      };\n    }\n  },\n  mounted: function mounted() {\n    this.setSize();\n  },\n  methods: {\n    setSize: function setSize() {\n      if (['small', 'medium', 'large'].indexOf(this.size) !== -1) {\n        this.$refs.button.classList.add(this.size);\n      } else {\n        this.$refs.button.classList.add('medium');\n      }\n    },\n    handleClick: function handleClick(event) {\n      var _this = this;\n\n      /** Triggered when button is clicked\n       * @event click\n       * @type {Event}\n       */\n      this.$emit('click', event);\n      this.$refs.button__clickCover.classList.remove('button__click-cover_animate');\n      setTimeout(function () {\n        return _this.$refs.button__clickCover.classList.add('button__click-cover_animate');\n      }, 10);\n    },\n    handleMouseEnter: function handleMouseEnter(event) {\n      /** Triggered when mouse enters the button.\n       * @event onmouseenter\n       * @type {Event}\n       */\n      this.$emit('mouseenter', event);\n      this.$refs.button.style.boxShadow = '0 5px 5px rgba(0,0,0,0.7)';\n      this.$refs.button.style.top = 'inherit';\n    },\n    handleMouseLeave: function handleMouseLeave(event) {\n      /** Triggered when mouse leaves the button.\n       * @event onmouseleave\n       * @type {Event}\n       */\n      this.$emit('mouseleave', event);\n      this.$refs.button.style.boxShadow = '0 10px 10px rgba(0,0,0,0.7)';\n      this.$refs.button.style.top = '-1px';\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TextShorter.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.slice */ \"./node_modules/core-js/modules/es.array.slice.js\");\n/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ \"./node_modules/core-js/modules/es.number.constructor.js\");\n/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__);\n\n\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'TextShorter',\n  props: {\n    /**\n    * Inputted text.\n     */\n    text: {\n      type: String,\n      required: true\n    },\n\n    /**\n    * Max length of short text version.\n     */\n    shorterLength: {\n      type: Number,\n      default: 25\n    }\n  },\n  data: function data() {\n    return {\n      fullTextIsShown: false\n    };\n  },\n  computed: {\n    shortedText: function shortedText() {\n      var text = this.text;\n      return text.length > this.shorterLength ? \"\".concat(text.slice(0, this.shorterLength), \"...\") : text;\n    },\n    displayedText: function displayedText() {\n      return this.fullTextIsShown ? this.text : this.shortedText;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"38e39fea-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"38e39fea-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:\"button\",staticClass:\"button\",style:(_vm.styles),on:{\"click\":_vm.handleClick,\"mouseenter\":_vm.handleMouseEnter,\"mouseleave\":_vm.handleMouseLeave}},[_c('div',{ref:\"button__clickCover\",staticClass:\"button__click-cover\"}),_c('span',{staticClass:\"button__text\"},[_vm._t(\"default\")],2)])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2238e39fea-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"38e39fea-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=template&id=0e56113a&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"38e39fea-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TextShorter.vue?vue&type=template&id=0e56113a& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[_vm._v(_vm._s(_vm.displayedText))]),(_vm.text.length > _vm.shorterLength)?_c('button',{on:{\"click\":function($event){_vm.fullTextIsShown = !_vm.fullTextIsShown}}},[(_vm.fullTextIsShown)?_c('span',{staticClass:\"text-shorter__show-button__content_hide-text\"},[_vm._v(\" Hide \")]):_c('span',{staticClass:\"text-shorter__show-button__content_show-text\"},[_vm._v(\" Show full text [\"+_vm._s(_vm.text.length)+\" symbols.]\")])]):_vm._e()])}\nvar staticRenderFns = []\n\n\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%2238e39fea-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.i, \"\\n.button[data-v-50ba38d3] {\\n  border-radius: 5px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  cursor: pointer;\\n  position: relative;\\n  box-shadow: 0 10px 10px rgba(0,0,0,0.7);\\n  transition: 0.1s;\\n  margin: 1rem;\\n}\\n.button__click-cover[data-v-50ba38d3] {\\n  border-radius: 5px;\\n  position: absolute;\\n  transition: 0.2s;\\n  background-color: rgba(0, 0, 0, 0);\\n}\\n.button__click-cover_animate[data-v-50ba38d3] {\\n  background-color: rgba(0, 0, 0, 0.4);\\n  -webkit-animation: clickhandle-data-v-50ba38d3 0.25s ease-in;\\n          animation: clickhandle-data-v-50ba38d3 0.25s ease-in;\\n}\\n@-webkit-keyframes clickhandle-data-v-50ba38d3  {\\n0% {\\n      height: 0;\\n      width: 0;\\n}\\n95% {\\n      height: 100%;\\n      width: 100%;\\n}\\n100% {\\n      height: 0;\\n      width: 0;\\n}\\n}\\n@keyframes clickhandle-data-v-50ba38d3  {\\n0% {\\n      height: 0;\\n      width: 0;\\n}\\n95% {\\n      height: 100%;\\n      width: 100%;\\n}\\n100% {\\n      height: 0;\\n      width: 0;\\n}\\n}\\n.small[data-v-50ba38d3] {\\n  height: 20px;\\n  width: 100px;\\n  font-size: 14px;\\n}\\n.medium[data-v-50ba38d3] {\\n  height: 30px;\\n  width: 150px;\\n  font-size: 16px;\\n}\\n.large[data-v-50ba38d3] {\\n  height: 40px;\\n  width: 200px;\\n  font-size: 20px;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"7eee47e2\", content, true, {\"sourceMap\":false,\"shadowMode\":false});\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/vue-style-loader??ref--7-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-oneOf-1-2!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n\t\tComponent.options.__docs = \"module.exports = {}\"\n\t  });\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (Component) {\n\t\tComponent.options.__docs = \"module.exports = {}\"\n\t  });\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/CustomButton.vue":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/CustomButton.vue ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [\n    {\n        'type': 'markdown',\n        'content': '## Examples\\n\\nButton colors:'\n    },\n    {\n        'type': 'code',\n        'content': '<levitating-button background=\"orange\">orange</levitating-button>\\n<levitating-button background=\"darkred\">darkred</levitating-button>\\n<levitating-button background=\"darkgreen\">darkgreen</levitating-button>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<levitating-button background=\"orange\">orange</levitating-button>\\n<levitating-button background=\"darkred\">darkred</levitating-button>\\n<levitating-button background=\"darkgreen\">darkgreen</levitating-button>'\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': 'Button sizes:'\n    },\n    {\n        'type': 'code',\n        'content': '<levitating-button size=\"small\">small</levitating-button>\\n<levitating-button size=\"medium\">medium</levitating-button>\\n<levitating-button size=\"large\">large</levitating-button>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<levitating-button size=\"small\">small</levitating-button>\\n<levitating-button size=\"medium\">medium</levitating-button>\\n<levitating-button size=\"large\">large</levitating-button>'\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': 'Button with colored text:'\n    },\n    {\n        'type': 'code',\n        'content': '<levitating-button color=\"orange\">orange</levitating-button>\\n<levitating-button color=\"darkred\">darkred</levitating-button>\\n<levitating-button color=\"darkgreen\">darkgreen</levitating-button>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<levitating-button color=\"orange\">orange</levitating-button>\\n<levitating-button color=\"darkred\">darkred</levitating-button>\\n<levitating-button color=\"darkgreen\">darkgreen</levitating-button>'\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': 'Button containing custom tags:'\n    },\n    {\n        'type': 'code',\n        'content': '<levitating-button>Text with <b>bold</b></levitating-button>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<levitating-button>Text with <b>bold</b></levitating-button>'\n        }\n    }\n]\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/TextShorter.vue":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/TextShorter.vue ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nif (false) {}\nvar requireMap = {};\nvar requireInRuntimeBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/requireInRuntime.js\");\nvar requireInRuntime = requireInRuntimeBase.bind(null, requireMap);\nvar evalInContextBase = __webpack_require__(/*! ./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext */ \"./node_modules/vue-styleguidist/lib/loaders/utils/client/evalInContext.js\");\nvar evalInContext = evalInContextBase.bind(null, \n\t\"\", \n\tnull, null)\nmodule.exports = [\n    {\n        'type': 'markdown',\n        'content': 'Component for displaying a short version of the text.\\n\\n## Examples\\n\\nOnly with text-prop:'\n    },\n    {\n        'type': 'code',\n        'content': '<text-shorter text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<text-shorter text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>'\n        }\n    },\n    {\n        'type': 'markdown',\n        'content': 'With custom short-version length value::'\n    },\n    {\n        'type': 'code',\n        'content': '<button>dasdsd</button>\\n<text-shorter shorter-length=\"50\" text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>',\n        'settings': {},\n        'evalInContext': evalInContext.bind(null, requireInRuntime.bind(null, null)),\n        'compiled': {\n            'script': ';return {data:function(){return {};}}',\n            'style': void 0,\n            'template': '<button>dasdsd</button>\\n<text-shorter shorter-length=\"50\" text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>'\n        }\n    }\n]\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue%7Cjs%7Cjsx");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/CustomButton.vue":
/*!******************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/CustomButton.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'displayName': 'LevitatingButton',\n    'exportName': 'default',\n    'docsBlocks': ['## Examples\\n\\nButton colors:\\n\\n```jsx\\n<levitating-button background=\"orange\">orange</levitating-button>\\n<levitating-button background=\"darkred\">darkred</levitating-button>\\n<levitating-button background=\"darkgreen\">darkgreen</levitating-button>\\n```\\n\\nButton sizes:\\n\\n```jsx\\n<levitating-button size=\"small\">small</levitating-button>\\n<levitating-button size=\"medium\">medium</levitating-button>\\n<levitating-button size=\"large\">large</levitating-button>\\n```\\nButton with colored text:\\n\\n```jsx\\n<levitating-button color=\"orange\">orange</levitating-button>\\n<levitating-button color=\"darkred\">darkred</levitating-button>\\n<levitating-button color=\"darkgreen\">darkgreen</levitating-button>\\n```\\n\\nButton containing custom tags:\\n\\n```jsx\\n<levitating-button>Text with <b>bold</b></levitating-button>\\n```'],\n    'description': '',\n    'tags': {},\n    'props': [\n        {\n            'name': 'background',\n            'description': 'Background color.',\n            'type': { 'name': 'string' },\n            'defaultValue': {\n                'func': false,\n                'value': '\\'#2c3e50\\''\n            }\n        },\n        {\n            'name': 'color',\n            'description': 'Text color.',\n            'type': { 'name': 'string' },\n            'defaultValue': {\n                'func': false,\n                'value': '\\'white\\''\n            }\n        },\n        {\n            'name': 'size',\n            'description': 'Button size.',\n            'tags': {},\n            'values': [\n                'small',\n                'medium',\n                'large'\n            ],\n            'type': { 'name': 'string' },\n            'defaultValue': {\n                'func': false,\n                'value': '\\'medium\\''\n            }\n        }\n    ],\n    'events': {\n        'click': {\n            'name': 'click',\n            'description': 'Triggered when button is clicked',\n            'type': { 'names': ['Event'] }\n        },\n        'onmouseenter': {\n            'name': 'onmouseenter',\n            'description': 'Triggered when mouse enters the button.',\n            'type': { 'names': ['Event'] }\n        },\n        'onmouseleave': {\n            'name': 'onmouseleave',\n            'description': 'Triggered when mouse leaves the button.',\n            'type': { 'names': ['Event'] }\n        }\n    },\n    'methods': void 0,\n    'slots': {\n        'default': {\n            'name': 'default',\n            'description': 'Use this slot to place the button content'\n        }\n    },\n    'example': __webpack_require__(/*! !./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/CustomButton.vue */ \"./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/CustomButton.vue\"),\n    'examples': null\n}\n\t\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js");

/***/ }),

/***/ "./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/TextShorter.vue":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js!./src/components/TextShorter.vue ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\t\tif (false) {}\n\n\t\tmodule.exports = {\n    'displayName': 'TextShorter',\n    'exportName': 'default',\n    'docsBlocks': ['Component for displaying a short version of the text.\\n\\n## Examples\\n\\nOnly with text-prop:\\n\\n```jsx\\n<text-shorter text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>\\n```\\n\\nWith custom short-version length value::\\n\\n```\\n<button>dasdsd</button>\\n<text-shorter shorter-length=\"50\" text=\"Мутации следует паттерну функции, которая записывает значение свойства. Получаем какую-либо информацию, возможно обрабатываем её, затем складываем в хранилище. Вот обёртка для мутации ADD_POST. Она будет получать объект post как нагрузку и добавлять post.id в state.postIds. Она также будет добавлять объект post в state.posts, где ключом является post.id. Это обычный паттерн, применяемый в приложениях с Vuex.\"></text-shorter>\\n```'],\n    'description': '',\n    'tags': {},\n    'props': [\n        {\n            'name': 'text',\n            'description': 'Inputted text.',\n            'type': { 'name': 'string' },\n            'required': true\n        },\n        {\n            'name': 'shorterLength',\n            'description': 'Max length of short text version.',\n            'type': { 'name': 'number' },\n            'defaultValue': {\n                'func': false,\n                'value': '25'\n            }\n        }\n    ],\n    'events': void 0,\n    'methods': void 0,\n    'slots': void 0,\n    'example': __webpack_require__(/*! !./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/TextShorter.vue */ \"./node_modules/vue-styleguidist/lib/loaders/examples-loader.js?customLangs=vue|js|jsx!./src/components/TextShorter.vue\"),\n    'examples': null\n}\n\t\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?./node_modules/vue-styleguidist/lib/loaders/vuedoc-loader.js");

/***/ }),

/***/ "./src/components/CustomButton.vue":
/*!*****************************************!*\
  !*** ./src/components/CustomButton.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true& */ \"./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true&\");\n/* harmony import */ var _CustomButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomButton.vue?vue&type=script&lang=js& */ \"./src/components/CustomButton.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& */ \"./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _CustomButton_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CustomButton.vue?vue&type=custom&index=0&blockType=docs */ \"./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _CustomButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"50ba38d3\",\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _CustomButton_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__[\"default\"] === 'function') Object(_CustomButton_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?");

/***/ }),

/***/ "./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs":
/*!********************************************************************************!*\
  !*** ./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_styleguidist_lib_loaders_docs_loader_js_node_modules_vue_cli_plugin_styleguidist_empty_object_loader_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-styleguidist/lib/loaders/docs-loader.js!../../node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./CustomButton.vue?vue&type=custom&index=0&blockType=docs */ \"./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=custom&index=0&blockType=docs\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_styleguidist_lib_loaders_docs_loader_js_node_modules_vue_cli_plugin_styleguidist_empty_object_loader_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?");

/***/ }),

/***/ "./src/components/CustomButton.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/components/CustomButton.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./CustomButton.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?");

/***/ }),

/***/ "./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&":
/*!**************************************************************************************************!*\
  !*** ./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader??ref--7-oneOf-1-0!../../node_modules/css-loader/dist/cjs.js??ref--7-oneOf-1-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/postcss-loader/src??ref--7-oneOf-1-2!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css& */ \"./node_modules/vue-style-loader/index.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=style&index=0&id=50ba38d3&scoped=true&lang=css&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_style_index_0_id_50ba38d3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?");

/***/ }),

/***/ "./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true&":
/*!************************************************************************************!*\
  !*** ./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"38e39fea-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"38e39fea-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/CustomButton.vue?vue&type=template&id=50ba38d3&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CustomButton_vue_vue_type_template_id_50ba38d3_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/CustomButton.vue?");

/***/ }),

/***/ "./src/components/TextShorter.vue":
/*!****************************************!*\
  !*** ./src/components/TextShorter.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextShorter.vue?vue&type=template&id=0e56113a& */ \"./src/components/TextShorter.vue?vue&type=template&id=0e56113a&\");\n/* harmony import */ var _TextShorter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextShorter.vue?vue&type=script&lang=js& */ \"./src/components/TextShorter.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n/* harmony import */ var _TextShorter_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TextShorter.vue?vue&type=custom&index=0&blockType=docs */ \"./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _TextShorter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* custom blocks */\n\nif (typeof _TextShorter_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_3__[\"default\"] === 'function') Object(_TextShorter_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(component)\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?");

/***/ }),

/***/ "./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs":
/*!*******************************************************************************!*\
  !*** ./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_styleguidist_lib_loaders_docs_loader_js_node_modules_vue_cli_plugin_styleguidist_empty_object_loader_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-styleguidist/lib/loaders/docs-loader.js!../../node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./TextShorter.vue?vue&type=custom&index=0&blockType=docs */ \"./node_modules/vue-styleguidist/lib/loaders/docs-loader.js!./node_modules/vue-cli-plugin-styleguidist/empty-object-loader.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=custom&index=0&blockType=docs\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_styleguidist_lib_loaders_docs_loader_js_node_modules_vue_cli_plugin_styleguidist_empty_object_loader_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_custom_index_0_blockType_docs__WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?");

/***/ }),

/***/ "./src/components/TextShorter.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/TextShorter.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--13-0!../../node_modules/babel-loader/lib!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./TextShorter.vue?vue&type=script&lang=js& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_13_0_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?");

/***/ }),

/***/ "./src/components/TextShorter.vue?vue&type=template&id=0e56113a&":
/*!***********************************************************************!*\
  !*** ./src/components/TextShorter.vue?vue&type=template&id=0e56113a& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"38e39fea-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--1-0!../../node_modules/vue-loader/lib??vue-loader-options!./TextShorter.vue?vue&type=template&id=0e56113a& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"38e39fea-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/TextShorter.vue?vue&type=template&id=0e56113a&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_38e39fea_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TextShorter_vue_vue_type_template_id_0e56113a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/components/TextShorter.vue?");

/***/ }),

/***/ 0:
/*!**************************************************************!*\
  !*** multi ./node_modules/vue-styleguidist/lib/client/index ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! C:\\workflow\\styleguide\\node_modules\\vue-styleguidist\\lib\\client\\index */\"./node_modules/vue-styleguidist/lib/client/index.js\");\n\n\n//# sourceURL=webpack:///multi_./node_modules/vue-styleguidist/lib/client/index?");

/***/ })

/******/ });