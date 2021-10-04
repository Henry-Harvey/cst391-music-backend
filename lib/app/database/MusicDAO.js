"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _Album = require("../models/Album");

var _Artist = require("../models/Artist");

var _Track = require("../models/Track");

var mysql = _interopRequireWildcard(require("mysql"));

var util = _interopRequireWildcard(require("util"));

var MusicDAO = /*#__PURE__*/function () {
  (0, _createClass2.default)(MusicDAO, [{
    key: "initDbConnection",
    value: function initDbConnection() {
      return mysql.createPool({
        host: this.host,
        port: this.port,
        user: this.username,
        password: this.password,
        database: this.schema,
        connectionLimit: 10
      });
    }
  }]);

  function MusicDAO(host, port, username, password) {
    (0, _classCallCheck2.default)(this, MusicDAO);
    (0, _defineProperty2.default)(this, "host", "");
    (0, _defineProperty2.default)(this, "port", 3306);
    (0, _defineProperty2.default)(this, "username", "");
    (0, _defineProperty2.default)(this, "password", "");
    (0, _defineProperty2.default)(this, "schema", "music");
    (0, _defineProperty2.default)(this, "pool", this.initDbConnection());
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.pool = this.initDbConnection();
  }

  (0, _createClass2.default)(MusicDAO, [{
    key: "createAlbum",
    value: function createAlbum(album, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(err, connection) {
          var result1, tracks, i, result2;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context.next = 6;
                  return connection.query("INSERT INTO ALBUM (TITLE, ARTIST, DESCRIPTION, YEAR) VALUES (?,?,?,?)", [album.Title], [album.Artist], [album.Description], [album.Year]);

                case 6:
                  result1 = _context.sent;
                  tracks = album.Tracks;
                  i = 0;

                case 9:
                  if (!(i < tracks.length)) {
                    _context.next = 16;
                    break;
                  }

                  _context.next = 12;
                  return connection.query("INSERT INTO TRACK (NUMBER, TITLE, LYRICS, ALBUM_ID) VALUES (?,?,?,?)", [tracks[i].Number], [tracks[i].Title], [tracks[i].Lyrics], [result1[0].ID]);

                case 12:
                  result2 = _context.sent;

                case 13:
                  ++i;
                  _context.next = 9;
                  break;

                case 16:
                  callback(true);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readAlbumById",
    value: function readAlbumById(albumId, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(err, connection) {
          var resultAlbum, tracks, resultTracks, j, album;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context2.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context2.next = 6;
                  return connection.query("SELECT * FROM ALBUM WHERE ID = ?", [albumId]);

                case 6:
                  resultAlbum = _context2.sent;
                  tracks = [];
                  _context2.next = 10;
                  return connection.query("SELECT * FROM TRACK WHERE ALBUM_ID = ?", [albumId]);

                case 10:
                  resultTracks = _context2.sent;

                  for (j = 0; j < resultTracks; ++j) {
                    tracks.push(new _Track.Track(resultTracks[j].ID, resultTracks[j].NUMBER, resultTracks[j].TITLE, resultTracks[j].LYRICS));
                  }

                  album = new _Album.Album(resultAlbum.ID, resultAlbum.TITLE, resultAlbum.ARTIST, resultAlbum.DESCRIPTION, resultAlbum.YEAR, tracks);
                  callback(album);

                case 14:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readAlbumsByArtist",
    value: function readAlbumsByArtist(artist, callback) {
      var albums = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(err, connection) {
          var resultAlbums, i, albumId, tracks, resultTracks, j;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context3.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context3.next = 6;
                  return connection.query("SELECT * FROM ALBUM WHERE ARTIST = ?", [artist]);

                case 6:
                  resultAlbums = _context3.sent;
                  i = 0;

                case 8:
                  if (!(i < resultAlbums)) {
                    _context3.next = 19;
                    break;
                  }

                  albumId = resultAlbums[i].ID;
                  tracks = [];
                  _context3.next = 13;
                  return connection.query("SELECT * FROM TRACK WHERE ALBUM_ID = ?", [albumId]);

                case 13:
                  resultTracks = _context3.sent;

                  for (j = 0; j < resultTracks; ++j) {
                    tracks.push(new _Track.Track(resultTracks[j].ID, resultTracks[j].NUMBER, resultTracks[j].TITLE, resultTracks[j].LYRICS));
                  }

                  albums.push(new _Album.Album(resultAlbums[i].ID, resultAlbums[i].TITLE, resultAlbums[i].ARTIST, resultAlbums[i].DESCRIPTION, resultAlbums[i].YEAR, tracks));

                case 16:
                  ++i;
                  _context3.next = 8;
                  break;

                case 19:
                  callback(albums);

                case 20:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readAlbumsByDescription",
    value: function readAlbumsByDescription(description, callback) {
      var albums = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(err, connection) {
          var resultAlbums, i, albumId, tracks, resultTracks, j;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context4.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context4.next = 6;
                  return connection.query("SELECT * FROM ALBUM WHERE DESCRIPTION = ?", [description]);

                case 6:
                  resultAlbums = _context4.sent;
                  i = 0;

                case 8:
                  if (!(i < resultAlbums)) {
                    _context4.next = 19;
                    break;
                  }

                  albumId = resultAlbums[i].ID;
                  tracks = [];
                  _context4.next = 13;
                  return connection.query("SELECT * FROM TRACK WHERE ALBUM_ID = ?", [albumId]);

                case 13:
                  resultTracks = _context4.sent;

                  for (j = 0; j < resultTracks; ++j) {
                    tracks.push(new _Track.Track(resultTracks[j].ID, resultTracks[j].NUMBER, resultTracks[j].TITLE, resultTracks[j].LYRICS));
                  }

                  albums.push(new _Album.Album(resultAlbums[i].ID, resultAlbums[i].TITLE, resultAlbums[i].ARTIST, resultAlbums[i].DESCRIPTION, resultAlbums[i].YEAR, tracks));

                case 16:
                  ++i;
                  _context4.next = 8;
                  break;

                case 19:
                  callback(albums);

                case 20:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "readAllArtists",
    value: function readAllArtists(callback) {
      var artists = []; // Get a pooled connection to the database, run the query to get all the distinct Aritsts, and return an array of the results

      this.pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query("SELECT DISTINCT ARTIST FROM ALBUM", function (err, rows, fields) {
          connection.release();
          if (err) throw err;

          for (var i = 0; i < rows.length; ++i) {
            artists.push(new _Artist.Artist(i, rows[i].ARTIST));
          }

          callback(artists);
        });
      });
    }
  }, {
    key: "readAllAlbums",
    value: function readAllAlbums(callback) {
      var albums = [];
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(err, connection) {
          var resultAlbums, i, albumId, tracks, resultTracks, j;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context5.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context5.next = 6;
                  return connection.query("SELECT * FROM ALBUM");

                case 6:
                  resultAlbums = _context5.sent;
                  i = 0;

                case 8:
                  if (!(i < resultAlbums)) {
                    _context5.next = 19;
                    break;
                  }

                  albumId = resultAlbums[i].ID;
                  tracks = [];
                  _context5.next = 13;
                  return connection.query("SELECT * FROM TRACK WHERE ALBUM_ID = ?", [albumId]);

                case 13:
                  resultTracks = _context5.sent;

                  for (j = 0; j < resultTracks; ++j) {
                    tracks.push(new _Track.Track(resultTracks[j].ID, resultTracks[j].NUMBER, resultTracks[j].TITLE, resultTracks[j].LYRICS));
                  }

                  albums.push(new _Album.Album(resultAlbums[i].ID, resultAlbums[i].TITLE, resultAlbums[i].ARTIST, resultAlbums[i].DESCRIPTION, resultAlbums[i].YEAR, tracks));

                case 16:
                  ++i;
                  _context5.next = 8;
                  break;

                case 19:
                  callback(albums);

                case 20:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "updateAlbum",
    value: function updateAlbum(album, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(err, connection) {
          var result1, tracks, i, result2;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context6.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context6.next = 6;
                  return connection.query("UPDATE ALBUM SET TITLE = ?, ARTIST = ?, DESCRIPTION = ?, YEAR = ? WHERE ID = ?", [album.Title], [album.Artist], [album.Description], [album.Year], [album.Id]);

                case 6:
                  result1 = _context6.sent;
                  tracks = album.Tracks;
                  i = 0;

                case 9:
                  if (!(i < tracks.length)) {
                    _context6.next = 16;
                    break;
                  }

                  _context6.next = 12;
                  return connection.query("UPDATE TRACK SET NUMBER = ?, TITLE = ?, LYRICS = ? WHERE ID = ?", [tracks[i].Number], [tracks[i].Title], [tracks[i].Lyrics], [tracks[i].Id]);

                case 12:
                  result2 = _context6.sent;

                case 13:
                  ++i;
                  _context6.next = 9;
                  break;

                case 16:
                  callback(true);

                case 17:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "deleteAlbum",
    value: function deleteAlbum(albumId, callback) {
      this.pool.getConnection( /*#__PURE__*/function () {
        var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(err, connection) {
          var result1, result2;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  connection.release();

                  if (!err) {
                    _context7.next = 3;
                    break;
                  }

                  throw err;

                case 3:
                  // Use promisify Util to make an async function and run query to get all Albums for specific Artist
                  connection.query = util.promisify(connection.query);
                  _context7.next = 6;
                  return connection.query("DELETE FROM TRACK WHERE ALBUM_ID = ?", [albumId]);

                case 6:
                  result1 = _context7.sent;
                  _context7.next = 9;
                  return connection.query("DELETE FROM ALBUM WHERE ID = ?", [albumId]);

                case 9:
                  result2 = _context7.sent;
                  callback(true);

                case 11:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13, _x14) {
          return _ref7.apply(this, arguments);
        };
      }());
    }
  }]);
  return MusicDAO;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2FwcC9kYXRhYmFzZS9NdXNpY0RBTy50cyJdLCJuYW1lcyI6WyJNdXNpY0RBTyIsIm15c3FsIiwiY3JlYXRlUG9vbCIsImhvc3QiLCJwb3J0IiwidXNlciIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJkYXRhYmFzZSIsInNjaGVtYSIsImNvbm5lY3Rpb25MaW1pdCIsImluaXREYkNvbm5lY3Rpb24iLCJwb29sIiwiYWxidW0iLCJjYWxsYmFjayIsImdldENvbm5lY3Rpb24iLCJlcnIiLCJjb25uZWN0aW9uIiwicmVsZWFzZSIsInF1ZXJ5IiwidXRpbCIsInByb21pc2lmeSIsIlRpdGxlIiwiQXJ0aXN0IiwiRGVzY3JpcHRpb24iLCJZZWFyIiwicmVzdWx0MSIsInRyYWNrcyIsIlRyYWNrcyIsImkiLCJsZW5ndGgiLCJOdW1iZXIiLCJMeXJpY3MiLCJJRCIsInJlc3VsdDIiLCJhbGJ1bUlkIiwicmVzdWx0QWxidW0iLCJyZXN1bHRUcmFja3MiLCJqIiwicHVzaCIsIlRyYWNrIiwiTlVNQkVSIiwiVElUTEUiLCJMWVJJQ1MiLCJBbGJ1bSIsIkFSVElTVCIsIkRFU0NSSVBUSU9OIiwiWUVBUiIsImFydGlzdCIsImFsYnVtcyIsInJlc3VsdEFsYnVtcyIsImRlc2NyaXB0aW9uIiwiYXJ0aXN0cyIsInJvd3MiLCJmaWVsZHMiLCJJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztJQUVNQSxROzs7dUNBUTRCO0FBQzlCLGFBQU9DLEtBQUssQ0FBQ0MsVUFBTixDQUFpQjtBQUN0QkMsUUFBQUEsSUFBSSxFQUFFLEtBQUtBLElBRFc7QUFFdEJDLFFBQUFBLElBQUksRUFBRSxLQUFLQSxJQUZXO0FBR3RCQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0MsUUFIVztBQUl0QkMsUUFBQUEsUUFBUSxFQUFFLEtBQUtBLFFBSk87QUFLdEJDLFFBQUFBLFFBQVEsRUFBRSxLQUFLQyxNQUxPO0FBTXRCQyxR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OztBQWZzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWlCRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFsYnVtIH0gZnJvbSBcIi4uL21vZGVscy9BbGJ1bVwiO1xyXG5pbXBvcnQgeyBBcnRpc3QgfSBmcm9tIFwiLi4vbW9kZWxzL0FydGlzdFwiO1xyXG5pbXBvcnQgeyBUcmFjayB9IGZyb20gXCIuLi9tb2RlbHMvVHJhY2tcIjtcclxuaW1wb3J0ICogYXMgbXlzcWwgZnJvbSBcIm15c3FsXCI7XHJcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSBcInV0aWxcIjtcclxuXHJcbmNsYXNzIE11c2ljREFPIHtcclxuICBwcml2YXRlIGhvc3Q6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBwb3J0OiBudW1iZXIgPSAzMzA2O1xyXG4gIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgcHJpdmF0ZSBwYXNzd29yZDogc3RyaW5nID0gXCJcIjtcclxuICBwcml2YXRlIHNjaGVtYTogc3RyaW5nID0gXCJtdXNpY1wiO1xyXG4gIHByaXZhdGUgcG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG5cclxuICBwcml2YXRlIGluaXREYkNvbm5lY3Rpb24oKTogYW55IHtcclxuICAgIHJldHVybiBteXNxbC5jcmVhdGVQb29sKHtcclxuICAgICAgaG9zdDogdGhpcy5ob3N0LFxyXG4gICAgICBwb3J0OiB0aGlzLnBvcnQsXHJcbiAgICAgIHVzZXI6IHRoaXMudXNlcm5hbWUsXHJcbiAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxyXG4gICAgICBkYXRhYmFzZTogdGhpcy5zY2hlbWEsXHJcbiAgICAgIGNvbm5lY3Rpb25MaW1pdDogMTAsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmhvc3QgPSBob3N0O1xyXG4gICAgdGhpcy5wb3J0ID0gcG9ydDtcclxuICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgIHRoaXMucG9vbCA9IHRoaXMuaW5pdERiQ29ubmVjdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZUFsYnVtKGFsYnVtOiBBbGJ1bSwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgIC8vIFVzZSBwcm9taXNpZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNwZWNpZmljIEFydGlzdFxyXG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0MSA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXHJcbiAgICAgICAgXCJJTlNFUlQgSU5UTyBBTEJVTSAoVElUTEUsIEFSVElTVCwgREVTQ1JJUFRJT04sIFlFQVIpIFZBTFVFUyAoPyw/LD8sPylcIixcclxuICAgICAgICBbYWxidW0uVGl0bGVdLFxyXG4gICAgICAgIFthbGJ1bS5BcnRpc3RdLFxyXG4gICAgICAgIFthbGJ1bS5EZXNjcmlwdGlvbl0sXHJcbiAgICAgICAgW2FsYnVtLlllYXJdXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBsZXQgdHJhY2tzOiBUcmFja1tdID0gYWxidW0uVHJhY2tzO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcclxuICAgICAgICAgIFwiSU5TRVJUIElOVE8gVFJBQ0sgKE5VTUJFUiwgVElUTEUsIExZUklDUywgQUxCVU1fSUQpIFZBTFVFUyAoPyw/LD8sPylcIixcclxuICAgICAgICAgIFt0cmFja3NbaV0uTnVtYmVyXSxcclxuICAgICAgICAgIFt0cmFja3NbaV0uVGl0bGVdLFxyXG4gICAgICAgICAgW3RyYWNrc1tpXS5MeXJpY3NdLFxyXG4gICAgICAgICAgW3Jlc3VsdDFbMF0uSURdXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWFkQWxidW1CeUlkKGFsYnVtSWQ6IG51bWJlciwgY2FsbGJhY2s6IGFueSkge1xyXG4gICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgIC8vIFVzZSBwcm9taXNpZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNwZWNpZmljIEFydGlzdFxyXG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0QWxidW0gPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgIFwiU0VMRUNUICogRlJPTSBBTEJVTSBXSEVSRSBJRCA9ID9cIixcclxuICAgICAgICBbYWxidW1JZF1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGxldCB0cmFja3M6IFRyYWNrW10gPSBbXTtcclxuICAgICAgbGV0IHJlc3VsdFRyYWNrcyA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXHJcbiAgICAgICAgXCJTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEID0gP1wiLFxyXG4gICAgICAgIFthbGJ1bUlkXVxyXG4gICAgICApO1xyXG5cclxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHRUcmFja3M7ICsraikge1xyXG4gICAgICAgIHRyYWNrcy5wdXNoKFxyXG4gICAgICAgICAgbmV3IFRyYWNrKFxyXG4gICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uSUQsXHJcbiAgICAgICAgICAgIHJlc3VsdFRyYWNrc1tqXS5OVU1CRVIsXHJcbiAgICAgICAgICAgIHJlc3VsdFRyYWNrc1tqXS5USVRMRSxcclxuICAgICAgICAgICAgcmVzdWx0VHJhY2tzW2pdLkxZUklDU1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBhbGJ1bTogQWxidW0gPSBuZXcgQWxidW0oXHJcbiAgICAgICAgcmVzdWx0QWxidW0uSUQsXHJcbiAgICAgICAgcmVzdWx0QWxidW0uVElUTEUsXHJcbiAgICAgICAgcmVzdWx0QWxidW0uQVJUSVNULFxyXG4gICAgICAgIHJlc3VsdEFsYnVtLkRFU0NSSVBUSU9OLFxyXG4gICAgICAgIHJlc3VsdEFsYnVtLllFQVIsXHJcbiAgICAgICAgdHJhY2tzXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjYWxsYmFjayhhbGJ1bSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWFkQWxidW1zQnlBcnRpc3QoYXJ0aXN0OiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIGxldCBhbGJ1bXM6IEFsYnVtW10gPSBbXTtcclxuXHJcbiAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgLy8gVXNlIHByb21pc2lmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEFsYnVtcyBmb3Igc3BlY2lmaWMgQXJ0aXN0XHJcbiAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuXHJcbiAgICAgIGxldCByZXN1bHRBbGJ1bXMgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgIFwiU0VMRUNUICogRlJPTSBBTEJVTSBXSEVSRSBBUlRJU1QgPSA/XCIsXHJcbiAgICAgICAgW2FydGlzdF1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzdWx0QWxidW1zOyArK2kpIHtcclxuICAgICAgICBsZXQgYWxidW1JZCA9IHJlc3VsdEFsYnVtc1tpXS5JRDtcclxuICAgICAgICBsZXQgdHJhY2tzOiBUcmFja1tdID0gW107XHJcbiAgICAgICAgbGV0IHJlc3VsdFRyYWNrcyA9IGF3YWl0IGNvbm5lY3Rpb24ucXVlcnkoXHJcbiAgICAgICAgICBcIlNFTEVDVCAqIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQgPSA/XCIsXHJcbiAgICAgICAgICBbYWxidW1JZF1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlc3VsdFRyYWNrczsgKytqKSB7XHJcbiAgICAgICAgICB0cmFja3MucHVzaChcclxuICAgICAgICAgICAgbmV3IFRyYWNrKFxyXG4gICAgICAgICAgICAgIHJlc3VsdFRyYWNrc1tqXS5JRCxcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uTlVNQkVSLFxyXG4gICAgICAgICAgICAgIHJlc3VsdFRyYWNrc1tqXS5USVRMRSxcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uTFlSSUNTXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbGJ1bXMucHVzaChcclxuICAgICAgICAgIG5ldyBBbGJ1bShcclxuICAgICAgICAgICAgcmVzdWx0QWxidW1zW2ldLklELFxyXG4gICAgICAgICAgICByZXN1bHRBbGJ1bXNbaV0uVElUTEUsXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5BUlRJU1QsXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5ERVNDUklQVElPTixcclxuICAgICAgICAgICAgcmVzdWx0QWxidW1zW2ldLllFQVIsXHJcbiAgICAgICAgICAgIHRyYWNrc1xyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgY2FsbGJhY2soYWxidW1zKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlYWRBbGJ1bXNCeURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uOiBzdHJpbmcsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIGxldCBhbGJ1bXM6IEFsYnVtW10gPSBbXTtcclxuXHJcbiAgICB0aGlzLnBvb2wuZ2V0Q29ubmVjdGlvbihhc3luYyBmdW5jdGlvbiAoZXJyOiBhbnksIGNvbm5lY3Rpb246IGFueSkge1xyXG4gICAgICBjb25uZWN0aW9uLnJlbGVhc2UoKTtcclxuICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgLy8gVXNlIHByb21pc2lmeSBVdGlsIHRvIG1ha2UgYW4gYXN5bmMgZnVuY3Rpb24gYW5kIHJ1biBxdWVyeSB0byBnZXQgYWxsIEFsYnVtcyBmb3Igc3BlY2lmaWMgQXJ0aXN0XHJcbiAgICAgIGNvbm5lY3Rpb24ucXVlcnkgPSB1dGlsLnByb21pc2lmeShjb25uZWN0aW9uLnF1ZXJ5KTtcclxuXHJcbiAgICAgIGxldCByZXN1bHRBbGJ1bXMgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgIFwiU0VMRUNUICogRlJPTSBBTEJVTSBXSEVSRSBERVNDUklQVElPTiA9ID9cIixcclxuICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdEFsYnVtczsgKytpKSB7XHJcbiAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHRBbGJ1bXNbaV0uSUQ7XHJcbiAgICAgICAgbGV0IHRyYWNrczogVHJhY2tbXSA9IFtdO1xyXG4gICAgICAgIGxldCByZXN1bHRUcmFja3MgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgICAgXCJTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEID0gP1wiLFxyXG4gICAgICAgICAgW2FsYnVtSWRdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHRUcmFja3M7ICsraikge1xyXG4gICAgICAgICAgdHJhY2tzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBUcmFjayhcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uSUQsXHJcbiAgICAgICAgICAgICAgcmVzdWx0VHJhY2tzW2pdLk5VTUJFUixcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uVElUTEUsXHJcbiAgICAgICAgICAgICAgcmVzdWx0VHJhY2tzW2pdLkxZUklDU1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWxidW1zLnB1c2goXHJcbiAgICAgICAgICBuZXcgQWxidW0oXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5JRCxcclxuICAgICAgICAgICAgcmVzdWx0QWxidW1zW2ldLlRJVExFLFxyXG4gICAgICAgICAgICByZXN1bHRBbGJ1bXNbaV0uQVJUSVNULFxyXG4gICAgICAgICAgICByZXN1bHRBbGJ1bXNbaV0uREVTQ1JJUFRJT04sXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5ZRUFSLFxyXG4gICAgICAgICAgICB0cmFja3NcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGNhbGxiYWNrKGFsYnVtcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWFkQWxsQXJ0aXN0cyhjYWxsYmFjazogYW55KSB7XHJcbiAgICBsZXQgYXJ0aXN0czogQXJ0aXN0W10gPSBbXTtcclxuXHJcbiAgICAvLyBHZXQgYSBwb29sZWQgY29ubmVjdGlvbiB0byB0aGUgZGF0YWJhc2UsIHJ1biB0aGUgcXVlcnkgdG8gZ2V0IGFsbCB0aGUgZGlzdGluY3QgQXJpdHN0cywgYW5kIHJldHVybiBhbiBhcnJheSBvZiB0aGUgcmVzdWx0c1xyXG4gICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgaWYgKGVycikgdGhyb3cgZXJyO1xyXG5cclxuICAgICAgY29ubmVjdGlvbi5xdWVyeShcclxuICAgICAgICBcIlNFTEVDVCBESVNUSU5DVCBBUlRJU1QgRlJPTSBBTEJVTVwiLFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnI6IGFueSwgcm93czogYW55LCBmaWVsZHM6IGFueSkge1xyXG4gICAgICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGFydGlzdHMucHVzaChuZXcgQXJ0aXN0KGksIHJvd3NbaV0uQVJUSVNUKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgY2FsbGJhY2soYXJ0aXN0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVhZEFsbEFsYnVtcyhjYWxsYmFjazogYW55KSB7XHJcbiAgICBsZXQgYWxidW1zOiBBbGJ1bVtdID0gW107XHJcblxyXG4gICAgdGhpcy5wb29sLmdldENvbm5lY3Rpb24oYXN5bmMgZnVuY3Rpb24gKGVycjogYW55LCBjb25uZWN0aW9uOiBhbnkpIHtcclxuICAgICAgY29ubmVjdGlvbi5yZWxlYXNlKCk7XHJcbiAgICAgIGlmIChlcnIpIHRocm93IGVycjtcclxuXHJcbiAgICAgIC8vIFVzZSBwcm9taXNpZnkgVXRpbCB0byBtYWtlIGFuIGFzeW5jIGZ1bmN0aW9uIGFuZCBydW4gcXVlcnkgdG8gZ2V0IGFsbCBBbGJ1bXMgZm9yIHNwZWNpZmljIEFydGlzdFxyXG4gICAgICBjb25uZWN0aW9uLnF1ZXJ5ID0gdXRpbC5wcm9taXNpZnkoY29ubmVjdGlvbi5xdWVyeSk7XHJcblxyXG4gICAgICBsZXQgcmVzdWx0QWxidW1zID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIlNFTEVDVCAqIEZST00gQUxCVU1cIik7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdEFsYnVtczsgKytpKSB7XHJcbiAgICAgICAgbGV0IGFsYnVtSWQgPSByZXN1bHRBbGJ1bXNbaV0uSUQ7XHJcbiAgICAgICAgbGV0IHRyYWNrczogVHJhY2tbXSA9IFtdO1xyXG4gICAgICAgIGxldCByZXN1bHRUcmFja3MgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgICAgXCJTRUxFQ1QgKiBGUk9NIFRSQUNLIFdIRVJFIEFMQlVNX0lEID0gP1wiLFxyXG4gICAgICAgICAgW2FsYnVtSWRdXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZXN1bHRUcmFja3M7ICsraikge1xyXG4gICAgICAgICAgdHJhY2tzLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBUcmFjayhcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uSUQsXHJcbiAgICAgICAgICAgICAgcmVzdWx0VHJhY2tzW2pdLk5VTUJFUixcclxuICAgICAgICAgICAgICByZXN1bHRUcmFja3Nbal0uVElUTEUsXHJcbiAgICAgICAgICAgICAgcmVzdWx0VHJhY2tzW2pdLkxZUklDU1xyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWxidW1zLnB1c2goXHJcbiAgICAgICAgICBuZXcgQWxidW0oXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5JRCxcclxuICAgICAgICAgICAgcmVzdWx0QWxidW1zW2ldLlRJVExFLFxyXG4gICAgICAgICAgICByZXN1bHRBbGJ1bXNbaV0uQVJUSVNULFxyXG4gICAgICAgICAgICByZXN1bHRBbGJ1bXNbaV0uREVTQ1JJUFRJT04sXHJcbiAgICAgICAgICAgIHJlc3VsdEFsYnVtc1tpXS5ZRUFSLFxyXG4gICAgICAgICAgICB0cmFja3NcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIGNhbGxiYWNrKGFsYnVtcyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVBbGJ1bShhbGJ1bTogQWxidW0sIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAvLyBVc2UgcHJvbWlzaWZ5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzcGVjaWZpYyBBcnRpc3RcclxuICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgIFwiVVBEQVRFIEFMQlVNIFNFVCBUSVRMRSA9ID8sIEFSVElTVCA9ID8sIERFU0NSSVBUSU9OID0gPywgWUVBUiA9ID8gV0hFUkUgSUQgPSA/XCIsXHJcbiAgICAgICAgW2FsYnVtLlRpdGxlXSxcclxuICAgICAgICBbYWxidW0uQXJ0aXN0XSxcclxuICAgICAgICBbYWxidW0uRGVzY3JpcHRpb25dLFxyXG4gICAgICAgIFthbGJ1bS5ZZWFyXSxcclxuICAgICAgICBbYWxidW0uSWRdXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBsZXQgdHJhY2tzOiBUcmFja1tdID0gYWxidW0uVHJhY2tzO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcclxuICAgICAgICAgIFwiVVBEQVRFIFRSQUNLIFNFVCBOVU1CRVIgPSA/LCBUSVRMRSA9ID8sIExZUklDUyA9ID8gV0hFUkUgSUQgPSA/XCIsXHJcbiAgICAgICAgICBbdHJhY2tzW2ldLk51bWJlcl0sXHJcbiAgICAgICAgICBbdHJhY2tzW2ldLlRpdGxlXSxcclxuICAgICAgICAgIFt0cmFja3NbaV0uTHlyaWNzXSxcclxuICAgICAgICAgIFt0cmFja3NbaV0uSWRdXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkZWxldGVBbGJ1bShhbGJ1bUlkOiBudW1iZXIsIGNhbGxiYWNrOiBhbnkpIHtcclxuICAgIHRoaXMucG9vbC5nZXRDb25uZWN0aW9uKGFzeW5jIGZ1bmN0aW9uIChlcnI6IGFueSwgY29ubmVjdGlvbjogYW55KSB7XHJcbiAgICAgIGNvbm5lY3Rpb24ucmVsZWFzZSgpO1xyXG4gICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XHJcblxyXG4gICAgICAvLyBVc2UgcHJvbWlzaWZ5IFV0aWwgdG8gbWFrZSBhbiBhc3luYyBmdW5jdGlvbiBhbmQgcnVuIHF1ZXJ5IHRvIGdldCBhbGwgQWxidW1zIGZvciBzcGVjaWZpYyBBcnRpc3RcclxuICAgICAgY29ubmVjdGlvbi5xdWVyeSA9IHV0aWwucHJvbWlzaWZ5KGNvbm5lY3Rpb24ucXVlcnkpO1xyXG5cclxuICAgICAgbGV0IHJlc3VsdDEgPSBhd2FpdCBjb25uZWN0aW9uLnF1ZXJ5KFxyXG4gICAgICAgIFwiREVMRVRFIEZST00gVFJBQ0sgV0hFUkUgQUxCVU1fSUQgPSA/XCIsXHJcbiAgICAgICAgW2FsYnVtSWRdXHJcbiAgICAgICk7XHJcbiAgICAgIGxldCByZXN1bHQyID0gYXdhaXQgY29ubmVjdGlvbi5xdWVyeShcIkRFTEVURSBGUk9NIEFMQlVNIFdIRVJFIElEID0gP1wiLCBbXHJcbiAgICAgICAgYWxidW1JZCxcclxuICAgICAgXSk7XHJcblxyXG4gICAgICBjYWxsYmFjayh0cnVlKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=