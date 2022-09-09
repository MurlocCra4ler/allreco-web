(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _a, _b;

exports.__esModule = true;

var cookies_ts_1 = require("cookies-ts");

var menu = document.getElementById('menu');
var dropdown = document.getElementById('dropdown');
var overlay = document.getElementById('blocking-overlay');
var toggled = false;

if (menu && dropdown && overlay) {
  menu.addEventListener('click', function () {
    if (toggled) {
      menu.classList.remove('toggled');
      dropdown.classList.remove('toggled');
      overlay.classList.remove('toggled');
    } else {
      menu.classList.add('toggled');
      dropdown.classList.add('toggled');
      overlay.classList.add('toggled');
    }

    toggled = !toggled;
  });
  document.addEventListener('scroll', function () {
    if (toggled) {
      menu.classList.remove('toggled');
      dropdown.classList.remove('toggled');
      overlay.classList.remove('toggled');
      toggled = false;
    }
  });
}

var login = document.getElementById('login');
var logout = document.getElementById('logout');

if (login && logout) {
  MemberStack.onReady.then(function (member) {
    if (member.loggedIn) {
      login.style.display = 'none';
      logout.style.display = 'flex';
    } else {
      login.style.display = 'flex';
      logout.style.display = 'none';
    }
  });
}

var langMenuVisible = false;
var globe = document.getElementById('globe');

if (globe) {
  globe.addEventListener('click', function () {
    if (langMenuVisible) {
      globe.classList.remove('selected');
      langMenuVisible = false;
    } else {
      globe.classList.add('selected');
      langMenuVisible = true;
    }
  });
}

var cookies = new cookies_ts_1["default"]();
(_a = document.getElementById('lang-de')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
  cookies.set('lang', 'de');
  var event = new Event('langchange');
  document.dispatchEvent(event);
});
(_b = document.getElementById('lang-en')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
  cookies.set('lang', 'en');
  var event = new Event('langchange');
  document.dispatchEvent(event);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYSIsIl9iIiwiZXhwb3J0cyIsIl9fZXNNb2R1bGUiLCJjb29raWVzX3RzXzEiLCJyZXF1aXJlIiwibWVudSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkcm9wZG93biIsIm92ZXJsYXkiLCJ0b2dnbGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImxvZ2luIiwibG9nb3V0IiwiTWVtYmVyU3RhY2siLCJvblJlYWR5IiwidGhlbiIsIm1lbWJlciIsImxvZ2dlZEluIiwic3R5bGUiLCJkaXNwbGF5IiwibGFuZ01lbnVWaXNpYmxlIiwiZ2xvYmUiLCJjb29raWVzIiwic2V0IiwiZXZlbnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiXSwic291cmNlcyI6WyJmYWtlXzlhOTk2MTc3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9hLCBfYjtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgY29va2llc190c18xID0gcmVxdWlyZShcImNvb2tpZXMtdHNcIik7XG52YXIgbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Jyk7XG52YXIgZHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJvcGRvd24nKTtcbnZhciBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NraW5nLW92ZXJsYXknKTtcbnZhciB0b2dnbGVkID0gZmFsc2U7XG5pZiAobWVudSAmJiBkcm9wZG93biAmJiBvdmVybGF5KSB7XG4gICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRvZ2dsZWQpIHtcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ3RvZ2dsZWQnKTtcbiAgICAgICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3RvZ2dsZWQnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgndG9nZ2xlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRvZ2dsZWQgPSAhdG9nZ2xlZDtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0b2dnbGVkKSB7XG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICAgICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgdG9nZ2xlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG52YXIgbG9naW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4nKTtcbnZhciBsb2dvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nb3V0Jyk7XG5pZiAobG9naW4gJiYgbG9nb3V0KSB7XG4gICAgTWVtYmVyU3RhY2sub25SZWFkeS50aGVuKGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgICAgaWYgKG1lbWJlci5sb2dnZWRJbikge1xuICAgICAgICAgICAgbG9naW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGxvZ291dC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9naW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICAgIGxvZ291dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfSk7XG59XG52YXIgbGFuZ01lbnVWaXNpYmxlID0gZmFsc2U7XG52YXIgZ2xvYmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2xvYmUnKTtcbmlmIChnbG9iZSkge1xuICAgIGdsb2JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAobGFuZ01lbnVWaXNpYmxlKSB7XG4gICAgICAgICAgICBnbG9iZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgbGFuZ01lbnVWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnbG9iZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgbGFuZ01lbnVWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxudmFyIGNvb2tpZXMgPSBuZXcgY29va2llc190c18xW1wiZGVmYXVsdFwiXSgpO1xuKF9hID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhbmctZGUnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGNvb2tpZXMuc2V0KCdsYW5nJywgJ2RlJyk7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdsYW5nY2hhbmdlJyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59KTtcbihfYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYW5nLWVuJykpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb29raWVzLnNldCgnbGFuZycsICdlbicpO1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbGFuZ2NoYW5nZScpO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUlBLEVBQUosRUFBUUMsRUFBUjs7QUFDQUMsT0FBTyxDQUFDQyxVQUFSLEdBQXFCLElBQXJCOztBQUNBLElBQUlDLFlBQVksR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsSUFBSUMsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDtBQUNBLElBQUlDLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWY7QUFDQSxJQUFJRSxPQUFPLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixrQkFBeEIsQ0FBZDtBQUNBLElBQUlHLE9BQU8sR0FBRyxLQUFkOztBQUNBLElBQUlMLElBQUksSUFBSUcsUUFBUixJQUFvQkMsT0FBeEIsRUFBaUM7RUFDN0JKLElBQUksQ0FBQ00sZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBWTtJQUN2QyxJQUFJRCxPQUFKLEVBQWE7TUFDVEwsSUFBSSxDQUFDTyxTQUFMLENBQWVDLE1BQWYsQ0FBc0IsU0FBdEI7TUFDQUwsUUFBUSxDQUFDSSxTQUFULENBQW1CQyxNQUFuQixDQUEwQixTQUExQjtNQUNBSixPQUFPLENBQUNHLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLFNBQXpCO0lBQ0gsQ0FKRCxNQUtLO01BQ0RSLElBQUksQ0FBQ08sU0FBTCxDQUFlRSxHQUFmLENBQW1CLFNBQW5CO01BQ0FOLFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQkUsR0FBbkIsQ0FBdUIsU0FBdkI7TUFDQUwsT0FBTyxDQUFDRyxTQUFSLENBQWtCRSxHQUFsQixDQUFzQixTQUF0QjtJQUNIOztJQUNESixPQUFPLEdBQUcsQ0FBQ0EsT0FBWDtFQUNILENBWkQ7RUFhQUosUUFBUSxDQUFDSyxnQkFBVCxDQUEwQixRQUExQixFQUFvQyxZQUFZ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
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