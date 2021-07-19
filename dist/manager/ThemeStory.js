"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeStory = void 0;

var _react = require("react");

var _global = require("global");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ThemeStory = function ThemeStory(props) {
  var iframeId = props.iframeId,
      selectedTheme = props.selectedTheme,
      target = props.target,
      themes = props.themes;
  (0, _react.useEffect)(function () {
    var targetEl;

    var iframe = _global.document.getElementById(iframeId);

    if (!iframe) {
      return null;
    }

    var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    switch (target) {
      case 'root':
      case 'html':
        targetEl = iframeDocument.documentElement;
        break;

      default:
        if (!target || target === 'body') {
          targetEl = iframeDocument.body;
        } else {
          targetEl = iframeDocument.documentElement.querySelector(target);
        }

        break;
    } // Add selected theme class(es).


    if (selectedTheme && selectedTheme["class"]) {
      if (typeof selectedTheme["class"] === 'string') {
        targetEl.classList.add(selectedTheme["class"]);
      } else {
        var _targetEl$classList;

        // string[]
        (_targetEl$classList = targetEl.classList).add.apply(_targetEl$classList, _toConsumableArray(selectedTheme["class"]));
      }
    }

    return function () {
      return themes.filter(function (theme) {
        return theme["class"];
      }).forEach(function (theme) {
        if (typeof theme["class"] === 'string') {
          targetEl.classList.remove(theme["class"]);
        } else {
          var _targetEl$classList2;

          // string[]
          (_targetEl$classList2 = targetEl.classList).remove.apply(_targetEl$classList2, _toConsumableArray(theme["class"]));
        }
      });
    };
  });
  return null;
};

exports.ThemeStory = ThemeStory;