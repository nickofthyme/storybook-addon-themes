"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeDecorator = ThemeDecorator;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("../constants");

var _shared = require("../shared");

var _shared2 = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var channel = _addons["default"].getChannel();

var prevCallback;

function subscribe(callback) {
  if (prevCallback) {
    channel.removeListener(_constants.CHANGE, prevCallback);
  }

  if (callback) {
    channel.on(_constants.CHANGE, callback);
  }

  prevCallback = callback;
}

function getOrCreate(id) {
  var elementOnDom = document.getElementById(id);

  if (elementOnDom) {
    return elementOnDom;
  }

  var element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
}

function createCallback(list, callback) {
  return function (themeName) {
    var theme = (0, _shared.getSelectedTheme)(list, themeName);
    var themeClasses = (0, _shared2.getHtmlClasses)(theme);
    callback({
      theme: theme,
      themes: list,
      themeClasses: themeClasses,
      themeName: themeName
    });
  };
}

function ThemeDecorator(config, element) {
  var Decorator = config.Decorator,
      list = config.list,
      defaultTheme = config["default"];
  var lastValue = channel.last(_constants.CHANGE);
  var themeName = lastValue && lastValue[0] || (0, _shared.getSelectedThemeName)(list, defaultTheme);
  var theme = (0, _shared.getSelectedTheme)(list, themeName);
  var themeClasses = (0, _shared2.getHtmlClasses)(theme);
  var wrapper = getOrCreate(_constants.ADDON_ID);

  if (element instanceof Node) {
    wrapper.innerHTML = '';
    wrapper.appendChild(element);
  } else {
    wrapper.innerHTML = element;
  }

  if (Decorator) {
    // @ts-ignore
    var _Decorator = Decorator({
      children: wrapper,
      theme: theme,
      themes: list,
      themeClasses: themeClasses,
      themeName: themeName
    }),
        _Decorator2 = _slicedToArray(_Decorator, 2),
        decorator = _Decorator2[0],
        callback = _Decorator2[1];

    subscribe(createCallback(list, callback));
    return decorator;
  }

  wrapper.setAttribute('class', themeClasses);
  subscribe(createCallback(list, function (_ref) {
    var themeClasses = _ref.themeClasses;
    return wrapper.setAttribute('class', themeClasses);
  }));
  return wrapper;
}