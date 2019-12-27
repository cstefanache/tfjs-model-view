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

    renderLinks: false,
    plotActivations: false,
    nodeStroke: true,

    onRendererInitialized: function onRendererInitialized(renderer) {
        document.body.appendChild(renderer.canvas);
    }
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
    var onRendererInitialized = config.onRendererInitialized;

    var renderer = void 0;

    config.predictCallback = function (input) {
        if (renderer) {
            renderer.update(model, input);
            renderer.render();
        }
    };

    config.hookCallback = function (layer) {
        if (renderer) {
            renderer.updateValues(layer);
            renderer.render();
        }
    };

    (0, _modelParser2.default)(model, config).then(function (res) {
        renderer = new _canvas2.default(config, res);
        if (onRendererInitialized) {
            onRendererInitialized(renderer);
        }
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
                            for (i = 0; i < layerInput.length; i++) {
                              currentLayer.activations.push(layerInput[i].dataSync());
                            }
                            parserConfig.hookCallback(currentLayer);

                          case 4:
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colors = [[6, 57, 143], [0, 107, 92], [216, 139, 0], [180, 0, 85], [106, 2, 143], [216, 109, 0], [2, 105, 134], [0, 142, 103], [201, 0, 39], [139, 11, 215], [171, 141, 0]];

var AbstractRenderer = function () {
    function AbstractRenderer(config, initData) {
        var _this = this;

        _classCallCheck(this, AbstractRenderer);

        var xPadding = config.xPadding,
            yPadding = config.yPadding,
            xOffset = config.xOffset,
            _config$layer = config.layer,
            layer = _config$layer === undefined ? {} : _config$layer;
        var layerArr = initData.layerArr;


        var maxHeight = (yPadding || 1) * 2;
        var cx = (xPadding || 0) + (xOffset || 0);

        function processColumn(lyr) {
            var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            lyr.column = col;
            lyr.previousColumn.forEach(function (l) {
                processColumn(l, col + 1);
            });
        }

        processColumn(layerArr[layerArr.length - 1]);

        layerArr.forEach(function (l, lindex) {
            var name = l.name,
                shape = l.shape,
                previousColumn = l.previousColumn;

            _this.outputLayer = l;
            var customConfig = layer[name] || {};

            var layerConfig = Object.assign({}, config, customConfig);
            var radius = layerConfig.radius,
                nodePadding = layerConfig.nodePadding,
                layerPadding = layerConfig.layerPadding,
                groupPadding = layerConfig.groupPadding,
                _layerConfig$domain = layerConfig.domain,
                domain = _layerConfig$domain === undefined ? [0, 1] : _layerConfig$domain,
                renderLinks = layerConfig.renderLinks,
                renderNode = layerConfig.renderNode,
                nodeStroke = layerConfig.nodeStroke,
                reshape = layerConfig.reshape;


            var color = layerConfig.color || (lindex < colors.length ? colors[lindex] : [0, 0, 0]);

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

            for (var row = 0; row < rows; row++) {
                for (var col = 0; col < cols; col++) {
                    for (var group = 0; group < groups; group++) {
                        var y = radius + row * step + group * rows * step + group * groupPadding;
                        nodes.push({
                            x: cx + col * step,
                            y: y,
                            radius: radius
                        });
                        height = y;
                    }
                }
            }

            height += groupPadding + radius;
            maxHeight = Math.max(maxHeight, height);

            Object.assign(l, {
                name: name,
                x: cx,
                layerWidth: width,
                layerHeight: height,
                radius: radius,
                nodes: nodes,
                domain: domain,
                renderLinks: renderLinks,
                renderNode: renderNode,
                nodeStroke: nodeStroke,
                color: color,
                previousLayers: previousColumn.map(function (lyr) {
                    return lyr.name;
                })
            });

            cx += width;
        });

        cx += xPadding || 0;

        layerArr.forEach(function (l) {
            var offsetY = Math.floor((maxHeight - l.layerHeight) / 2);
            l.nodes.forEach(function (nd) {
                return nd.y += offsetY;
            });
        });

        Object.assign(this, { width: cx, height: maxHeight });

        this.layers = layerArr;
        this.layersMap = layerArr.reduce(function (memo, item) {
            memo[item.name] = item;
            return memo;
        }, {});
    }

    _createClass(AbstractRenderer, [{
        key: "update",
        value: function update(model, input) {
            var _this2 = this;

            if (input) {
                model.inputs.forEach(function (inputLayer, index) {
                    var syntheticLayer = _this2.layersMap[inputLayer.name];
                    _this2.updateLayerValues(syntheticLayer, input[index].dataSync());
                });
            }

            this.updateLayerValues(this.outputLayer, model.outputData);
        }
    }, {
        key: "updateLayerValues",
        value: function updateLayerValues(layer, data) {
            for (var i = 0; i < layer.nodes.length; i++) {
                layer.nodes[i].value = data[i];
            }
        }
    }, {
        key: "updateValues",
        value: function updateValues(layer) {
            var _this3 = this;

            var syntheticLayer = this.layersMap[layer.name];
            syntheticLayer.weights = layer.weights;
            syntheticLayer.previousColumn.forEach(function (col, idx) {
                _this3.updateLayerValues(col, layer.activations[idx]);
            });
        }
    }]);

    return AbstractRenderer;
}();

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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

        var onBeginRender = config.onBeginRender,
            onEndRender = config.onEndRender;


        Object.assign(_this, { canvas: canvas, onBeginRender: onBeginRender, onEndRender: onEndRender });

        canvas.setAttribute('width', _this.width);
        canvas.setAttribute('height', _this.height);

        _this.renderContext = canvas.getContext('2d');
        _this.renderElement = canvas;
        return _this;
    }

    _createClass(CanvasRenderer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            window.requestAnimationFrame(function () {
                var onBeginRender = _this2.onBeginRender,
                    onEndRender = _this2.onEndRender;

                _this2.renderContext.clearRect(0, 0, _this2.width, _this2.height);

                if (onBeginRender) {
                    onBeginRender(_this2);
                }

                _this2.layers.forEach(function (layer) {
                    var radius = layer.radius,
                        nodes = layer.nodes,
                        _layer$domain = _slicedToArray(layer.domain, 2),
                        min = _layer$domain[0],
                        max = _layer$domain[1],
                        previousColumn = layer.previousColumn,
                        renderLinks = layer.renderLinks,
                        renderNode = layer.renderNode,
                        weights = layer.weights,
                        _layer$color = _slicedToArray(layer.color, 3),
                        r = _layer$color[0],
                        g = _layer$color[1],
                        b = _layer$color[2],
                        nodeStroke = layer.nodeStroke;

                    var kernel = weights[2];

                    var leftSideNodes = void 0;

                    if (renderLinks) {
                        leftSideNodes = previousColumn.reduce(function (memo, prevLayer) {
                            return memo.concat(prevLayer.nodes);
                        }, []);
                    }

                    nodes.forEach(function (node, index) {
                        var nx = node.x,
                            ny = node.y,
                            value = node.value;


                        if (renderLinks) {
                            leftSideNodes.forEach(function (leftNode, leftIdx) {
                                _this2.renderContext.beginPath();
                                var hasWeight = kernel && kernel.values;
                                var weightVal = hasWeight ? kernel.values[index * leftIdx] : 0.5;
                                if (hasWeight) {
                                    _this2.renderContext.strokeStyle = weightVal > 0 ? 'rgb(0, 0, 255, ' + weightVal + ')' : 'rgb(255, 0, 0, ' + Math.abs(weightVal) + ')';
                                } else {
                                    _this2.renderContext.strokeStyle = 'rgba(0,0,0,.5)';
                                }
                                _this2.renderContext.moveTo(leftNode.x + leftNode.radius / 2, leftNode.y);
                                _this2.renderContext.lineTo(node.x - node.radius / 2, node.y);
                                _this2.renderContext.stroke();
                            });
                        }
                        _this2.renderContext.strokeStyle = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                        var domainValue = value / (max + min);
                        if (!isNaN(domainValue)) {
                            _this2.renderContext.fillStyle = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + domainValue + ')';
                        } else {
                            _this2.renderContext.fillStyle = '#FFF';
                        }
                        _this2.renderContext.beginPath();
                        _this2.renderContext.arc(nx, ny, radius / 2, 0, 2 * Math.PI);
                        if (radius > 3 && nodeStroke) {
                            _this2.renderContext.stroke();
                        }
                        _this2.renderContext.fill();

                        if (renderNode) {
                            renderNode(_this2.renderContext, node, index);
                        }
                    });
                });

                if (onEndRender) {
                    onEndRender(_this2);
                }
            });
        }
    }]);

    return CanvasRenderer;
}(_abstract2.default);

