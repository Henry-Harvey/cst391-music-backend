"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Track = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Track = /*#__PURE__*/function () {
  function Track(id, number, title, lyrics) {
    (0, _classCallCheck2.default)(this, Track);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "number", -1);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "lyrics", "");
    this.id = id;
    this.number = number;
    this.title = title;
    this.lyrics = lyrics;
  }

  (0, _createClass2.default)(Track, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Number",
    get: function get() {
      return this.number;
    },
    set: function set(number) {
      this.number = number;
    }
  }, {
    key: "Title",
    get: function get() {
      return this.title;
    },
    set: function set(title) {
      this.title = title;
    }
  }, {
    key: "Lyrics",
    get: function get() {
      return this.lyrics;
    },
    set: function set(lyrics) {
      this.lyrics = lyrics;
    }
  }]);
  return Track;
}();

exports.Track = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvVHJhY2sudHMiXSwibmFtZXMiOlsiVHJhY2siLCJpZCIsIm51bWJlciIsInRpdGxlIiwibHlyaWNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFBYUEsSztBQU1YLGlCQUFZQyxFQUFaLEVBQXdCQyxNQUF4QixFQUF3Q0MsS0FBeEMsRUFBdURDLE1BQXZELEVBQXVFO0FBQUE7QUFBQSw4Q0FMbEQsQ0FBQyxDQUtpRDtBQUFBLGtEQUo5QyxDQUFDLENBSTZDO0FBQUEsaURBSC9DLEVBRytDO0FBQUEsa0RBRjlDLEVBRThDO0FBQ3JFLFNBQUtILEVBQUwsR0FBVUEsRUFBVjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7O3dCQUVnQjtBQUNmLGFBQU8sS0FBS0gsRUFBWjtBQUNELEs7c0JBQ01BLEUsRUFBWTtBQUNqQixXQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7O3dCQUNvQjtBQUNuQixhQUFPLEtBQUtDLE1BQVo7QUFDRCxLO3NCQUNVQSxNLEVBQWdCO0FBQ3pCLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7d0JBQ21CO0FBQ2xCLGFBQU8sS0FBS0MsS0FBWjtBQUNELEs7c0JBQ1NBLEssRUFBZTtBQUN2QixXQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDRDs7O3dCQUNvQjtBQUNuQixhQUFPLEtBQUtDLE1BQVo7QUFDRCxLO3NCQUNVQSxNLEVBQWdCO0FBQ3pCLFdBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFRyYWNrIHtcclxuICBwcml2YXRlIGlkOiBudW1iZXIgPSAtMTtcclxuICBwcml2YXRlIG51bWJlcjogbnVtYmVyID0gLTE7XHJcbiAgcHJpdmF0ZSB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIGx5cmljczogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgY29uc3RydWN0b3IoaWQ6IG51bWJlciwgbnVtYmVyOiBudW1iZXIsIHRpdGxlOiBzdHJpbmcsIGx5cmljczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMubHlyaWNzID0gbHlyaWNzO1xyXG4gIH1cclxuXHJcbiAgZ2V0IElkKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5pZDtcclxuICB9XHJcbiAgc2V0IElkKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICB9XHJcbiAgZ2V0IE51bWJlcigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubnVtYmVyO1xyXG4gIH1cclxuICBzZXQgTnVtYmVyKG51bWJlcjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm51bWJlciA9IG51bWJlcjtcclxuICB9XHJcbiAgZ2V0IFRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZTtcclxuICB9XHJcbiAgc2V0IFRpdGxlKHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICB9XHJcbiAgZ2V0IEx5cmljcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubHlyaWNzO1xyXG4gIH1cclxuICBzZXQgTHlyaWNzKGx5cmljczogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmx5cmljcyA9IGx5cmljcztcclxuICB9XHJcbn1cclxuIl19