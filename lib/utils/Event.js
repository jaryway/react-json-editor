"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);

    this.___handlers = {};
  }

  _createClass(Event, [{
    key: "subscribe",
    value: function subscribe(path, handler) {
      var key = path.join('.');

      if (!this.___handlers[key]) {
        this.___handlers[key] = [];
      }

      this.___handlers[key].push(handler);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(path, handler) {
      var key = path.join('.');

      if (this.___handlers[key]) {
        this.___handlers[key].filter(function (m) {
          return m !== handler;
        });
      }
    }
  }, {
    key: "publish",
    value: function publish(path) {
      for (var _len = arguments.length, parems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parems[_key - 1] = arguments[_key];
      }

      var handlers = this.___handlers[path.join('.')];

      (handlers || []).forEach(function (handler) {
        return handler.apply(void 0, parems);
      });
    }
  }, {
    key: "getHandlers",
    value: function getHandlers() {
      return this.___handlers;
    }
  }]);

  return Event;
}();

var _default = Event;
exports["default"] = _default;