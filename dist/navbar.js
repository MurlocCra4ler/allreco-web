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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYSIsIl9iIiwiZXhwb3J0cyIsIl9fZXNNb2R1bGUiLCJjb29raWVzX3RzXzEiLCJyZXF1aXJlIiwibWVudSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJkcm9wZG93biIsIm92ZXJsYXkiLCJ0b2dnbGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsImxvZ2luIiwibG9nb3V0IiwiTWVtYmVyU3RhY2siLCJvblJlYWR5IiwidGhlbiIsIm1lbWJlciIsImxvZ2dlZEluIiwic3R5bGUiLCJkaXNwbGF5IiwibGFuZ01lbnVWaXNpYmxlIiwiZ2xvYmUiLCJjb29raWVzIiwic2V0IiwiZXZlbnQiLCJFdmVudCIsImRpc3BhdGNoRXZlbnQiXSwic291cmNlcyI6WyJmYWtlXzgxMjI1NDkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2EsIF9iO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBjb29raWVzX3RzXzEgPSByZXF1aXJlKFwiY29va2llcy10c1wiKTtcbnZhciBtZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnUnKTtcbnZhciBkcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcm9wZG93bicpO1xudmFyIG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmxvY2tpbmctb3ZlcmxheScpO1xudmFyIHRvZ2dsZWQgPSBmYWxzZTtcbmlmIChtZW51ICYmIGRyb3Bkb3duICYmIG92ZXJsYXkpIHtcbiAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodG9nZ2xlZCkge1xuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LmFkZCgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCd0b2dnbGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlZCA9ICF0b2dnbGVkO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRvZ2dsZWQpIHtcbiAgICAgICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgICAgICAgICB0b2dnbGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnZhciBsb2dpbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbicpO1xudmFyIGxvZ291dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvdXQnKTtcbmlmIChsb2dpbiAmJiBsb2dvdXQpIHtcbiAgICBNZW1iZXJTdGFjay5vblJlYWR5LnRoZW4oZnVuY3Rpb24gKG1lbWJlcikge1xuICAgICAgICBpZiAobWVtYmVyLmxvZ2dlZEluKSB7XG4gICAgICAgICAgICBsb2dpbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbG9nb3V0LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dpbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICAgICAgbG9nb3V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnZhciBsYW5nTWVudVZpc2libGUgPSBmYWxzZTtcbnZhciBnbG9iZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbG9iZScpO1xuaWYgKGdsb2JlKSB7XG4gICAgZ2xvYmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChsYW5nTWVudVZpc2libGUpIHtcbiAgICAgICAgICAgIGdsb2JlLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBsYW5nTWVudVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICBsYW5nTWVudVZpc2libGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG52YXIgY29va2llcyA9IG5ldyBjb29raWVzX3RzXzFbXCJkZWZhdWx0XCJdKCk7XG4oX2EgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFuZy1kZScpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgY29va2llcy5zZXQoJ2xhbmcnLCAnZGUnKTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2xhbmdjaGFuZ2UnKTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn0pO1xuKF9iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhbmctZW4nKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGNvb2tpZXMuc2V0KCdsYW5nJywgJ2VuJyk7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdsYW5nY2hhbmdlJyk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsRUFBSixFQUFRQyxFQUFSOztBQUNBQyxPQUFPLENBQUNDLFVBQVIsR0FBcUIsSUFBckI7O0FBQ0EsSUFBSUMsWUFBWSxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUExQjs7QUFDQSxJQUFJQyxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixNQUF4QixDQUFYO0FBQ0EsSUFBSUMsUUFBUSxHQUFHRixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBZjtBQUNBLElBQUlFLE9BQU8sR0FBR0gsUUFBUSxDQUFDQyxjQUFULENBQXdCLGtCQUF4QixDQUFkO0FBQ0EsSUFBSUcsT0FBTyxHQUFHLEtBQWQ7O0FBQ0EsSUFBSUwsSUFBSSxJQUFJRyxRQUFSLElBQW9CQyxPQUF4QixFQUFpQztFQUM3QkosSUFBSSxDQUFDTSxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFZO0lBQ3ZDLElBQUlELE9BQUosRUFBYTtNQUNUTCxJQUFJLENBQUNPLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixTQUF0QjtNQUNBTCxRQUFRLENBQUNJLFNBQVQsQ0FBbUJDLE1BQW5CLENBQTBCLFNBQTFCO01BQ0FKLE9BQU8sQ0FBQ0csU0FBUixDQUFrQkMsTUFBbEIsQ0FBeUIsU0FBekI7SUFDSCxDQUpELE1BS0s7TUFDRFIsSUFBSSxDQUFDTyxTQUFMLENBQWVFLEdBQWYsQ0FBbUIsU0FBbkI7TUFDQU4sUUFBUSxDQUFDSSxTQUFULENBQW1CRSxHQUFuQixDQUF1QixTQUF2QjtNQUNBTCxPQUFPLENBQUNHLFNBQVIsQ0FBa0JFLEdBQWxCLENBQXNCLFNBQXRCO0lBQ0g7O0lBQ0RKLE9BQU8sR0FBRyxDQUFDQSxPQUFYO0VBQ0gsQ0FaRDtFQWFBSixRQUFRLENBQUNLLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFlBQVk7SUFDNUMsSUFBSUQsT0FBSixFQUFhO01BQ1RMLElBQUksQ0FBQ08sU0FBTCxDQUFlQyxNQUFmLENBQXNCLFNBQXRCO01BQ0FMLFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQkMsTUFBbkIsQ0FBMEIsU0FBMUI7TUFDQUosT0FBTyxDQUFDRyxTQUFSLENBQWtCQyxNQUFsQixDQUF5QixTQUF6QjtNQUNBSCxPQUFPLEdBQUcsS0FBVjtJQUNIO0VBQ0osQ0FQRDtBQVFIOztBQUNELElBQUlLLEtBQUssR0FBR1QsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQVo7QUFDQSxJQUFJUyxNQUFNLEdBQUdWLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFiOztBQUNBLElBQUlRLEtBQUssSUFBSUMsTUFBYixFQUFxQjtFQUNqQkMsV0FBVyxDQUFDQyxPQUFaLENBQW9CQyxJQUFwQixDQUF5QixVQUFVQyxNQUFWLEVBQWtCO0lBQ3ZDLElBQUlBLE1BQU0sQ0FBQ0MsUUFBWCxFQUFxQjtNQUNqQk4sS0FBSyxDQUFDTyxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7TUFDQVAsTUFBTSxDQUFDTSxLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7SUFDSCxDQUhELE1BSUs7TUFDRFIsS0FBSyxDQUFDTyxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7TUFDQVAsTUFBTSxDQUFDTSxLQUFQLENBQWFDLE9BQWIsR0FBdUIsTUFBdkI7SUFDSDtFQUNKLENBVEQ7QUFVSDs7QUFDRCxJQUFJQyxlQUFlLEdBQUcsS0FBdEI7QUFDQSxJQUFJQyxLQUFLLEdBQUduQixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBWjs7QUFDQSxJQUFJa0IsS0FBSixFQUFXO0VBQ1BBLEtBQUssQ0FBQ2QsZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsWUFBWTtJQUN4QyxJQUFJYSxlQUFKLEVBQXFCO01BQ2pCQyxLQUFLLENBQUNiLFNBQU4sQ0FBZ0JDLE1BQWhCLENBQXVCLFVBQXZCO01BQ0FXLGVBQWUsR0FBRyxLQUFsQjtJQUNILENBSEQsTUFJSztNQUNEQyxLQUFLLENBQUNiLFNBQU4sQ0FBZ0JFLEdBQWhCLENBQW9CLFVBQXBCO01BQ0FVLGVBQWUsR0FBRyxJQUFsQjtJQUNIO0VBQ0osQ0FURDtBQVVIOztBQUNELElBQUlFLE9BQU8sR0FBRyxJQUFJdkIsWUFBWSxDQUFDLFNBQUQsQ0FBaEIsRUFBZDtBQUNBLENBQUNKLEVBQUUsR0FBR08sUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQU4sTUFBOEMsSUFBOUMsSUFBc0RSLEVBQUUsS0FBSyxLQUFLLENBQWxFLEdBQXNFLEtBQUssQ0FBM0UsR0FBK0VBLEVBQUUsQ0FBQ1ksZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBWTtFQUNwSGUsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQixJQUFwQjtFQUNBLElBQUlDLEtBQUssR0FBRyxJQUFJQyxLQUFKLENBQVUsWUFBVixDQUFaO0VBQ0F2QixRQUFRLENBQUN3QixhQUFULENBQXVCRixLQUF2QjtBQUNILENBSjhFLENBQS9FO0FBS0EsQ0FBQzVCLEVBQUUsR0FBR00sUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLENBQU4sTUFBOEMsSUFBOUMsSUFBc0RQLEVBQUUsS0FBSyxLQUFLLENBQWxFLEdBQXNFLEtBQUssQ0FBM0UsR0FBK0VBLEVBQUUsQ0FBQ1csZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkIsWUFBWTtFQUNwSGUsT0FBTyxDQUFDQyxHQUFSLENBQVksTUFBWixFQUFvQixJQUFwQjtFQUNBLElBQUlDLEtBQUssR0FBRyxJQUFJQyxLQUFKLENBQVUsWUFBVixDQUFaO0VBQ0F2QixRQUFRLENBQUN3QixhQUFULENBQXVCRixLQUF2QjtBQUNILENBSjhFLENBQS9FIn0=
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