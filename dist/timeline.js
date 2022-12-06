(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var inputs = document.getElementsByClassName('timeline-input');
var paras = document.getElementsByClassName('description-container');
paras[0].classList.add('active');
Array.from(paras).forEach(function (param) {
  param.classList.add('animate__animated', 'animate__fadeIn');
});
Array.from(inputs).forEach(function (input) {
  input.addEventListener('click', function (event) {
    Array.from(inputs).filter(function (x) {
      return x != input;
    }).forEach(function (filteredInput) {
      filteredInput.classList.remove('active');
    });
    input.classList.add('active');
    var dataset = input.children[0].dataset['year'];
    Array.from(paras).filter(function (x) {
      return x.dataset['year'] != dataset;
    }).forEach(function (inactiveParam) {
      inactiveParam.classList.remove('active');
    });
    Array.from(paras).filter(function (x) {
      return x.dataset['year'] === dataset;
    }).forEach(function (acitveParam) {
      acitveParam.classList.add('active');
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJpbnB1dHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJwYXJhcyIsImNsYXNzTGlzdCIsImFkZCIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJwYXJhbSIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZmlsdGVyIiwieCIsImZpbHRlcmVkSW5wdXQiLCJyZW1vdmUiLCJkYXRhc2V0IiwiY2hpbGRyZW4iLCJpbmFjdGl2ZVBhcmFtIiwiYWNpdHZlUGFyYW0iXSwic291cmNlcyI6WyJmYWtlXzI3YmZiNTFmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpbnB1dHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0aW1lbGluZS1pbnB1dCcpO1xudmFyIHBhcmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGVzY3JpcHRpb24tY29udGFpbmVyJyk7XG5wYXJhc1swXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbkFycmF5LmZyb20ocGFyYXMpLmZvckVhY2goZnVuY3Rpb24gKHBhcmFtKSB7XG4gICAgcGFyYW0uY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZV9fYW5pbWF0ZWQnLCAnYW5pbWF0ZV9fZmFkZUluJyk7XG59KTtcbkFycmF5LmZyb20oaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIEFycmF5LmZyb20oaW5wdXRzKS5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggIT0gaW5wdXQ7IH0pLmZvckVhY2goZnVuY3Rpb24gKGZpbHRlcmVkSW5wdXQpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdmFyIGRhdGFzZXQgPSBpbnB1dC5jaGlsZHJlblswXS5kYXRhc2V0Wyd5ZWFyJ107XG4gICAgICAgIEFycmF5LmZyb20ocGFyYXMpLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5kYXRhc2V0Wyd5ZWFyJ10gIT0gZGF0YXNldDsgfSkuZm9yRWFjaChmdW5jdGlvbiAoaW5hY3RpdmVQYXJhbSkge1xuICAgICAgICAgICAgaW5hY3RpdmVQYXJhbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEFycmF5LmZyb20ocGFyYXMpLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5kYXRhc2V0Wyd5ZWFyJ10gPT09IGRhdGFzZXQ7IH0pLmZvckVhY2goZnVuY3Rpb24gKGFjaXR2ZVBhcmFtKSB7XG4gICAgICAgICAgICBhY2l0dmVQYXJhbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsZ0JBQWhDLENBQWI7QUFDQSxJQUFJQyxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsdUJBQWhDLENBQVo7QUFDQUMsS0FBSyxDQUFDLENBQUQsQ0FBTCxDQUFTQyxTQUFULENBQW1CQyxHQUFuQixDQUF1QixRQUF2QjtBQUNBQyxLQUFLLENBQUNDLElBQU4sQ0FBV0osS0FBWCxFQUFrQkssT0FBbEIsQ0FBMEIsVUFBVUMsS0FBVixFQUFpQjtFQUN2Q0EsS0FBSyxDQUFDTCxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixtQkFBcEIsRUFBeUMsaUJBQXpDO0FBQ0gsQ0FGRDtBQUdBQyxLQUFLLENBQUNDLElBQU4sQ0FBV1AsTUFBWCxFQUFtQlEsT0FBbkIsQ0FBMkIsVUFBVUUsS0FBVixFQUFpQjtFQUN4Q0EsS0FBSyxDQUFDQyxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxVQUFVQyxLQUFWLEVBQWlCO0lBQzdDTixLQUFLLENBQUNDLElBQU4sQ0FBV1AsTUFBWCxFQUFtQmEsTUFBbkIsQ0FBMEIsVUFBVUMsQ0FBVixFQUFhO01BQUUsT0FBT0EsQ0FBQyxJQUFJSixLQUFaO0lBQW9CLENBQTdELEVBQStERixPQUEvRCxDQUF1RSxVQUFVTyxhQUFWLEVBQXlCO01BQzVGQSxhQUFhLENBQUNYLFNBQWQsQ0FBd0JZLE1BQXhCLENBQStCLFFBQS9CO0lBQ0gsQ0FGRDtJQUdBTixLQUFLLENBQUNOLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLFFBQXBCO0lBQ0EsSUFBSVksT0FBTyxHQUFHUCxLQUFLLENBQUNRLFFBQU4sQ0FBZSxDQUFmLEVBQWtCRCxPQUFsQixDQUEwQixNQUExQixDQUFkO0lBQ0FYLEtBQUssQ0FBQ0MsSUFBTixDQUFXSixLQUFYLEVBQWtCVSxNQUFsQixDQUF5QixVQUFVQyxDQUFWLEVBQWE7TUFBRSxPQUFPQSxDQUFDLENBQUNHLE9BQUYsQ0FBVSxNQUFWLEtBQXFCQSxPQUE1QjtJQUFzQyxDQUE5RSxFQUFnRlQsT0FBaEYsQ0FBd0YsVUFBVVcsYUFBVixFQUF5QjtNQUM3R0EsYUFBYSxDQUFDZixTQUFkLENBQXdCWSxNQUF4QixDQUErQixRQUEvQjtJQUNILENBRkQ7SUFHQVYsS0FBSyxDQUFDQyxJQUFOLENBQVdKLEtBQVgsRUFBa0JVLE1BQWxCLENBQXlCLFVBQVVDLENBQVYsRUFBYTtNQUFFLE9BQU9BLENBQUMsQ0FBQ0csT0FBRixDQUFVLE1BQVYsTUFBc0JBLE9BQTdCO0lBQXVDLENBQS9FLEVBQWlGVCxPQUFqRixDQUF5RixVQUFVWSxXQUFWLEVBQXVCO01BQzVHQSxXQUFXLENBQUNoQixTQUFaLENBQXNCQyxHQUF0QixDQUEwQixRQUExQjtJQUNILENBRkQ7RUFHSCxDQVpEO0FBYUgsQ0FkRCJ9
},{}]},{},[1])