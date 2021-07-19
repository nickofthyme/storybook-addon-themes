"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _api = require("@storybook/api");

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _constants = require("../constants");

var _shared = require("../shared");

var _ColorIcon = require("./ColorIcon");

var _ThemeStory = require("./ThemeStory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var iframeId = 'storybook-preview-iframe';
var createThemeSelectorItem = (0, _memoizerific["default"])(1000)(function (id, title, color, hasSwatch, change, active) {
  return {
    id: id,
    title: title,
    onClick: function onClick() {
      change({
        selected: id,
        expanded: false
      });
    },
    value: id,
    right: hasSwatch ? /*#__PURE__*/_react["default"].createElement(_ColorIcon.ColorIcon, {
      background: color
    }) : undefined,
    active: active
  };
});
var getDisplayableState = (0, _memoizerific["default"])(10)(function (config, state, change) {
  var clearable = config.clearable,
      icon = config.icon,
      list = config.list,
      target = config.target,
      defaultTheme = config["default"];
  var selectedThemeName = (0, _shared.getSelectedThemeName)(list, defaultTheme, state.selected);
  var availableThemeSelectorItems = [];
  var selectedTheme;

  if (selectedThemeName !== 'none' && clearable) {
    availableThemeSelectorItems.push(createThemeSelectorItem('none', 'Clear theme', 'transparent', null, change, false));
  }

  if (list.length) {
    availableThemeSelectorItems = [].concat(_toConsumableArray(availableThemeSelectorItems), _toConsumableArray(list.map(function (_ref) {
      var color = _ref.color,
          name = _ref.name;
      return createThemeSelectorItem(name, name, color, true, change, name === selectedThemeName);
    })));
    selectedTheme = (0, _shared.getSelectedTheme)(list, selectedThemeName);
  }

  return {
    icon: icon,
    items: availableThemeSelectorItems,
    selectedTheme: selectedTheme,
    themes: list,
    target: target
  };
});

var ThemeSelector = function ThemeSelector(_ref2) {
  var _globals$PARAM_KEY;

  var api = _ref2.api;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      decorator = _useState2[0],
      setDecorator = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      expanded = _useState4[0],
      setExpanded = _useState4[1];

  var _useGlobals = (0, _api.useGlobals)(),
      _useGlobals2 = _slicedToArray(_useGlobals, 2),
      globals = _useGlobals2[0],
      updateGlobals = _useGlobals2[1];

  var themesConfig = (0, _api.useParameter)(_constants.PARAM_KEY, _shared.defaultOptions);
  var selected = (_globals$PARAM_KEY = globals[_constants.PARAM_KEY]) === null || _globals$PARAM_KEY === void 0 ? void 0 : _globals$PARAM_KEY.value;
  var setSelected = (0, _react.useCallback)(function (value) {
    updateGlobals(_defineProperty({}, _constants.PARAM_KEY, Object.assign({}, globals[_constants.PARAM_KEY], {
      value: value
    })));
  }, [themesConfig, globals, updateGlobals]);

  var clearSelection = function clearSelection() {
    return setSelected(null);
  };

  var setDecoratorTrue = function setDecoratorTrue() {
    return setDecorator(true);
  };

  var change = function change(args) {
    var _getConfigFromApi = (0, _shared.getConfigFromApi)(api),
        list = _getConfigFromApi.list,
        onChange = _getConfigFromApi.onChange;

    setExpanded(args.expanded);
    api.emit(_constants.CHANGE, args.selected);

    if (typeof onChange === 'function') {
      var _selectedTheme = (0, _shared.getSelectedTheme)(list, args.selected);

      onChange(_selectedTheme);
    }

    setSelected(args.selected);
  };

  var _getDisplayableState = getDisplayableState(themesConfig, {
    decorator: decorator,
    selected: selected,
    expanded: expanded
  }, change),
      items = _getDisplayableState.items,
      icon = _getDisplayableState.icon,
      selectedTheme = _getDisplayableState.selectedTheme,
      target = _getDisplayableState.target,
      themes = _getDisplayableState.themes;

  (0, _react.useEffect)(function () {
    api.on(_coreEvents.SET_STORIES, clearSelection);
    api.on(_constants.THEME, setSelected);
    api.on(_constants.DECORATOR, setDecoratorTrue);

    if (!selected) {
      var selectedName = (0, _shared.getSelectedThemeName)(themesConfig.list, themesConfig["default"]);
      setSelected(selectedName);
    }

    return function () {
      api.off(_coreEvents.SET_STORIES, clearSelection);
      api.off(_constants.THEME, setSelected);
      api.off(_constants.DECORATOR, setDecoratorTrue);
    };
  }, [clearSelection, setSelected, setDecoratorTrue]);
  return items.length ? /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, !decorator && /*#__PURE__*/_react["default"].createElement(_ThemeStory.ThemeStory, {
    iframeId: iframeId,
    selectedTheme: selectedTheme,
    target: target,
    themes: themes
  }), /*#__PURE__*/_react["default"].createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltipShown: expanded,
    onVisibilityChange: setExpanded,
    tooltip: /*#__PURE__*/_react["default"].createElement(_components.TooltipLinkList, {
      links: items
    }),
    closeOnClick: true
  }, /*#__PURE__*/_react["default"].createElement(_components.IconButton, {
    key: "theme",
    active: selectedTheme,
    title: "Change the theme of the preview"
  }, /*#__PURE__*/_react["default"].createElement(_components.Icons, {
    icon: icon
  })))) : null;
};

exports.ThemeSelector = ThemeSelector;