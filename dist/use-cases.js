(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var downloads = document.getElementsByClassName("download-block");
window.$memberstackDom.getCurrentMember().then(function (_a) {
  var member = _a.data;

  if (!member) {
    for (var i = 0; i < downloads.length; i++) {
      downloads[i].setAttribute('href', "../login");
    }
  }
});
var paragraph = document.getElementById("vorteile");

if (paragraph) {
  var splittedText = paragraph.innerText.split(/\r?\n/).filter(function (x) {
    return x !== "";
  });
  var innerHTML = "<ul>";

  for (var i = 0; i < splittedText.length; i++) {
    innerHTML += "<li>" + splittedText[i] + "</li>";
  }

  innerHTML += "</ul>";
  paragraph.innerHTML = innerHTML;
}

var tabsContainer = document.getElementsByClassName("tabs-container")[0];
var tabsContainerHeight = tabsContainer.getBoundingClientRect().height;
var contentHeight = document.getElementsByClassName("selection-content")[0].getBoundingClientRect().height;
var headers = document.getElementsByClassName("tab-header");
var contents = document.getElementsByClassName("tab-content-container");
document.addEventListener("scroll", PositionHeaderContainer, {
  passive: true
});

function PositionHeaderContainer() {
  var offset = 0;
  tabsContainer.style.top = "0px";
  var top = tabsContainer.getBoundingClientRect().top;

  while (top < 0 && offset - top + tabsContainerHeight < contentHeight) {
    offset -= top;
    tabsContainer.style.top = offset + "px";
    top = tabsContainer.getBoundingClientRect().top;
  }

  if (top < 0) {
    tabsContainer.style.top = contentHeight - tabsContainerHeight + "px";
  }

  for (var i = 0; i < contents.length; i++) {
    var pTop = contents[i].getBoundingClientRect().top;
    var pBot = contents[i].getBoundingClientRect().bottom;
    headers[i].setAttribute("content-on-display", "false");

    if (pTop - 48 <= 0 && pBot - 48 > 0) {
      headers[i].setAttribute("content-on-display", "true");
    }
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3dubG9hZHMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ3aW5kb3ciLCIkbWVtYmVyc3RhY2tEb20iLCJnZXRDdXJyZW50TWVtYmVyIiwidGhlbiIsIl9hIiwibWVtYmVyIiwiZGF0YSIsImkiLCJsZW5ndGgiLCJzZXRBdHRyaWJ1dGUiLCJwYXJhZ3JhcGgiLCJnZXRFbGVtZW50QnlJZCIsInNwbGl0dGVkVGV4dCIsImlubmVyVGV4dCIsInNwbGl0IiwiZmlsdGVyIiwieCIsImlubmVySFRNTCIsInRhYnNDb250YWluZXIiLCJ0YWJzQ29udGFpbmVySGVpZ2h0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiaGVpZ2h0IiwiY29udGVudEhlaWdodCIsImhlYWRlcnMiLCJjb250ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJQb3NpdGlvbkhlYWRlckNvbnRhaW5lciIsInBhc3NpdmUiLCJvZmZzZXQiLCJzdHlsZSIsInRvcCIsInBUb3AiLCJwQm90IiwiYm90dG9tIl0sInNvdXJjZXMiOlsiZmFrZV9lOThmZjBiMy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZG93bmxvYWRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRvd25sb2FkLWJsb2NrXCIpO1xud2luZG93LiRtZW1iZXJzdGFja0RvbS5nZXRDdXJyZW50TWVtYmVyKCkudGhlbihmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbWVtYmVyID0gX2EuZGF0YTtcbiAgICBpZiAoIW1lbWJlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvd25sb2Fkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZG93bmxvYWRzW2ldLnNldEF0dHJpYnV0ZSgnaHJlZicsIFwiLi4vbG9naW5cIik7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbnZhciBwYXJhZ3JhcGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZvcnRlaWxlXCIpO1xuaWYgKHBhcmFncmFwaCkge1xuICAgIHZhciBzcGxpdHRlZFRleHQgPSBwYXJhZ3JhcGguaW5uZXJUZXh0LnNwbGl0KC9cXHI/XFxuLykuZmlsdGVyKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICE9PSBcIlwiOyB9KTtcbiAgICB2YXIgaW5uZXJIVE1MID0gXCI8dWw+XCI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGxpdHRlZFRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5uZXJIVE1MICs9IFwiPGxpPlwiICsgc3BsaXR0ZWRUZXh0W2ldICsgXCI8L2xpPlwiO1xuICAgIH1cbiAgICBpbm5lckhUTUwgKz0gXCI8L3VsPlwiO1xuICAgIHBhcmFncmFwaC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG59XG52YXIgdGFic0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWJzLWNvbnRhaW5lclwiKVswXTtcbnZhciB0YWJzQ29udGFpbmVySGVpZ2h0ID0gdGFic0NvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG52YXIgY29udGVudEhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3Rpb24tY29udGVudFwiKVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG52YXIgaGVhZGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0YWItaGVhZGVyXCIpO1xudmFyIGNvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRhYi1jb250ZW50LWNvbnRhaW5lclwiKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgUG9zaXRpb25IZWFkZXJDb250YWluZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIFBvc2l0aW9uSGVhZGVyQ29udGFpbmVyKCkge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHRhYnNDb250YWluZXIuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICB2YXIgdG9wID0gdGFic0NvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgd2hpbGUgKHRvcCA8IDAgJiYgb2Zmc2V0IC0gdG9wICsgdGFic0NvbnRhaW5lckhlaWdodCA8IGNvbnRlbnRIZWlnaHQpIHtcbiAgICAgICAgb2Zmc2V0IC09IHRvcDtcbiAgICAgICAgdGFic0NvbnRhaW5lci5zdHlsZS50b3AgPSBvZmZzZXQgKyBcInB4XCI7XG4gICAgICAgIHRvcCA9IHRhYnNDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgIH1cbiAgICBpZiAodG9wIDwgMCkge1xuICAgICAgICB0YWJzQ29udGFpbmVyLnN0eWxlLnRvcCA9IGNvbnRlbnRIZWlnaHQgLSB0YWJzQ29udGFpbmVySGVpZ2h0ICsgXCJweFwiO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwVG9wID0gY29udGVudHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuICAgICAgICB2YXIgcEJvdCA9IGNvbnRlbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbTtcbiAgICAgICAgaGVhZGVyc1tpXS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50LW9uLWRpc3BsYXlcIiwgXCJmYWxzZVwiKTtcbiAgICAgICAgaWYgKHBUb3AgLSA0OCA8PSAwICYmIHBCb3QgLSA0OCA+IDApIHtcbiAgICAgICAgICAgIGhlYWRlcnNbaV0uc2V0QXR0cmlidXRlKFwiY29udGVudC1vbi1kaXNwbGF5XCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsZ0JBQWhDLENBQWhCO0FBQ0FDLE1BQU0sQ0FBQ0MsZUFBUCxDQUF1QkMs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
},{}]},{},[1])