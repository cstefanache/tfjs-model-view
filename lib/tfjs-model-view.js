(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("tfjs-model-view", [], factory);
	else if(typeof exports === 'object')
		exports["tfjs-model-view"] = factory();
	else
		root["tfjs-model-view"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/default.config.js":
/*!*******************************!*\
  !*** ./src/default.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    renderer: 'canvas',

    radius: 6,
    nodePadding: 2,
    layerPadding: 20,
    groupPadding: 1,

    xPadding: 10,
    yPadding: 10,

    plotActivations: false
};
module.exports = exports['default'];

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _modelParser = __webpack_require__(/*! ./model-parser */ "./src/model-parser.js");

var _modelParser2 = _interopRequireDefault(_modelParser);

var _canvas = __webpack_require__(/*! ./renderers/canvas.renderer */ "./src/renderers/canvas.renderer.js");

var _canvas2 = _interopRequireDefault(_canvas);

var _default = __webpack_require__(/*! ./default.config */ "./src/default.config.js");

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelView = function ModelView(model, customConfig) {
    _classCallCheck(this, ModelView);

    var config = Object.assign({}, _default2.default, customConfig);

    var renderer = void 0;

    config.predictCallback = function (input) {
        if (renderer) {
            renderer.update(model, input);
        }
    };

    config.hookCallback = function (layer) {
        if (renderer) {
            renderer.render(layer);
        }
    };

    (0, _modelParser2.default)(model, config).then(function (res) {
        renderer = new _canvas2.default(config, res);
    });
};

exports.default = ModelView;
module.exports = exports['default'];

/***/ }),

/***/ "./src/model-parser.js":
/*!*****************************!*\
  !*** ./src/model-parser.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var parseModel = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(model, options) {
    var parsed, parserConfig, parseLayer, predict, layerArr;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            parseLayer = function parseLayer(layer, nextColumn) {
              var _this = this;

              var name = layer.name,
                  input = layer.input,
                  inputs = layer.inputs,
                  shape = layer.shape,
                  sourceLayer = layer.sourceLayer;

              var _ref2 = sourceLayer || {},
                  getWeights = _ref2.getWeights,
                  setCallHook = _ref2.setCallHook,
                  activation = _ref2.activation;

              var currentLayer = {
                previousColumn: [],
                name: name,
                shape: shape,
                weights: {},
                getWeights: noop,
                mapPosition: Object.keys(parsed.layerMap).length
              };

              parsed.layerMap[name] = currentLayer;
              parsed.layerArr.unshift(currentLayer);

              if (activation) {
                var className = activation.getClassName();
                currentLayer.activation = {
                  name: className
                };
              }

              if (setCallHook) {
                sourceLayer.setCallHook(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(layerInput) {
                    var i;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            currentLayer.getWeights();
                            currentLayer.activations = [];
                            i = 0;

                          case 3:
                            if (!(i < layerInput.length)) {
                              _context.next = 12;
                              break;
                            }

                            _context.t0 = currentLayer.activations;
                            _context.next = 7;
                            return layerInput[i].dataSync();

                          case 7:
                            _context.t1 = _context.sent;

                            _context.t0.push.call(_context.t0, _context.t1);

                          case 9:
                            i++;
                            _context.next = 3;
                            break;

                          case 12:
                            parserConfig.hookCallback(currentLayer);

                          case 13:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              }

              if (getWeights) {

                currentLayer.getWeights = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  var weights, i, weight, rankType, weightName;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return sourceLayer.getWeights();

                        case 2:
                          weights = _context2.sent;
                          i = 0;

                        case 4:
                          if (!(i < weights.length)) {
                            _context2.next = 16;
                            break;
                          }

                          weight = weights[i];
                          rankType = weight.rankType, weightName = weight.name;

                          currentLayer.hasWeights = true;
                          _context2.t0 = weightName;
                          _context2.next = 11;
                          return weights[i].dataSync();

                        case 11:
                          _context2.t1 = _context2.sent;
                          currentLayer.weights[rankType] = {
                            name: _context2.t0,
                            values: _context2.t1
                          };

                        case 13:
                          i++;
                          _context2.next = 4;
                          break;

                        case 16:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                }));

                currentLayer.getWeights();
              }

              if (inputs) {
                inputs.forEach(function (inp) {
                  parseLayer(inp, currentLayer.previousColumn);
                });
              } else {
                parseLayer(input, currentLayer.previousColumn);
              }

              if (nextColumn) {
                nextColumn.push(currentLayer);
              }

              return currentLayer;
            };

            parsed = {
              layerMap: {},
              layerArr: []
            };
            parserConfig = _extends({
              predictCallback: noop,
              hookCallback: noop
            }, options);
            predict = model.predict;


            model.predict = function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              var result = predict.apply(model, args);
              model.outputData = result.dataSync();
              parserConfig.predictCallback(args);
              return result;
            };

            _context3.next = 7;
            return parseLayer(model.layers[model.layers.length - 1].output);

          case 7:
            parsed.model = _context3.sent;


            if (options.printStats) {
              layerArr = parsed.layerArr;

              console.log(new Array(10).join('-'));
              layerArr.forEach(function (layer) {
                console.log('Layer: ' + layer.name);
              });
            }

            return _context3.abrupt('return', parsed);

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function parseModel(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function noop() {}

exports.default = parseModel;
module.exports = exports['default'];

/***/ }),