exports.default = CanvasRenderer;
module.exports = exports['default'];

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3RmanMtbW9kZWwtdmlldy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvLi9zcmMvZGVmYXVsdC5jb25maWcuanMiLCJ3ZWJwYWNrOi8vdGZqcy1tb2RlbC12aWV3Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RmanMtbW9kZWwtdmlldy8uL3NyYy9tb2RlbC1wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vdGZqcy1tb2RlbC12aWV3Ly4vc3JjL3JlbmRlcmVycy9hYnN0cmFjdC5yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90ZmpzLW1vZGVsLXZpZXcvLi9zcmMvcmVuZGVyZXJzL2NhbnZhcy5yZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJyZW5kZXJlciIsInJhZGl1cyIsIm5vZGVQYWRkaW5nIiwibGF5ZXJQYWRkaW5nIiwiZ3JvdXBQYWRkaW5nIiwieFBhZGRpbmciLCJ5UGFkZGluZyIsInJlbmRlckxpbmtzIiwicGxvdEFjdGl2YXRpb25zIiwibm9kZVN0cm9rZSIsIm9uUmVuZGVyZXJJbml0aWFsaXplZCIsImRvY3VtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiTW9kZWxWaWV3IiwibW9kZWwiLCJjdXN0b21Db25maWciLCJjb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0Q29uZmlnIiwicHJlZGljdENhbGxiYWNrIiwidXBkYXRlIiwiaW5wdXQiLCJyZW5kZXIiLCJob29rQ2FsbGJhY2siLCJ1cGRhdGVWYWx1ZXMiLCJsYXllciIsInRoZW4iLCJDYW52YXNSZW5kZXJlciIsInJlcyIsIm9wdGlvbnMiLCJwYXJzZUxheWVyIiwibmV4dENvbHVtbiIsIm5hbWUiLCJpbnB1dHMiLCJzaGFwZSIsInNvdXJjZUxheWVyIiwiZ2V0V2VpZ2h0cyIsInNldENhbGxIb29rIiwiYWN0aXZhdGlvbiIsImN1cnJlbnRMYXllciIsInByZXZpb3VzQ29sdW1uIiwid2VpZ2h0cyIsIm5vb3AiLCJtYXBQb3NpdGlvbiIsImtleXMiLCJwYXJzZWQiLCJsYXllck1hcCIsImxlbmd0aCIsImxheWVyQXJyIiwidW5zaGlmdCIsImNsYXNzTmFtZSIsImdldENsYXNzTmFtZSIsImxheWVySW5wdXQiLCJhY3RpdmF0aW9ucyIsImkiLCJwdXNoIiwiZGF0YVN5bmMiLCJwYXJzZXJDb25maWciLCJ3ZWlnaHQiLCJyYW5rVHlwZSIsIndlaWdodE5hbWUiLCJoYXNXZWlnaHRzIiwidmFsdWVzIiwiZm9yRWFjaCIsImlucCIsInByZWRpY3QiLCJhcmdzIiwicmVzdWx0IiwiYXBwbHkiLCJvdXRwdXREYXRhIiwibGF5ZXJzIiwib3V0cHV0IiwicHJpbnRTdGF0cyIsImNvbnNvbGUiLCJsb2ciLCJBcnJheSIsImpvaW4iLCJwYXJzZU1vZGVsIiwiY29sb3JzIiwiQWJzdHJhY3RSZW5kZXJlciIsImluaXREYXRhIiwieE9mZnNldCIsIm1heEhlaWdodCIsImN4IiwicHJvY2Vzc0NvbHVtbiIsImx5ciIsImNvbCIsImNvbHVtbiIsImwiLCJsaW5kZXgiLCJvdXRwdXRMYXllciIsImxheWVyQ29uZmlnIiwiZG9tYWluIiwicmVuZGVyTm9kZSIsInJlc2hhcGUiLCJjb2xvciIsInNsaWNlIiwicm93cyIsImNvbHMiLCJncm91cHMiLCJ0b3RhbE5vZGVzIiwibnIiLCJuYyIsIm5nIiwiRXJyb3IiLCJzdGVwIiwid2lkdGgiLCJub2RlcyIsImhlaWdodCIsInJvdyIsImdyb3VwIiwieSIsIngiLCJNYXRoIiwibWF4IiwibGF5ZXJXaWR0aCIsImxheWVySGVpZ2h0IiwicHJldmlvdXNMYXllcnMiLCJtYXAiLCJvZmZzZXRZIiwiZmxvb3IiLCJuZCIsImxheWVyc01hcCIsInJlZHVjZSIsIm1lbW8iLCJpdGVtIiwiaW5wdXRMYXllciIsImluZGV4Iiwic3ludGhldGljTGF5ZXIiLCJ1cGRhdGVMYXllclZhbHVlcyIsImRhdGEiLCJ2YWx1ZSIsImlkeCIsImNyZWF0ZUVsZW1lbnQiLCJvbkJlZ2luUmVuZGVyIiwib25FbmRSZW5kZXIiLCJzZXRBdHRyaWJ1dGUiLCJyZW5kZXJDb250ZXh0IiwiZ2V0Q29udGV4dCIsInJlbmRlckVsZW1lbnQiLCJ3aW5kb3ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJjbGVhclJlY3QiLCJtaW4iLCJyIiwiZyIsImIiLCJrZXJuZWwiLCJsZWZ0U2lkZU5vZGVzIiwicHJldkxheWVyIiwiY29uY2F0Iiwibm9kZSIsIm54IiwibnkiLCJsZWZ0Tm9kZSIsImxlZnRJZHgiLCJiZWdpblBhdGgiLCJoYXNXZWlnaHQiLCJ3ZWlnaHRWYWwiLCJzdHJva2VTdHlsZSIsImFicyIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImRvbWFpblZhbHVlIiwiaXNOYU4iLCJmaWxsU3R5bGUiLCJhcmMiLCJQSSIsImZpbGwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtR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LEdBQW5CLENBQXVCZixFQUF2QixFQUEyQkMsRUFBM0IsRUFBK0IzSixTQUFTLENBQXhDLEVBQTJDLENBQTNDLEVBQThDLElBQUltSCxLQUFLdUQsRUFBdkQ7QUFDQSw0QkFBSTFLLFNBQVMsQ0FBVCxJQUFjUSxVQUFsQixFQUE4QjtBQUMxQixtQ0FBS21JLGFBQUwsQ0FBbUIwQixNQUFuQjtBQUNIO0FBQ0QsK0JBQUsxQixhQUFMLENBQW1CZ0MsSUFBbkI7O0FBRUEsNEJBQUk1RSxVQUFKLEVBQWdCO0FBQ1pBLHVDQUFXLE9BQUs0QyxhQUFoQixFQUErQmMsSUFBL0IsRUFBcUN4QixLQUFyQztBQUNIO0FBQ0oscUJBckNEO0FBc0NILGlCQTFERDs7QUE0REEsb0JBQUlRLFdBQUosRUFBaUI7QUFDYkEsZ0NBQVksTUFBWjtBQUNIO0FBQ0osYUF2RUQ7QUF3RUg7Ozs7RUF6RnVDeEQsa0I7O2tCQUF2QnBELGMiLCJmaWxlIjoidGZqcy1tb2RlbC12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJ0ZmpzLW1vZGVsLXZpZXdcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widGZqcy1tb2RlbC12aWV3XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInRmanMtbW9kZWwtdmlld1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgICByZW5kZXJlcjogJ2NhbnZhcycsXG5cbiAgICByYWRpdXM6IDYsXG4gICAgbm9kZVBhZGRpbmc6IDIsXG4gICAgbGF5ZXJQYWRkaW5nOiAyMCxcbiAgICBncm91cFBhZGRpbmc6IDEsXG4gICAgXG4gICAgeFBhZGRpbmc6IDEwLFxuICAgIHlQYWRkaW5nOiAxMCxcbiAgIFxuICAgIHJlbmRlckxpbmtzOiBmYWxzZSxcbiAgICBwbG90QWN0aXZhdGlvbnM6IGZhbHNlLFxuICAgIG5vZGVTdHJva2U6IHRydWUsXG5cbiAgICBvblJlbmRlcmVySW5pdGlhbGl6ZWQ6IHJlbmRlcmVyID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci5jYW52YXMpO1xuICAgIH1cbn1cbiIsImltcG9ydCBwYXJzZU1vZGVsIGZyb20gJy4vbW9kZWwtcGFyc2VyJztcbmltcG9ydCBDYW52YXNSZW5kZXJlciBmcm9tICcuL3JlbmRlcmVycy9jYW52YXMucmVuZGVyZXInO1xuaW1wb3J0IGRlZmF1bHRDb25maWcgZnJvbSAnLi9kZWZhdWx0LmNvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVsVmlldyB7XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlbCwgY3VzdG9tQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDb25maWcsIGN1c3RvbUNvbmZpZyk7XG4gICAgICAgIGNvbnN0IHsgb25SZW5kZXJlckluaXRpYWxpemVkIH0gPSBjb25maWc7XG4gICAgICAgIGxldCByZW5kZXJlcjtcblxuICAgICAgICBjb25maWcucHJlZGljdENhbGxiYWNrID0gaW5wdXQgPT4ge1xuICAgICAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIudXBkYXRlKG1vZGVsLCBpbnB1dCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuaG9va0NhbGxiYWNrID0gbGF5ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZXIudXBkYXRlVmFsdWVzKGxheWVyKTtcbiAgICAgICAgICAgICAgICByZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnNlTW9kZWwobW9kZWwsIGNvbmZpZykudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmVuZGVyZXIgPSBuZXcgQ2FudmFzUmVuZGVyZXIoY29uZmlnLCByZXMpO1xuICAgICAgICAgICAgaWYgKG9uUmVuZGVyZXJJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIG9uUmVuZGVyZXJJbml0aWFsaXplZChyZW5kZXJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImZ1bmN0aW9uIG5vb3AoKSB7IH1cblxuYXN5bmMgZnVuY3Rpb24gcGFyc2VNb2RlbChtb2RlbCwgb3B0aW9ucykge1xuXG4gIGNvbnN0IHBhcnNlZCA9IHtcbiAgICBsYXllck1hcDoge30sXG4gICAgbGF5ZXJBcnI6IFtdXG4gIH07XG5cbiAgY29uc3QgcGFyc2VyQ29uZmlnID0ge1xuICAgIHByZWRpY3RDYWxsYmFjazogbm9vcCxcbiAgICBob29rQ2FsbGJhY2s6IG5vb3AsXG4gICAgLi4ub3B0aW9uc1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VMYXllcihsYXllciwgbmV4dENvbHVtbikge1xuXG4gICAgY29uc3Qge1xuICAgICAgbmFtZSxcbiAgICAgIGlucHV0LFxuICAgICAgaW5wdXRzLFxuICAgICAgc2hhcGUsXG4gICAgICBzb3VyY2VMYXllclxuICAgIH0gPSBsYXllcjtcblxuICAgIGNvbnN0IHtcbiAgICAgIGdldFdlaWdodHMsXG4gICAgICBzZXRDYWxsSG9vayxcbiAgICAgIGFjdGl2YXRpb25cbiAgICB9ID0gc291cmNlTGF5ZXIgfHwge307XG5cbiAgICBjb25zdCBjdXJyZW50TGF5ZXIgPSB7XG4gICAgICBwcmV2aW91c0NvbHVtbjogW10sXG4gICAgICBuYW1lLFxuICAgICAgc2hhcGUsXG4gICAgICB3ZWlnaHRzOiB7fSxcbiAgICAgIGdldFdlaWdodHM6IG5vb3AsXG4gICAgICBtYXBQb3NpdGlvbjogT2JqZWN0LmtleXMocGFyc2VkLmxheWVyTWFwKS5sZW5ndGhcbiAgICB9O1xuXG4gICAgcGFyc2VkLmxheWVyTWFwW25hbWVdID0gY3VycmVudExheWVyO1xuICAgIHBhcnNlZC5sYXllckFyci51bnNoaWZ0KGN1cnJlbnRMYXllcik7XG5cbiAgICBpZiAoYWN0aXZhdGlvbikge1xuICAgICAgbGV0IGNsYXNzTmFtZSA9IGFjdGl2YXRpb24uZ2V0Q2xhc3NOYW1lKCk7XG4gICAgICBjdXJyZW50TGF5ZXIuYWN0aXZhdGlvbiA9IHtcbiAgICAgICAgbmFtZTogY2xhc3NOYW1lXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNldENhbGxIb29rKSB7XG4gICAgICBzb3VyY2VMYXllci5zZXRDYWxsSG9vayhhc3luYyBsYXllcklucHV0ID0+IHtcbiAgICAgICAgY3VycmVudExheWVyLmdldFdlaWdodHMoKTtcbiAgICAgICAgY3VycmVudExheWVyLmFjdGl2YXRpb25zID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcklucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY3VycmVudExheWVyLmFjdGl2YXRpb25zLnB1c2gobGF5ZXJJbnB1dFtpXS5kYXRhU3luYygpKVxuICAgICAgICB9XG4gICAgICAgIHBhcnNlckNvbmZpZy5ob29rQ2FsbGJhY2soY3VycmVudExheWVyKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChnZXRXZWlnaHRzKSB7XG5cbiAgICAgIGN1cnJlbnRMYXllci5nZXRXZWlnaHRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCB3ZWlnaHRzID0gYXdhaXQgc291cmNlTGF5ZXIuZ2V0V2VpZ2h0cygpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2VpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHdlaWdodCA9IHdlaWdodHNbaV07XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgcmFua1R5cGUsXG4gICAgICAgICAgICBuYW1lOiB3ZWlnaHROYW1lXG4gICAgICAgICAgfSA9IHdlaWdodDtcbiAgICAgICAgICBjdXJyZW50TGF5ZXIuaGFzV2VpZ2h0cyA9IHRydWU7XG4gICAgICAgICAgY3VycmVudExheWVyLndlaWdodHNbcmFua1R5cGVdID0ge1xuICAgICAgICAgICAgbmFtZTogd2VpZ2h0TmFtZSxcbiAgICAgICAgICAgIHZhbHVlczogYXdhaXQgd2VpZ2h0c1tpXS5kYXRhU3luYygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRMYXllci5nZXRXZWlnaHRzKCk7XG4gICAgfVxuXG4gICAgaWYgKGlucHV0cykge1xuICAgICAgaW5wdXRzLmZvckVhY2goaW5wID0+IHtcbiAgICAgICAgcGFyc2VMYXllcihpbnAsIGN1cnJlbnRMYXllci5wcmV2aW91c0NvbHVtbik7XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZUxheWVyKGlucHV0LCBjdXJyZW50TGF5ZXIucHJldmlvdXNDb2x1bW4pO1xuICAgIH1cblxuICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICBuZXh0Q29sdW1uLnB1c2goY3VycmVudExheWVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudExheWVyO1xuICB9XG5cbiAgY29uc3QgcHJlZGljdCA9IG1vZGVsLnByZWRpY3Q7XG5cbiAgbW9kZWwucHJlZGljdCA9ICguLi5hcmdzKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcHJlZGljdC5hcHBseShtb2RlbCwgYXJncyk7XG4gICAgbW9kZWwub3V0cHV0RGF0YSA9IHJlc3VsdC5kYXRhU3luYygpO1xuICAgIHBhcnNlckNvbmZpZy5wcmVkaWN0Q2FsbGJhY2soYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBwYXJzZWQubW9kZWwgPSBhd2FpdCBwYXJzZUxheWVyKG1vZGVsLmxheWVyc1ttb2RlbC5sYXllcnMubGVuZ3RoIC0gMV0ub3V0cHV0KTtcblxuICBpZiAob3B0aW9ucy5wcmludFN0YXRzKSB7XG4gICAgY29uc3Qge1xuICAgICAgbGF5ZXJBcnJcbiAgICB9ID0gcGFyc2VkO1xuICAgIGNvbnNvbGUubG9nKG5ldyBBcnJheSgxMCkuam9pbignLScpKTtcbiAgICBsYXllckFyci5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBMYXllcjogJHtsYXllci5uYW1lfWApO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcGFyc2VNb2RlbDtcbiIsImNvbnN0IGNvbG9ycyA9IFtcbiAgICBbNiwgNTcsIDE0M10sXG4gICAgWzAsIDEwNywgOTJdLFxuICAgIFsyMTYsIDEzOSwgMF0sXG4gICAgWzE4MCwgMCwgODVdLFxuICAgIFsxMDYsIDIsIDE0M10sXG4gICAgWzIxNiwgMTA5LCAwXSxcbiAgICBbMiwgMTA1LCAxMzRdLFxuICAgIFswLCAxNDIsIDEwM10sXG4gICAgWzIwMSwgMCwgMzldLFxuICAgIFsxMzksIDExLCAyMTVdLFxuICAgIFsxNzEsIDE0MSwgMF1cbl1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWJzdHJhY3RSZW5kZXJlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcsIGluaXREYXRhKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIHhQYWRkaW5nLFxuICAgICAgICAgICAgeVBhZGRpbmcsXG4gICAgICAgICAgICB4T2Zmc2V0LFxuICAgICAgICAgICAgbGF5ZXIgPSB7fVxuICAgICAgICB9ID0gY29uZmlnO1xuICAgICAgICBjb25zdCB7IGxheWVyQXJyIH0gPSBpbml0RGF0YTtcblxuICAgICAgICBsZXQgbWF4SGVpZ2h0ID0gKHlQYWRkaW5nIHx8IDEpICogMjtcbiAgICAgICAgbGV0IGN4ID0gKHhQYWRkaW5nIHx8IDApICsgKHhPZmZzZXQgfHwgMClcblxuICAgICAgICBmdW5jdGlvbiBwcm9jZXNzQ29sdW1uKGx5ciwgY29sID0gMCkge1xuICAgICAgICAgICAgbHlyLmNvbHVtbiA9IGNvbDtcbiAgICAgICAgICAgIGx5ci5wcmV2aW91c0NvbHVtbi5mb3JFYWNoKGwgPT4ge1xuICAgICAgICAgICAgICAgIHByb2Nlc3NDb2x1bW4obCwgY29sICsgMSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2Nlc3NDb2x1bW4obGF5ZXJBcnJbbGF5ZXJBcnIubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgIGxheWVyQXJyLmZvckVhY2goKGwsIGxpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBzaGFwZSwgcHJldmlvdXNDb2x1bW4gfSA9IGw7XG4gICAgICAgICAgICB0aGlzLm91dHB1dExheWVyID0gbDtcbiAgICAgICAgICAgIGNvbnN0IGN1c3RvbUNvbmZpZyA9IGxheWVyW25hbWVdIHx8IHt9O1xuXG4gICAgICAgICAgICBjb25zdCBsYXllckNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZywgY3VzdG9tQ29uZmlnKVxuICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBub2RlUGFkZGluZyxcbiAgICAgICAgICAgICAgICBsYXllclBhZGRpbmcsXG4gICAgICAgICAgICAgICAgZ3JvdXBQYWRkaW5nLFxuICAgICAgICAgICAgICAgIGRvbWFpbiA9IFswLCAxXSxcbiAgICAgICAgICAgICAgICByZW5kZXJMaW5rcyxcbiAgICAgICAgICAgICAgICByZW5kZXJOb2RlLFxuICAgICAgICAgICAgICAgIG5vZGVTdHJva2UsXG4gICAgICAgICAgICAgICAgcmVzaGFwZSB9ID0gbGF5ZXJDb25maWc7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gbGF5ZXJDb25maWcuY29sb3IgfHwgKGxpbmRleCA8IGNvbG9ycy5sZW5ndGggPyBjb2xvcnNbbGluZGV4XSA6IFswLCAwLCAwXSk7XG4gICAgICAgICAgICBsZXQgW3Jvd3MsIGNvbHMsIGdyb3Vwc10gPSBPYmplY3QuYXNzaWduKFsxLCAxLCAxXSwgc2hhcGUuc2xpY2UoMSkpO1xuICAgICAgICAgICAgY29uc3QgdG90YWxOb2RlcyA9IHJvd3MgKiBjb2xzICogZ3JvdXBzO1xuXG4gICAgICAgICAgICBpZiAocmVzaGFwZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IFtuciwgbmMsIG5nXSA9IE9iamVjdC5hc3NpZ24oWzEsIDEsIDFdLCByZXNoYXBlKTtcbiAgICAgICAgICAgICAgICBpZiAobnIgKiBuYyAqIG5nICE9PSB0b3RhbE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIHJlc2hhcGUgZnJvbSBbJHtyb3dzfSwgJHtjb2xzfSwgJHtncm91cHN9XSB0byBbJHtucn0sICR7bmN9LCAke25nfV1gKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJvd3MgPSBucjtcbiAgICAgICAgICAgICAgICBjb2xzID0gbmM7XG4gICAgICAgICAgICAgICAgZ3JvdXBzID0gbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN4ICs9IGxheWVyUGFkZGluZztcblxuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHJhZGl1cyArIG5vZGVQYWRkaW5nO1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBsYXllclBhZGRpbmcgKyBjb2xzICogc3RlcFxuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCBoZWlnaHQgPSAwO1xuXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCByb3dzOyByb3crKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGdyb3VwID0gMDsgZ3JvdXAgPCBncm91cHM7IGdyb3VwKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSByYWRpdXMgKyByb3cgKiBzdGVwICsgZ3JvdXAgKiByb3dzICogc3RlcCArIGdyb3VwICogZ3JvdXBQYWRkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiBjeCArIGNvbCAqIHN0ZXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYWRpdXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0geTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVpZ2h0ICs9IGdyb3VwUGFkZGluZyArIHJhZGl1cztcbiAgICAgICAgICAgIG1heEhlaWdodCA9IE1hdGgubWF4KG1heEhlaWdodCwgaGVpZ2h0KTtcblxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihsLCB7XG4gICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICB4OiBjeCxcbiAgICAgICAgICAgICAgICBsYXllcldpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICBsYXllckhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgICBub2RlcyxcbiAgICAgICAgICAgICAgICBkb21haW4sXG4gICAgICAgICAgICAgICAgcmVuZGVyTGlua3MsXG4gICAgICAgICAgICAgICAgcmVuZGVyTm9kZSxcbiAgICAgICAgICAgICAgICBub2RlU3Ryb2tlLFxuICAgICAgICAgICAgICAgIGNvbG9yLFxuICAgICAgICAgICAgICAgIHByZXZpb3VzTGF5ZXJzOiBwcmV2aW91c0NvbHVtbi5tYXAobHlyID0+IGx5ci5uYW1lKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY3ggKz0gd2lkdGg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN4ICs9IHhQYWRkaW5nIHx8IDA7XG5cbiAgICAgICAgbGF5ZXJBcnIuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldFkgPSBNYXRoLmZsb29yKChtYXhIZWlnaHQgLSBsLmxheWVySGVpZ2h0KSAvIDIpO1xuICAgICAgICAgICAgbC5ub2Rlcy5mb3JFYWNoKG5kID0+IG5kLnkgKz0gb2Zmc2V0WSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywgeyB3aWR0aDogY3gsIGhlaWdodDogbWF4SGVpZ2h0IH0pO1xuXG4gICAgICAgIHRoaXMubGF5ZXJzID0gbGF5ZXJBcnI7XG4gICAgICAgIHRoaXMubGF5ZXJzTWFwID0gbGF5ZXJBcnIucmVkdWNlKChtZW1vLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICBtZW1vW2l0ZW0ubmFtZV0gPSBpdGVtO1xuICAgICAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG5cbiAgICB1cGRhdGUobW9kZWwsIGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgbW9kZWwuaW5wdXRzLmZvckVhY2goKGlucHV0TGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ludGhldGljTGF5ZXIgPSB0aGlzLmxheWVyc01hcFtpbnB1dExheWVyLm5hbWVdO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTGF5ZXJWYWx1ZXMoc3ludGhldGljTGF5ZXIsIGlucHV0W2luZGV4XS5kYXRhU3luYygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVMYXllclZhbHVlcyh0aGlzLm91dHB1dExheWVyLCBtb2RlbC5vdXRwdXREYXRhKTtcbiAgICB9XG5cbiAgICB1cGRhdGVMYXllclZhbHVlcyhsYXllciwgZGF0YSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVyLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsYXllci5ub2Rlc1tpXS52YWx1ZSA9IGRhdGFbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVWYWx1ZXMobGF5ZXIpIHtcbiAgICAgICAgY29uc3Qgc3ludGhldGljTGF5ZXIgPSB0aGlzLmxheWVyc01hcFtsYXllci5uYW1lXTtcbiAgICAgICAgc3ludGhldGljTGF5ZXIud2VpZ2h0cyA9IGxheWVyLndlaWdodHM7XG4gICAgICAgIHN5bnRoZXRpY0xheWVyLnByZXZpb3VzQ29sdW1uLmZvckVhY2goKGNvbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUxheWVyVmFsdWVzKGNvbCwgbGF5ZXIuYWN0aXZhdGlvbnNbaWR4XSk7XG4gICAgICAgIH0pXG5cbiAgICB9XG59XG4iLCJpbXBvcnQgQWJzdHJhY3RSZW5kZXJlciBmcm9tICcuL2Fic3RyYWN0LnJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzUmVuZGVyZXIgZXh0ZW5kcyBBYnN0cmFjdFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcsIGluaXREYXRhKSB7XG4gICAgICAgIHN1cGVyKGNvbmZpZywgaW5pdERhdGEpO1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICBjb25zdCB7IG9uQmVnaW5SZW5kZXIsIG9uRW5kUmVuZGVyIH0gPSBjb25maWc7XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7IGNhbnZhcywgb25CZWdpblJlbmRlciwgb25FbmRSZW5kZXIgfSlcblxuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMud2lkdGgpO1xuICAgICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICB0aGlzLnJlbmRlckVsZW1lbnQgPSBjYW52YXM7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25CZWdpblJlbmRlciwgb25FbmRSZW5kZXIgfSA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICAgICAgaWYgKG9uQmVnaW5SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICBvbkJlZ2luUmVuZGVyKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGxheWVyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgICAgIGRvbWFpbjogW21pbiwgbWF4XSxcbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckxpbmtzLFxuICAgICAgICAgICAgICAgICAgICByZW5kZXJOb2RlLFxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHRzLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogW3IsIGcsIGJdLFxuICAgICAgICAgICAgICAgICAgICBub2RlU3Ryb2tlXG4gICAgICAgICAgICAgICAgfSA9IGxheWVyO1xuXG4gICAgICAgICAgICAgICAgbGV0IHsgMjoga2VybmVsIH0gPSB3ZWlnaHRzO1xuICAgICAgICAgICAgICAgIGxldCBsZWZ0U2lkZU5vZGVzO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlbmRlckxpbmtzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTaWRlTm9kZXMgPSBwcmV2aW91c0NvbHVtbi5yZWR1Y2UoKG1lbW8sIHByZXZMYXllcikgPT4gbWVtby5jb25jYXQocHJldkxheWVyLm5vZGVzKSwgW10pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB4OiBueCwgeTogbnksIHZhbHVlIH0gPSBub2RlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJMaW5rcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFNpZGVOb2Rlcy5mb3JFYWNoKChsZWZ0Tm9kZSwgbGVmdElkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzV2VpZ2h0ID0ga2VybmVsICYmIGtlcm5lbC52YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2VpZ2h0VmFsID0gaGFzV2VpZ2h0ID8ga2VybmVsLnZhbHVlc1tpbmRleCAqIGxlZnRJZHhdIDogMC41XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc1dlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQuc3Ryb2tlU3R5bGUgPSB3ZWlnaHRWYWwgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGByZ2IoMCwgMCwgMjU1LCAke3dlaWdodFZhbH0pYCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgcmdiKDI1NSwgMCwgMCwgJHtNYXRoLmFicyh3ZWlnaHRWYWwpfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsMCwwLC41KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5tb3ZlVG8obGVmdE5vZGUueCArIGxlZnROb2RlLnJhZGl1cyAvIDIsIGxlZnROb2RlLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5saW5lVG8obm9kZS54IC0gbm9kZS5yYWRpdXMgLyAyLCBub2RlLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LnN0cm9rZVN0eWxlID0gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbWFpblZhbHVlID0gdmFsdWUgLyAobWF4ICsgbWluKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKGRvbWFpblZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmZpbGxTdHlsZSA9IGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sICR7ZG9tYWluVmFsdWV9KWBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5maWxsU3R5bGUgPSAnI0ZGRic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQuYXJjKG54LCBueSwgcmFkaXVzIC8gMiwgMCwgMiAqIE1hdGguUEkpXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRpdXMgPiAzICYmIG5vZGVTdHJva2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQ29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlckNvbnRleHQuZmlsbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW5kZXJOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJOb2RlKHRoaXMucmVuZGVyQ29udGV4dCwgbm9kZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAob25FbmRSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICBvbkVuZFJlbmRlcih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==