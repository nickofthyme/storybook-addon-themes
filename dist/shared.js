"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigFromApi = getConfigFromApi;
exports.getConfig = getConfig;
exports.getSelectedThemeName = getSelectedThemeName;
exports.getSelectedTheme = getSelectedTheme;
exports.defaultOptions = void 0;

var _constants = require("./constants");

var defaultOptions = {
  clearable: true,
  icon: 'mirror',
  list: []
};
exports.defaultOptions = defaultOptions;

function getConfigFromApi(api) {
  var data = api.getCurrentStoryData();
  return getConfig(data && data.parameters && data.parameters[_constants.PARAM_KEY]);
}

function getConfig(parameters) {
  var options = parameters instanceof Array ? {
    list: parameters
  } : parameters;
  return Object.assign({}, defaultOptions, options);
}

function getSelectedThemeName(list, defaultTheme, currentSelectedValue) {
  if (!list.length) {
    return 'none';
  }

  if (currentSelectedValue === 'none') {
    return currentSelectedValue;
  }

  if (currentSelectedValue && list.find(function (i) {
    return i.name === currentSelectedValue;
  })) {
    return currentSelectedValue;
  }

  if (defaultTheme) {
    return defaultTheme;
  }

  if (list.find(function (i) {
    return i["default"];
  })) {
    return list.find(function (i) {
      return i["default"];
    }).name;
  }

  return 'none';
}

function getSelectedTheme(list, themeName) {
  return list.find(function (_ref) {
    var name = _ref.name;
    return name === themeName;
  });
}