/***/ "./src/renderers/abstract.renderer.js":
/*!********************************************!*\
  !*** ./src/renderers/abstract.renderer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractRenderer = function AbstractRenderer(config, initData) {
    var _this = this;

    _classCallCheck(this, AbstractRenderer);

    var xPadding = config.xPadding,
        yPadding = config.yPadding,
        _config$layer = config.layer,
        layer = _config$layer === undefined ? {} : _config$layer;
    var layerArr = initData.layerArr;


    var maxHeight = (yPadding || 1) * 2;
    var cx = xPadding || 0;

    this.layers = {};

    layerArr.forEach(function (l) {
        var name = l.name,
            shape = l.shape,
            activation = l.activation;

        _this.outputLayer = l;
        var customConfig = layer[name] || {};
        var layerConfig = Object.assign({}, config, customConfig);
        var radius = layerConfig.radius,
            nodePadding = layerConfig.nodePadding,
            layerPadding = layerConfig.layerPadding,
            groupPadding = layerConfig.groupPadding,
            _layerConfig$domainMa = layerConfig.domainMax,
            domainMax = _layerConfig$domainMa === undefined ? 1 : _layerConfig$domainMa,
            reshape = layerConfig.reshape;

        var _Object$assign = Object.assign([1, 1, 1], shape.slice(1)),
            _Object$assign2 = _slicedToArray(_Object$assign, 3),
            rows = _Object$assign2[0],
            cols = _Object$assign2[1],
            groups = _Object$assign2[2];

        var totalNodes = rows * cols * groups;

        if (reshape) {
            var _Object$assign3 = Object.assign([1, 1, 1], reshape),
                _Object$assign4 = _slicedToArray(_Object$assign3, 3),
                nr = _Object$assign4[0],
                nc = _Object$assign4[1],
                ng = _Object$assign4[2];

            if (nr * nc * ng !== totalNodes) {
                throw new Error("Unable to reshape from [" + rows + ", " + cols + ", " + groups + "] to [" + nr + ", " + nc + ", " + ng + "]");
            }

            rows = nr;
            cols = nc;
            groups = ng;
        }

        cx += layerPadding;
        var step = radius + nodePadding;
        var width = layerPadding + cols * step;
        var nodes = [];
        var height = 0;

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                for (var g = 0; g < groups; g++) {
                    var y = groupPadding + radius + r * step + g * rows * (step + groupPadding);
                    nodes.push({
                        x: cx + c * step,
                        y: y
                    });
                    height = y;
                }
            }
        }

        height += groupPadding + radius;
        maxHeight = Math.max(maxHeight, height);

        _this.layers[name] = {
            name: name,
            x: cx,
            layerWidth: width,
            layerHeight: height,
            radius: radius,
            nodes: nodes,
            domainMax: domainMax,
            layer: l
        };

        cx += width;
    });

    cx += xPadding || 0;

    Object.assign(this, { width: cx, height: maxHeight });
};

exports.default = AbstractRenderer;
module.exports = exports["default"];

/***/ }),

