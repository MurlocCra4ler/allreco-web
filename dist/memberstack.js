(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var ms = window.$memberstackDom;
ms.getCurrentMember().then(function (_a) {
  var member = _a.data;

  if (member && member.customFields["force-pw-reset"] === "true" && window.location.href.indexOf("reset") < 0) {
    window.location.href = "/haendler-passwort-reset";
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtcyIsIndpbmRvdyIsIiRtZW1iZXJzdGFja0RvbSIsImdldEN1cnJlbnRNZW1iZXIiLCJ0aGVuIiwiX2EiLCJtZW1iZXIiLCJkYXRhIiwiY3VzdG9tRmllbGRzIiwibG9jYXRpb24iLCJocmVmIiwiaW5kZXhPZiJdLCJzb3VyY2VzIjpbImZha2VfYjVjZWMwNjYuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1zID0gd2luZG93LiRtZW1iZXJzdGFja0RvbTtcbm1zLmdldEN1cnJlbnRNZW1iZXIoKS50aGVuKGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBtZW1iZXIgPSBfYS5kYXRhO1xuICAgIGlmIChtZW1iZXIgJiYgbWVtYmVyLmN1c3RvbUZpZWxkc1tcImZvcmNlLXB3LXJlc2V0XCJdID09PSBcInRydWVcIiAmJiB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKFwicmVzZXRcIikgPCAwKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvaGFlbmRsZXItcGFzc3dvcnQtcmVzZXRcIjtcbiAgICB9XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxFQUFFLEdBQUdDLE1BQU0sQ0FBQ0MsZUFBaEI7QUFDQUYsRUFBRSxDQUFDRyxnQkFBSCxHQUFzQkMsSUFBdEIsQ0FBMkIsVUFBVUMsRUFBVixFQUFjO0VBQ3JDLElBQUlDLE1BQU0sR0FBR0QsRUFBRSxDQUFDRSxJQUFoQjs7RUFDQSxJQUFJRCxNQUFNLElBQUlBLE1BQU0sQ0FBQ0UsWUFBUCxDQUFvQixnQkFBcEIsTUFBMEMsTUFBcEQsSUFBOERQLE1BQU0sQ0FBQ1EsUUFBUCxDQUFnQkMsSUFBaEIsQ0FBcUJDLE9BQXJCLENBQTZCLE9BQTdCLElBQXdDLENBQTFHLEVBQTZHO0lBQ3pHVixNQUFNLENBQUNRLFFBQVAsQ0FBZ0JDLElBQWhCLEdBQXVCLDBCQUF2QjtFQUNIO0FBQ0osQ0FMRCJ9
},{}]},{},[1])