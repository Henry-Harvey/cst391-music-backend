"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Artist = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Artist = /*#__PURE__*/function () {
  function Artist(id, name) {
    (0, _classCallCheck2.default)(this, Artist);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "name", "");
    this.id = id;
    this.name = name;
  }

  (0, _createClass2.default)(Artist, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
    }
  }, {
    key: "Name",
    get: function get() {
      return this.name;
    },
    set: function set(name) {
      this.name = name;
    }
  }]);
  return Artist;
}();

exports.Artist = Artist;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQXJ0aXN0LnRzIl0sIm5hbWVzIjpbIkFydGlzdCIsImlkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0lBQWFBLE07QUFJWCxrQkFBWUMsRUFBWixFQUF3QkMsSUFBeEIsRUFBc0M7QUFBQTtBQUFBLDhDQUhqQixDQUFDLENBR2dCO0FBQUEsZ0RBRmYsRUFFZTtBQUNwQyxTQUFLRCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDRDs7Ozt3QkFFZ0I7QUFDZixhQUFPLEtBQUtELEVBQVo7QUFDRCxLO3NCQUNNQSxFLEVBQVk7QUFDakIsV0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBQ0Q7Ozt3QkFDa0I7QUFDakIsYUFBTyxLQUFLQyxJQUFaO0FBQ0QsSztzQkFDUUEsSSxFQUFjO0FBQ3JCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFydGlzdCB7XHJcbiAgcHJpdmF0ZSBpZDogbnVtYmVyID0gLTE7XHJcbiAgcHJpdmF0ZSBuYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICBnZXQgSWQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmlkO1xyXG4gIH1cclxuICBzZXQgSWQoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5pZCA9IGlkO1xyXG4gIH1cclxuICBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICB9XHJcbiAgc2V0IE5hbWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxufVxyXG4iXX0=