/***/ "./src/renderers/canvas.renderer.js":
/*!******************************************!*\
  !*** ./src/renderers/canvas.renderer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract = __webpack_require__(/*! ./abstract.renderer */ "./src/renderers/abstract.renderer.js");

var _abstract2 = _interopRequireDefault(_abstract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasRenderer = function (_AbstractRenderer) {
    _inherits(CanvasRenderer, _AbstractRenderer);

    function CanvasRenderer(config, initData) {
        _classCallCheck(this, CanvasRenderer);

        var _this = _possibleConstructorReturn(this, (CanvasRenderer.__proto__ || Object.getPrototypeOf(CanvasRenderer)).call(this, config, initData));

        var canvas = document.createElement('canvas');

        canvas.setAttribute('width', _this.width);
        canvas.setAttribute('height', _this.height);
        document.body.appendChild(canvas);

        _this.renderContext = canvas.getContext('2d');
        _this.renderElement = canvas;
        return _this;
    }

    _createClass(CanvasRenderer, [{
        key: 'update',
        value: function update(model, input) {
            var _this2 = this;

            var inputs = Object.keys(this.layers).filter(function (name) {
                return name.indexOf('_input') !== -1;
            });

            if (inputs.length !== input.length) {
                throw new Error('identified 2 input layers: ' + inputs.join(',') + ' and had only ' + input.length + ' input values');
            }

            inputs.forEach(function (name, index) {
                _this2.render({ name: name }, input[index].dataSync());
            });

            this.render(this.outputLayer, model.outputData);
        }
    }, {
        key: 'render',
        value: function render(layer, activations, outputData) {
            var _this3 = this;

            var name = layer.name,
                previousColumn = layer.previousColumn;

            if (activations || outputData) {
                var vals = activations || outputData;
                var height = this.height;


                try {
                    var _layers$name = this.layers[name],
                        x = _layers$name.x,
                        layerWidth = _layers$name.layerWidth,
                        radius = _layers$name.radius,
                        nodes = _layers$name.nodes,
                        layerHeight = _layers$name.layerHeight,
                        domainMax = _layers$name.domainMax;

                    var sy = Math.floor((height - layerHeight) / 2);
                    this.renderContext.clearRect(x - radius / 2 - 2, 0, layerWidth + 2, height);

                    nodes.forEach(function (node, index) {
                        var nx = node.x,
                            ny = node.y;

                        _this3.renderContext.strokeStyle = '#000';
                        _this3.renderContext.fillStyle = 'rgba(0,0,0, ' + vals[index] / domainMax + ')';
                        _this3.renderContext.beginPath();
                        _this3.renderContext.arc(nx, sy + ny, radius / 2, 0, 2 * Math.PI);
                        if (radius > 3) {
                            _this3.renderContext.stroke();
                        }
                        _this3.renderContext.fill();
                    });
                } catch (err) {
                    debugger;
                }
            } else if (previousColumn && previousColumn.length > 0 && layer.activations) {
                for (var i = 0; i < layer.previousColumn.length; i++) {
                    this.render(layer.previousColumn[i], layer.activations[i]);
                }
            }
        }
    }]);

    return CanvasRenderer;
}(_abstract2.default);

exports.default = CanvasRenderer;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3RmanMtbW9kZWwtdmlldy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvLi9zcmMvZGVmYXVsdC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vdGZqcy1tb2RlbC12aWV3Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RmanMtbW9kZWwtdmlldy8uL3NyYy9tb2RlbC1wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vdGZqcy1tb2RlbC12aWV3Ly4vc3JjL3JlbmRlcmVycy9hYnN0cmFjdC5yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvLi9zcmMvcmVuZGVyZXJzL2NhbnZhcy5yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJyZW5kZXJlciIsInJhZGl1cyIsIm5vZGVQYWRkaW5nIiwibGF5ZXJQYWRkaW5nIiwiZ3JvdXBQYWRkaW5nIiwieFBhZGRpbmciLCJ5UGFkZGluZyIsInBsb3RBY3RpdmF0aW9ucyIsIk1vZGVsVmlldyIsIm1vZGVsIiwiY3VzdG9tQ29uZmlnIiwiY29uZmlnIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdENvbmZpZyIsInByZWRpY3RDYWxsYmFjayIsInVwZGF0ZSIsImlucHV0IiwiaG9va0NhbGxiYWNrIiwicmVuZGVyIiwibGF5ZXIiLCJ0aGVuIiwiQ2FudmFzUmVuZGVyZXIiLCJyZXMiLCJvcHRpb25zIiwicGFyc2VMYXllciIsIm5leHRDb2x1bW4iLCJuYW1lIiwiaW5wdXRzIiwic2hhcGUiLCJzb3VyY2VMYXllciIsImdldFdlaWdodHMiLCJzZXRDYWxsSG9vayIsImFjdGl2YXRpb24iLCJjdXJyZW50TGF5ZXIiLCJwcmV2aW91c0NvbHVtbiIsIndlaWdodHMiLCJub29wIiwibWFwUG9zaXRpb24iLCJrZXlzIiwicGFyc2VkIiwibGF5ZXJNYXAiLCJsZW5ndGgiLCJsYXllckFyciIsInVuc2hpZnQiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJsYXllcklucHV0IiwiYWN0aXZhdGlvbnMiLCJpIiwiZGF0YVN5bmMiLCJwdXNoIiwicGFyc2VyQ29uZmlnIiwid2VpZ2h0IiwicmFua1R5cGUiLCJ3ZWlnaHROYW1lIiwiaGFzV2VpZ2h0cyIsInZhbHVlcyIsImZvckVhY2giLCJpbnAiLCJwcmVkaWN0IiwiYXJncyIsInJlc3VsdCIsImFwcGx5Iiwib3V0cHV0RGF0YSIsImxheWVycyIsIm91dHB1dCIsInByaW50U3RhdHMiLCJjb25zb2xlIiwibG9nIiwiQXJyYXkiLCJqb2luIiwicGFyc2VNb2RlbCIsIkFic3RyYWN0UmVuZGVyZXIiLCJpbml0RGF0YSIsIm1heEhlaWdodCIsImN4IiwibCIsIm91dHB1dExheWVyIiwibGF5ZXJDb25maWciLCJkb21haW5NYXgiLCJyZXNoYXBlIiwic2xpY2UiLCJyb3dzIiwiY29scyIsImdyb3VwcyIsInRvdGFsTm9kZXMiLCJuciIsIm5jIiwibmciLCJFcnJvciIsInN0ZXAiLCJ3aWR0aCIsIm5vZGVzIiwiaGVpZ2h0IiwiciIsImMiLCJnIiwieSIsIngiLCJNYXRoIiwibWF4IiwibGF5ZXJXaWR0aCIsImxheWVySGVpZ2h0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYm9keSIsImFwcGVuZENoaWxkIiwicmVuZGVyQ29udGV4dCIsImdldENvbnRleHQiLCJyZW5kZXJFbGVtZW50IiwiZmlsdGVyIiwiaW5kZXhPZiIsImluZGV4IiwidmFscyIsInN5IiwiZmxvb3IiLCJjbGVhclJlY3QiLCJub2RlIiwibngiLCJueSIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwiYmVnaW5QYXRoIiwiYXJjIiwiUEkiLCJzdHJva2UiLCJmaWxsIiwiZXJyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxD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TixDQUFxQk8sTUFBekMsRUFBaURPLEdBQWpELEVBQXNEO0FBQ2xELHlCQUFLOUIsTUFBTCxDQUFZQyxNQUFNZSxjQUFOLENBQXFCYyxDQUFyQixDQUFaLEVBQXFDN0IsTUFBTTRCLFdBQU4sQ0FBa0JDLENBQWxCLENBQXJDO0FBQ0g7QUFDSjtBQUNKOzs7O0VBekR1Q3dCLGtCOztrQkFBdkJuRCxjIiwiZmlsZSI6InRmanMtbW9kZWwtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidGZqcy1tb2RlbC12aWV3XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRmanMtbW9kZWwtdmlld1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ0ZmpzLW1vZGVsLXZpZXdcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgcmVuZGVyZXI6ICdjYW52YXMnLFxuXG4gICAgcmFkaXVzOiA2LFxuICAgIG5vZGVQYWRkaW5nOiAyLFxuICAgIGxheWVyUGFkZGluZzogMjAsXG4gICAgZ3JvdXBQYWRkaW5nOiAxLFxuICAgIFxuICAgIHhQYWRkaW5nOiAxMCxcbiAgICB5UGFkZGluZzogMTAsXG4gICBcbiAgICBwbG90QWN0aXZhdGlvbnM6IGZhbHNlXG59XG4iLCJpbXBvcnQgcGFyc2VNb2RlbCBmcm9tICcuL21vZGVsLXBhcnNlcic7XG5pbXBvcnQgQ2FudmFzUmVuZGVyZXIgZnJvbSAnLi9yZW5kZXJlcnMvY2FudmFzLnJlbmRlcmVyJztcbmltcG9ydCBkZWZhdWx0Q29uZmlnIGZyb20gJy4vZGVmYXVsdC5jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbFZpZXcge1xuXG4gICAgY29uc3RydWN0b3IobW9kZWwsIGN1c3RvbUNvbmZpZykge1xuICAgICAgICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q29uZmlnLCBjdXN0b21Db25maWcpO1xuXG4gICAgICAgIGxldCByZW5kZXJlcjtcblxuICAgICAgICBjb25maWcucHJlZGljdENhbGxiYWNrID0gaW5wdXQgPT4ge1xuICAgICAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIudXBkYXRlKG1vZGVsLCBpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuaG9va0NhbGxiYWNrID0gbGF5ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKGxheWVyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcGFyc2VNb2RlbChtb2RlbCwgY29uZmlnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICByZW5kZXJlciA9IG5ldyBDYW52YXNSZW5kZXJlcihjb25maWcsIHJlcyk7XG4gICAgICAgIH0pXG4gICAgfVxufSIsImZ1bmN0aW9uIG5vb3AoKSB7IH1cblxuYXN5bmMgZnVuY3Rpb24gcGFyc2VNb2RlbChtb2RlbCwgb3B0aW9ucykge1xuXG4gIGNvbnN0IHBhcnNlZCA9IHtcbiAgICBsYXllck1hcDoge30sXG4gICAgbGF5ZXJBcnI6IFtdXG4gIH07XG5cbiAgY29uc3QgcGFyc2VyQ29uZmlnID0ge1xuICAgIHByZWRpY3RDYWxsYmFjazogbm9vcCxcbiAgICBob29rQ2FsbGJhY2s6IG5vb3AsXG4gICAgLi4ub3B0aW9uc1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VMYXllcihsYXllciwgbmV4dENvbHVtbikge1xuXG4gICAgY29uc3Qge1xuICAgICAgbmFtZSxcbiAgICAgIGlucHV0LFxuICAgICAgaW5wdXRzLFxuICAgICAgc2hhcGUsXG4gICAgICBzb3VyY2VMYXllclxuICAgIH0gPSBsYXllcjtcblxuICAgIGNvbnN0IHtcbiAgICAgIGdldFdlaWdodHMsXG4gICAgICBzZXRDYWxsSG9vayxcbiAgICAgIGFjdGl2YXRpb25cbiAgICB9ID0gc291cmNlTGF5ZXIgfHwge307XG5cbiAgICBjb25zdCBjdXJyZW50TGF5ZXIgPSB7XG4gICAgICBwcmV2aW91c0NvbHVtbjogW10sXG4gICAgICBuYW1lLFxuICAgICAgc2hhcGUsXG4gICAgICB3ZWlnaHRzOiB7fSxcbiAgICAgIGdldFdlaWdodHM6IG5vb3AsXG4gICAgICBtYXBQb3NpdGlvbjogT2JqZWN0LmtleXMocGFyc2VkLmxheWVyTWFwKS5sZW5ndGhcbiAgICB9O1xuXG4gICAgcGFyc2VkLmxheWVyTWFwW25hbWVdID0gY3VycmVudExheWVyO1xuICAgIHBhcnNlZC5sYXllckFyci51bnNoaWZ0KGN1cnJlbnRMYXllcik7XG5cbiAgICBpZiAoYWN0aXZhdGlvbikge1xuICAgICAgbGV0IGNsYXNzTmFtZSA9IGFjdGl2YXRpb24uZ2V0Q2xhc3NOYW1lKCk7XG4gICAgICBjdXJyZW50TGF5ZXIuYWN0aXZhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogY2xhc3NOYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNldENhbGxIb29rKSB7XG4gICAgICBzb3VyY2VMYXllci5zZXRDYWxsSG9vayhhc3luYyBsYXllcklucHV0ID0+IHtcbiAgICAgICAgY3VycmVudExheWVyLmdldFdlaWdodHMoKTtcbiAgICAgICAgY3VycmVudExheWVyLmFjdGl2YXRpb25zID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcklucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY3VycmVudExheWVyLmFjdGl2YXRpb25zLnB1c2goYXdhaXQgbGF5ZXJJbnB1dFtpXS5kYXRhU3luYygpKVxuICAgICAgICB9XG4gICAgICAgIHBhcnNlckNvbmZpZy5ob29rQ2FsbGJhY2soY3VycmVudExheWVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChnZXRXZWlnaHRzKSB7XG5cbiAgICAgIGN1cnJlbnRMYXllci5nZXRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCB3ZWlnaHRzID0gYXdhaXQgc291cmNlTGF5ZXIuZ2V0V2VpZ2h0cygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHdlaWdodCA9IHdlaWdodHNbaV07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmFua1R5cGUsXG4gICAgICAgICAgICBuYW1lOiB3ZWlnaHROYW1lXG4gICAgICAgICAgfSA9IHdlaWdodDtcbiAgICAgICAgICBjdXJyZW50TGF5ZXIuaGFzV2VpZ2h0cyA9IHRydWU7XG4gICAgICAgICAgY3VycmVudExheWVyLndlaWdodHNbcmFua1R5cGVdID0ge1xuICAgICAgICAgICAgbmFtZTogd2VpZ2h0TmFtZSxcbiAgICAgICAgICAgIHZhbHVlczogYXdhaXQgd2VpZ2h0c1tpXS5kYXRhU3luYygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRMYXllci5nZXRXZWlnaHRzKCk7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0cykge1xuICAgICAgaW5wdXRzLmZvckVhY2goaW5wID0+IHtcbiAgICAgICAgcGFyc2VMYXllcihpbnAsIGN1cnJlbnRMYXllci5wcmV2aW91c0NvbHVtbik7XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZUxheWVyKGlucHV0LCBjdXJyZW50TGF5ZXIucHJldmlvdXNDb2x1bW4pO1xuICAgIH1cblxuICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICBuZXh0Q29sdW1uLnB1c2goY3VycmVudExheWVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudExheWVyO1xuICB9XG5cbiAgY29uc3QgcHJlZGljdCA9IG1vZGVsLnByZWRpY3Q7XG5cbiAgbW9kZWwucHJlZGljdCA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcHJlZGljdC5hcHBseShtb2RlbCwgYXJncyk7XG4gICAgbW9kZWwub3V0cHV0RGF0YSA9IHJlc3VsdC5kYXRhU3luYygpO1xuICAgIHBhcnNlckNvbmZpZy5wcmVkaWN0Q2FsbGJhY2soYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBwYXJzZWQubW9kZWwgPSBhd2FpdCBwYXJzZUxheWVyKG1vZGVsLmxheWVyc1ttb2RlbC5sYXllcnMubGVuZ3RoIC0gMV0ub3V0cHV0KTtcblxuICBpZiAob3B0aW9ucy5wcmludFN0YXRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbGF5ZXJBcnJcbiAgICB9ID0gcGFyc2VkO1xuICAgIGNvbnNvbGUubG9nKG5ldyBBcnJheSgxMCkuam9pbignLScpKTtcbiAgICBsYXllckFyci5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBMYXllcjogJHtsYXllci5uYW1lfWApO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VNb2RlbDtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFic3RyYWN0UmVuZGVyZXIge1xuXG4gICAgY29uc3RydWN0b3IoY29uZmlnLCBpbml0RGF0YSkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICB4UGFkZGluZyxcbiAgICAgICAgICAgIHlQYWRkaW5nLFxuICAgICAgICAgICAgbGF5ZXIgPSB7fSxcbiAgICAgICAgfSA9IGNvbmZpZztcbiAgICAgICAgY29uc3QgeyBsYXllckFyciB9ID0gaW5pdERhdGE7XG5cbiAgICAgICAgbGV0IG1heEhlaWdodCA9ICh5UGFkZGluZyB8fCAxKSAqIDI7XG4gICAgICAgIGxldCBjeCA9IHhQYWRkaW5nIHx8IDBcblxuICAgICAgICB0aGlzLmxheWVycyA9IHt9O1xuXG5cbiAgICAgICAgbGF5ZXJBcnIuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgc2hhcGUsIGFjdGl2YXRpb24gfSA9IGw7XG4gICAgICAgICAgICB0aGlzLm91dHB1dExheWVyID0gbDtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IGxheWVyW25hbWVdIHx8IHt9O1xuICAgICAgICAgICAgY29uc3QgbGF5ZXJDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcsIGN1c3RvbUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgICAgbm9kZVBhZGRpbmcsXG4gICAgICAgICAgICAgICAgbGF5ZXJQYWRkaW5nLFxuICAgICAgICAgICAgICAgIGdyb3VwUGFkZGluZyxcbiAgICAgICAgICAgICAgICBkb21haW5NYXggPSAxLFxuICAgICAgICAgICAgICAgIHJlc2hhcGUgfSA9IGxheWVyQ29uZmlnO1xuICAgICAgICAgICAgbGV0IFtyb3dzLCBjb2xzLCBncm91cHNdID0gT2JqZWN0LmFzc2lnbihbMSwgMSwgMV0sIHNoYXBlLnNsaWNlKDEpKTtcblxuICAgICAgICAgICAgY29uc3QgdG90YWxOb2RlcyA9IHJvd3MgKiBjb2xzICogZ3JvdXBzO1xuXG4gICAgICAgICAgICBpZiAocmVzaGFwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtuciwgbmMsIG5nXSA9IE9iamVjdC5hc3NpZ24oWzEsIDEsIDFdLCByZXNoYXBlKTtcbiAgICAgICAgICAgICAgICBpZiAobnIgKiBuYyAqIG5nICE9PSB0b3RhbE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc2hhcGUgZnJvbSBbJHtyb3dzfSwgJHtjb2xzfSwgJHtncm91cHN9XSB0byBbJHtucn0sICR7bmN9LCAke25nfV1gKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJvd3MgPSBucjtcbiAgICAgICAgICAgICAgICBjb2xzID0gbmM7XG4gICAgICAgICAgICAgICAgZ3JvdXBzID0gbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN4ICs9IGxheWVyUGFkZGluZztcbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSByYWRpdXMgKyBub2RlUGFkZGluZztcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gbGF5ZXJQYWRkaW5nICsgY29scyAqIHN0ZXBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gW107XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gMDtcblxuICAgICAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dzOyByKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNvbHM7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBnID0gMDsgZyA8IGdyb3VwczsgZysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZ3JvdXBQYWRkaW5nICsgcmFkaXVzICsgciAqIHN0ZXAgKyBnICogcm93cyAqIChzdGVwICsgZ3JvdXBQYWRkaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogY3ggKyBjICogc3RlcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodCA9IHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlaWdodCArPSBncm91cFBhZGRpbmcgKyByYWRpdXM7XG4gICAgICAgICAgICBtYXhIZWlnaHQgPSBNYXRoLm1heChtYXhIZWlnaHQsIGhlaWdodCk7XG5cbiAgICAgICAgICAgIHRoaXMubGF5ZXJzW25hbWVdID0ge1xuICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgeDogY3gsXG4gICAgICAgICAgICAgICAgbGF5ZXJXaWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgbGF5ZXJIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgZG9tYWluTWF4LFxuICAgICAgICAgICAgICAgIGxheWVyOiBsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN4ICs9IHdpZHRoO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN4ICs9IHhQYWRkaW5nIHx8IDA7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IHdpZHRoOiBjeCwgaGVpZ2h0OiBtYXhIZWlnaHQgfSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IEFic3RyYWN0UmVuZGVyZXIgZnJvbSAnLi9hYnN0cmFjdC5yZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc1JlbmRlcmVyIGV4dGVuZHMgQWJzdHJhY3RSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnLCBpbml0RGF0YSkge1xuICAgICAgICBzdXBlcihjb25maWcsIGluaXREYXRhKTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLndpZHRoKTtcbiAgICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgdGhpcy5yZW5kZXJFbGVtZW50ID0gY2FudmFzO1xuICAgIH1cblxuICAgIHVwZGF0ZShtb2RlbCwgaW5wdXQpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gT2JqZWN0LmtleXModGhpcy5sYXllcnMpLmZpbHRlcihuYW1lID0+IG5hbWUuaW5kZXhPZignX2lucHV0JykgIT09IC0xKTtcblxuICAgICAgICBpZiAoaW5wdXRzLmxlbmd0aCAhPT0gaW5wdXQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGlkZW50aWZpZWQgMiBpbnB1dCBsYXllcnM6ICR7aW5wdXRzLmpvaW4oJywnKX0gYW5kIGhhZCBvbmx5ICR7aW5wdXQubGVuZ3RofSBpbnB1dCB2YWx1ZXNgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoeyBuYW1lIH0sIGlucHV0W2luZGV4XS5kYXRhU3luYygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5vdXRwdXRMYXllciwgbW9kZWwub3V0cHV0RGF0YSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGxheWVyLCBhY3RpdmF0aW9ucywgb3V0cHV0RGF0YSkge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHByZXZpb3VzQ29sdW1uIH0gPSBsYXllcjtcbiAgICAgICAgaWYgKGFjdGl2YXRpb25zIHx8IG91dHB1dERhdGEpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHMgPSBhY3RpdmF0aW9ucyB8fCBvdXRwdXREYXRhXG4gICAgICAgICAgICBjb25zdCB7IGhlaWdodCB9ID0gdGhpcztcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IHgsIGxheWVyV2lkdGgsIHJhZGl1cywgbm9kZXMsIGxheWVySGVpZ2h0LCBkb21haW5NYXggfSA9IHRoaXMubGF5ZXJzW25hbWVdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN5ID0gTWF0aC5mbG9vcigoaGVpZ2h0IC0gbGF5ZXJIZWlnaHQpIC8gMik7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmNsZWFyUmVjdCh4IC0gcmFkaXVzIC8gMiAtIDIsIDAsIGxheWVyV2lkdGggKyAyLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB4OiBueCwgeTogbnkgfSA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5zdHJva2VTdHlsZSA9ICcjMDAwJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKDAsMCwwLCAke3ZhbHNbaW5kZXhdIC8gZG9tYWluTWF4fSlgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmFyYyhueCwgc3kgKyBueSwgcmFkaXVzIC8gMiwgMCwgMiAqIE1hdGguUEkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRpdXMgPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGRlYnVnZ2VyXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldmlvdXNDb2x1bW4gJiYgcHJldmlvdXNDb2x1bW4ubGVuZ3RoID4gMCAmJiBsYXllci5hY3RpdmF0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllci5wcmV2aW91c0NvbHVtbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKGxheWVyLnByZXZpb3VzQ29sdW1uW2ldLCBsYXllci5hY3RpdmF0aW9uc1tpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9