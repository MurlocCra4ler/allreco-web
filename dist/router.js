(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var cookies_ts_1 = require("cookies-ts");

var routes = [['https://allreco.webflow.io/bst', 'https://allreco.webflow.io/en/bst']];
var cookies = new cookies_ts_1["default"]();
var lang = cookies.get('lang');

if (lang) {
  onLangchange(lang);
}

document.addEventListener('langchange', function () {
  var lang = cookies.get('lang');

  if (lang) {
    onLangchange(lang);
  }
});

function onLangchange(lang) {
  var url = window.location.href;

  switch (lang) {
    case 'de':
      for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var _a = routes_1[_i],
            urlDE = _a[0],
            urlEN = _a[1];

        if (urlEN === url) {
          window.location.replace(urlDE);
        }
      }

      break;

    case 'en':
      for (var _b = 0, routes_2 = routes; _b < routes_2.length; _b++) {
        var _c = routes_2[_b],
            urlDE = _c[0],
            urlEN = _c[1];

        if (urlDE === url) {
          window.location.replace(urlEN);
        }
      }

      break;

    case 'default':
      console.error('router.ts: onLangChange: unknown value for lang!');
      break;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHBvcnRzIiwiX19lc01vZHVsZSIsImNvb2tpZXNfdHNfMSIsInJlcXVpcmUiLCJyb3V0ZXMiLCJjb29raWVzIiwibGFuZyIsImdldCIsIm9uTGFuZ2NoYW5nZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIl9pIiwicm91dGVzXzEiLCJsZW5ndGgiLCJfYSIsInVybERFIiwidXJsRU4iLCJyZXBsYWNlIiwiX2IiLCJyb3V0ZXNfMiIsIl9jIiwiY29uc29sZSIsImVycm9yIl0sInNvdXJjZXMiOlsiZmFrZV9jZGQ5OGYyMi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY29va2llc190c18xID0gcmVxdWlyZShcImNvb2tpZXMtdHNcIik7XG52YXIgcm91dGVzID0gW1xuICAgIFsnaHR0cHM6Ly9hbGxyZWNvLndlYmZsb3cuaW8vYnN0JywgJ2h0dHBzOi8vYWxscmVjby53ZWJmbG93LmlvL2VuL2JzdCddLFxuXTtcbnZhciBjb29raWVzID0gbmV3IGNvb2tpZXNfdHNfMVtcImRlZmF1bHRcIl0oKTtcbnZhciBsYW5nID0gY29va2llcy5nZXQoJ2xhbmcnKTtcbmlmIChsYW5nKSB7XG4gICAgb25MYW5nY2hhbmdlKGxhbmcpO1xufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbGFuZ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFuZyA9IGNvb2tpZXMuZ2V0KCdsYW5nJyk7XG4gICAgaWYgKGxhbmcpIHtcbiAgICAgICAgb25MYW5nY2hhbmdlKGxhbmcpO1xuICAgIH1cbn0pO1xuZnVuY3Rpb24gb25MYW5nY2hhbmdlKGxhbmcpIHtcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgc3dpdGNoIChsYW5nKSB7XG4gICAgICAgIGNhc2UgJ2RlJzpcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgcm91dGVzXzEgPSByb3V0ZXM7IF9pIDwgcm91dGVzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hID0gcm91dGVzXzFbX2ldLCB1cmxERSA9IF9hWzBdLCB1cmxFTiA9IF9hWzFdO1xuICAgICAgICAgICAgICAgIGlmICh1cmxFTiA9PT0gdXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybERFKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCByb3V0ZXNfMiA9IHJvdXRlczsgX2IgPCByb3V0ZXNfMi5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX2MgPSByb3V0ZXNfMltfYl0sIHVybERFID0gX2NbMF0sIHVybEVOID0gX2NbMV07XG4gICAgICAgICAgICAgICAgaWYgKHVybERFID09PSB1cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsRU4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWZhdWx0JzpcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JvdXRlci50czogb25MYW5nQ2hhbmdlOiB1bmtub3duIHZhbHVlIGZvciBsYW5nIScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQUEsT0FBTyxDQUFDQyxVQUFSLEdBQXFCLElBQXJCOztBQUNBLElBQUlDLFlBQVksR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsSUFBSUMsTUFBTSxHQUFHLENBQ1QsQ0FBQyxnQ0FBRCxFQUFtQyxtQ0FBbkMsQ0FEUyxDQUFiO0FBR0EsSUFBSUMsT0FBTyxHQUFHLElBQUlILFlBQVksQ0FBQyxTQUFELENBQWhCLEVBQWQ7QUFDQSxJQUFJSSxJQUFJLEdBQUdELE9BQU8sQ0FBQ0UsR0FBUixDQUFZLE1BQVosQ0FBWDs7QUFDQSxJQUFJRCxJQUFKLEVBQVU7RUFDTkUsWUFBWSxDQUFDRixJQUFELENBQVo7QUFDSDs7QUFDREcsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixZQUExQixFQUF3QyxZQUFZO0VBQ2hELElBQUlKLElBQUksR0FBR0QsT0FBTyxDQUFDRSxHQUFSLENBQVksTUFBWixDQUFYOztFQUNBLElBQUlELElBQUosRUFBVTtJQUNORSxZQUFZLENBQUNGLElBQUQsQ0FBWjtFQUNIO0FBQ0osQ0FMRDs7QUFNQSxTQUFTRSxZQUFULENBQXNCRixJQUF0QixFQUE0QjtFQUN4QixJQUFJSyxHQUFHLEdBQUdDLE1BQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBMUI7O0VBQ0EsUUFBUVIsSUFBUjtJQUNJLEtBQUssSUFBTDtNQUNJLEtBQUssSUFBSVMsRUFBRSxHQUFHLENBQVQsRUFBWUMsUUFBUSxHQUFHWixNQUE1QixFQUFvQ1csRUFBRSxHQUFHQyxRQUFRLENBQUNDLE1BQWxELEVBQTBERixFQUFFLEVBQTVELEVBQWdFO1FBQzVELElBQUlHLEVBQUUsR0FBR0YsUUFBUSxDQUFDRCxFQUFELENBQWpCO1FBQUEsSUFBdUJJLEtBQUssR0FBR0QsRUFBRSxDQUFDLENBQUQsQ0FBakM7UUFBQSxJQUFzQ0UsS0FBSyxHQUFHRixFQUFFLENBQUMsQ0FBRCxDQUFoRDs7UUFDQSxJQUFJRSxLQUFLLEtBQUtULEdBQWQsRUFBbUI7VUFDZkMsTUFBTSxDQUFDQyxRQUFQLENBQWdCUSxPQUFoQixDQUF3QkYsS0FBeEI7UUFDSDtNQUNKOztNQUNEOztJQUNKLEtBQUssSUFBTDtNQUNJLEtBQUssSUFBSUcsRUFBRSxHQUFHLENBQVQsRUFBWUMsUUFBUSxHQUFHbkIsTUFBNUIsRUFBb0NrQixFQUFFLEdBQUdDLFFBQVEsQ0FBQ04sTUFBbEQsRUFBMERLLEVBQUUsRUFBNUQsRUFBZ0U7UUFDNUQsSUFBSUUsRUFBRSxHQUFHRCxRQUFRLENBQUNELEVBQUQsQ0FBakI7UUFBQSxJQUF1QkgsS0FBSyxHQUFHSyxFQUFFLENBQUMsQ0FBRCxDQUFqQztRQUFBLElBQXNDSixLQUFLLEdBQUdJLEVBQUUsQ0FBQyxDQUFELENBQWhEOztRQUNBLElBQUlMLEtBQUssS0FBS1IsR0FBZCxFQUFtQjtVQUNmQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JRLE9BQWhCLENBQXdCRCxLQUF4QjtRQUNIO01BQ0o7O01BQ0Q7O0lBQ0osS0FBSyxTQUFMO01BQ0lLLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGtEQUFkO01BQ0E7RUFuQlI7QUFxQkgifQ==
},{"cookies-ts":2}],2:[function(require,module,exports){
'use strict';

class main {
    constructor() {
        this.DEFAULT_CONFIG = {
            expires: "1d",
            path: "; path=/"
        };
    }
    config(option) {
        if (option.expires) {
            this.DEFAULT_CONFIG.expires = option.expires;
        }
        if (option.path === "") {
            this.DEFAULT_CONFIG.path = "";
        }
        else {
            this.DEFAULT_CONFIG.path = "; path=" + option.path;
        }
    }
    get(key) {
        let value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        if (value && value.startsWith("{") && value.endsWith("}")) {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                return value;
            }
        }
        return value;
    }
    set(key, value, option = {}) {
        if (!key) {
            throw new Error("cookie name is not find in first argument");
        }
        else if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\tcurrent key name: " + key);
        }
        // support json object
        if (value && value.constructor === Object) {
            value = JSON.stringify(value);
        }
        let _expires = "; max-age=86400"; // temp value, default expire time for 1 day
        let expires = option.expires || this.DEFAULT_CONFIG.expires;
        if (expires) {
            switch (expires.constructor) {
                case Number:
                    if (expires === Infinity || expires === -1)
                        _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                    else
                        _expires = "; max-age=" + expires;
                    break;
                case String:
                    if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expires)) {
                        // get capture number group
                        let _expireTime = expires.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
                        // get capture type group , to lower case
                        switch (expires.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                            // Frequency sorting
                            case 'm':
                                _expires = "; max-age=" + +_expireTime * 2592000;
                                break; // 60 * 60 * 24 * 30
                            case 'd':
                                _expires = "; max-age=" + +_expireTime * 86400;
                                break; // 60 * 60 * 24
                            case 'h':
                                _expires = "; max-age=" + +_expireTime * 3600;
                                break; // 60 * 60
                            case 'min':
                                _expires = "; max-age=" + +_expireTime * 60;
                                break; // 60
                            case 's':
                                _expires = "; max-age=" + _expireTime;
                                break;
                            case 'y':
                                _expires = "; max-age=" + +_expireTime * 31104000;
                                break; // 60 * 60 * 24 * 30 * 12
                            default:
                        }
                    }
                    else {
                        _expires = "; expires=" + expires;
                    }
                    break;
                case Date:
                    _expires = "; expires=" + expires.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (option.domain ? "; domain=" + option.domain : "") + (option.path ? "; path=" + option.path : this.DEFAULT_CONFIG.path) + (option.secure ? "; secure" : "");
        return this;
    }
    remove(key, option = {}) {
        if (!key || !this.isKey(key)) {
            return false;
        }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (option.domain ? "; domain=" + option.domain : "") + (option.path ? "; path=" + option.path : this.DEFAULT_CONFIG.path);
        return this;
    }
    isKey(key) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
    keys() {
        if (!document.cookie)
            return [];
        var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var _index = 0; _index < _keys.length; _index++) {
            _keys[_index] = decodeURIComponent(_keys[_index]);
        }
        return _keys;
    }
}

module.exports = main;

},{}]},{},[1])