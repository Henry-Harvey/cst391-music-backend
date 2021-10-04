"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Album = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var Album = /*#__PURE__*/function () {
  function Album(id, title, artist, description, year, tracks) {
    (0, _classCallCheck2.default)(this, Album);
    (0, _defineProperty2.default)(this, "id", -1);
    (0, _defineProperty2.default)(this, "title", "");
    (0, _defineProperty2.default)(this, "artist", "");
    (0, _defineProperty2.default)(this, "description", "");
    (0, _defineProperty2.default)(this, "year", -1);
    (0, _defineProperty2.default)(this, "tracks", void 0);
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.description = description;
    this.year = year;
    this.tracks = tracks;
  }

  (0, _createClass2.default)(Album, [{
    key: "Id",
    get: function get() {
      return this.id;
    },
    set: function set(id) {
      this.id = id;
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
    key: "Artist",
    get: function get() {
      return this.artist;
    },
    set: function set(artist) {
      this.artist = artist;
    }
  }, {
    key: "Description",
    get: function get() {
      return this.description;
    },
    set: function set(description) {
      this.description = description;
    }
  }, {
    key: "Year",
    get: function get() {
      return this.year;
    },
    set: function set(year) {
      this.year = year;
    }
  }, {
    key: "Tracks",
    get: function get() {
      return this.tracks;
    },
    set: function set(tracks) {
      this.tracks = tracks;
    }
  }]);
  return Album;
}();

exports.Album = Album;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9tb2RlbHMvQWxidW0udHMiXSwibmFtZXMiOlsiQWxidW0iLCJpZCIsInRpdGxlIiwiYXJ0aXN0IiwiZGVzY3JpcHRpb24iLCJ5ZWFyIiwidHJhY2tzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsSztBQVFYLGlCQUNFQyxFQURGLEVBRUVDLEtBRkYsRUFHRUMsTUFIRixFQUlFQyxXQUpGLEVBS0VDLElBTEYsRUFNRUMsTUFORixFQU9FO0FBQUE7QUFBQSw4Q0FkbUIsQ0FBQyxDQWNwQjtBQUFBLGlEQWJzQixFQWF0QjtBQUFBLGtEQVp1QixFQVl2QjtBQUFBLHVEQVg0QixFQVc1QjtBQUFBLGdEQVZxQixDQUFDLENBVXRCO0FBQUE7QUFDQSxTQUFLTCxFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBY0EsTUFBZDtBQUNEOzs7O3dCQUVnQjtBQUNmLGFBQU8sS0FBS0wsRUFBWjtBQUNELEs7c0JBQ01BLEUsRUFBWTtBQUNqQixXQUFLQSxFQUFMLEdBQVVBLEVBQVY7QUFDRDs7O3dCQUNtQjtBQUNsQixhQUFPLEtBQUtDLEtBQVo7QUFDRCxLO3NCQUNTQSxLLEVBQWU7QUFDdkIsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0Q7Ozt3QkFDb0I7QUFDbkIsYUFBTyxLQUFLQyxNQUFaO0FBQ0QsSztzQkFDVUEsTSxFQUFnQjtBQUN6QixXQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDRDs7O3dCQUN5QjtBQUN4QixhQUFPLEtBQUtDLFdBQVo7QUFDRCxLO3NCQUNlQSxXLEVBQXFCO0FBQ25DLFdBQUtBLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0Q7Ozt3QkFDa0I7QUFDakIsYUFBTyxLQUFLQyxJQUFaO0FBQ0QsSztzQkFDUUEsSSxFQUFjO0FBQ3JCLFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNEOzs7d0JBQ3FCO0FBQ3BCLGFBQU8sS0FBS0MsTUFBWjtBQUNELEs7c0JBQ1VBLE0sRUFBaUI7QUFDMUIsV0FBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUcmFjayB9IGZyb20gXCIuL1RyYWNrXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWxidW0ge1xyXG4gIHByaXZhdGUgaWQ6IG51bWJlciA9IC0xO1xyXG4gIHByaXZhdGUgdGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBhcnRpc3Q6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIHllYXI6IG51bWJlciA9IC0xO1xyXG4gIHByaXZhdGUgdHJhY2tzOiBUcmFja1tdO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGlkOiBudW1iZXIsXHJcbiAgICB0aXRsZTogc3RyaW5nLFxyXG4gICAgYXJ0aXN0OiBzdHJpbmcsXHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgeWVhcjogbnVtYmVyLFxyXG4gICAgdHJhY2tzOiBUcmFja1tdXHJcbiAgKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB0aGlzLmFydGlzdCA9IGFydGlzdDtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMueWVhciA9IHllYXI7XHJcbiAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICB9XHJcblxyXG4gIGdldCBJZCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuaWQ7XHJcbiAgfVxyXG4gIHNldCBJZChpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgfVxyXG4gIGdldCBUaXRsZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudGl0bGU7XHJcbiAgfVxyXG4gIHNldCBUaXRsZSh0aXRsZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgfVxyXG4gIGdldCBBcnRpc3QoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFydGlzdDtcclxuICB9XHJcbiAgc2V0IEFydGlzdChhcnRpc3Q6IHN0cmluZykge1xyXG4gICAgdGhpcy5hcnRpc3QgPSBhcnRpc3Q7XHJcbiAgfVxyXG4gIGdldCBEZXNjcmlwdGlvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb247XHJcbiAgfVxyXG4gIHNldCBEZXNjcmlwdGlvbihkZXNjcmlwdGlvbjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgfVxyXG4gIGdldCBZZWFyKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy55ZWFyO1xyXG4gIH1cclxuICBzZXQgWWVhcih5ZWFyOiBudW1iZXIpIHtcclxuICAgIHRoaXMueWVhciA9IHllYXI7XHJcbiAgfVxyXG4gIGdldCBUcmFja3MoKTogVHJhY2tbXSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFja3M7XHJcbiAgfVxyXG4gIHNldCBUcmFja3ModHJhY2tzOiBUcmFja1tdKSB7XHJcbiAgICB0aGlzLnRyYWNrcyA9IHRyYWNrcztcclxuICB9XHJcbn1cclxuIl19