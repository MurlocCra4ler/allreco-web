(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _a, _b, _c, _d;

exports.__esModule = true;

var animate_1 = require("./shared/animate"); //delete all empty <p>s


var ps = document.getElementsByTagName("p");
Array.from(ps).forEach(function (p) {
  if (p.innerText.replace(/[^\w\s]/gi, '') !== "") {
    return;
  }

  if (p.parentNode) {
    p.parentNode.removeChild(p);
  }
});
var dropdownBTNs = document.getElementsByClassName("dropdown-btn");
var dropdownContents = document.getElementsByClassName("vendor-list-container");
Array.from(dropdownBTNs).forEach(function (dropdownBTN) {
  dropdownBTN.addEventListener("click", function (event) {
    return onClick(event);
  });
});
Array.from(dropdownContents).forEach(function (dropdownContent) {
  dropdownContent.addEventListener("focusout", function (event) {
    return onFocusout(event);
  });
});

function onClick(event) {
  if (!event.target) {
    console.error('onClick: event target is missing');
    return;
  }

  var parent = event.target.parentElement;

  if ((parent === null || parent === void 0 ? void 0 : parent.getAttribute("disabled")) === "true") {
    return;
  }

  var vendorListContainer = parent === null || parent === void 0 ? void 0 : parent.getElementsByClassName("vendor-list-container")[0];

  if (!vendorListContainer) {
    return;
  }

  vendorListContainer.classList.add("visible");
  vendorListContainer.focus();
}

function onFocusout(event) {
  var target = event.target;

  if (!target) {
    console.error('onFocusout: event target is missing');
    return;
  }

  var parent = target.parentElement;

  if (!parent) {
    console.error('onFocusout: parent is missing');
    return;
  }

  parent.getElementsByClassName("vendor-list-container")[0].classList.remove("visible");
}

function setEntries(dropdown, newEntries) {
  var dropdownContent = dropdown.getElementsByClassName("vendor-list-container")[0];
  var entries = dropdownContent.getElementsByClassName("vendor-list-item");

  while (entries.length < newEntries.length) {
    var dup = entries[0].cloneNode(false);
    dropdownContent.appendChild(dup);
    entries = dropdownContent.getElementsByClassName("vendor-list-item");
  }

  while (entries.length > newEntries.length) {
    entries[0].remove();
    entries = dropdownContent.getElementsByClassName("vendor-list-item");
  }

  var _loop_1 = function _loop_1(i) {
    var element = entries[i];
    element.innerText = newEntries[i];

    if (element.listener) {
      entries[i].removeEventListener("click", element.listener);
    }

    element.listener = function (event) {
      return onSelect(event, newEntries[i]);
    };

    entries[i].addEventListener("click", element.listener);
  };

  for (var i = 0; i < entries.length; i++) {
    _loop_1(i);
  }
}

function setValue(dropdown, value) {
  dropdown.setAttribute("value", value);
  dropdown.getElementsByClassName("btn-text")[0].innerText = value;
  dropdown.getElementsByClassName("vendor-list-container")[0].classList.remove("visible");
}

function setDisabled(dropdown, value) {
  var btn = dropdown.getElementsByClassName("dropdown-btn")[0];

  if (value) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }

  dropdown.setAttribute("disabled", String(value));
}

function onSelect(event, value) {
  var _a;

  var target = event.target;

  if (!target) {
    console.error('onSelect: target is missing');
    return;
  }

  var parent = (_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode;

  if (!parent) {
    console.error('onSelect: parent is missing');
    return;
  }

  setValue(parent, value);
  parent.onchange();
}

var vendors = [];
var markets = [];
var countries = [];
var regions = [];
var vendorContainers = document.getElementsByClassName('vendor-content-container');
Array.from(vendorContainers).forEach(function (vendorContainer) {
  var market = vendorContainer.getElementsByClassName("content-field-market")[0];
  var country = vendorContainer.getElementsByClassName("content-field-country")[0];
  var region = vendorContainer.getElementsByClassName("content-field-region")[0];
  var marketClass = market.innerText.replace(/ /g, '').replace(/&/g, '-');
  var countryClass = country.innerText.replace(/ /g, '').replace(/&/g, '-');
  var regionClass = region.innerText.replace(/ /g, '').replace(/&/g, '-');

  if (regionClass !== "") {
    vendorContainer.getElementsByClassName("region-header")[0].innerText = region.innerText;
    vendorContainer.classList.add("mix");
    vendorContainer.classList.add(marketClass);
    vendorContainer.classList.add(countryClass);
    vendorContainer.classList.add(regionClass);
  }

  vendors.push({
    market: market.innerText,
    country: country.innerText,
    region: region.innerText
  });
  market.style.display = 'none';
  country.style.display = 'none';
  region.style.display = 'none';
});

for (var _i = 0, vendors_1 = vendors; _i < vendors_1.length; _i++) {
  var vendor = vendors_1[_i];

  if (!countries.includes(vendor.country)) {
    countries.push(vendor.country);
  }
}

var vendorContents = document.getElementsByClassName('vendor-content');
Array.from(vendorContents).forEach(function (vendorContent) {
  if (vendorContent.innerText === "") {
    if (!vendorContent.parentElement) {
      console.error('anonymous: vendorContent parent is missing');
      return;
    }

    vendorContent.parentElement.style.display = 'none';
  }
});
var vendorCategoryContainers = document.getElementsByClassName('vendor-category-container');
vendorCategoryContainers[0].classList.add("mix");
var vendorCategoryContainersParent = vendorCategoryContainers[0].parentElement;

while (vendorCategoryContainers.length < countries.length) {
  if (!vendorCategoryContainersParent) {
    console.error('distributor-search: vendorCategoryContainers parent is missing');
    break;
  }

  vendorCategoryContainersParent.appendChild(vendorCategoryContainers[0].cloneNode(true));
  vendorCategoryContainers = document.getElementsByClassName('vendor-category-container');
}

for (var i = 0; i < countries.length; i++) {
  vendorCategoryContainers[i].getElementsByClassName('category-name-container')[0].innerText = countries[i];
}

var tempContainer = document.getElementById('temp');

if (!tempContainer) {
  throw new Error('distributor-search: vendorCategoryContainers parent is missing');
}

vendorContainers = tempContainer.getElementsByClassName('vendor-content-container');
var lastSize = vendorContainers.length;

while (vendorContainers.length > 0) {
  var element = (_a = vendorContainers[0].parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(vendorContainers[0]);

  if (!element) {
    throw new Error('distributor-search: vendorContainer parent is missing');
  }

  var market = element.getElementsByClassName("content-field-market")[0].innerText.replace(/ /g, '').replace(/&/g, '-');
  var country = element.getElementsByClassName("content-field-country")[0].innerText.replace(/ /g, '').replace(/&/g, '-');
  var region = element.getElementsByClassName("content-field-region")[0].innerText.replace(/ /g, '').replace(/&/g, '-');

  for (var i = 0; i < vendorCategoryContainers.length; i++) {
    var header = vendorCategoryContainers[i].getElementsByClassName("category-name-container")[0].innerText.replace(/ /g, '').replace(/&/g, '-');

    if (country.toUpperCase() === header.toUpperCase()) {
      vendorCategoryContainers[i].append(element);

      if (market !== "") {
        vendorCategoryContainers[i].classList.add(market);
      }

      if (country !== "") {
        vendorCategoryContainers[i].classList.add(country);
      }

      if (region !== "") {
        vendorCategoryContainers[i].classList.add(region);
      }

      break;
    }
  }

  vendorContainers = tempContainer.getElementsByClassName('vendor-content-container');

  if (lastSize == vendorContainers.length) {
    throw new Error('distributor-search: failed to remove vendor from tempory container');
  }

  lastSize = vendorContainers.length;
}

var marketSelect = document.getElementById('marketSelect');
var countrySelect = document.getElementById('countrySelect');
var regionSelect = document.getElementById('regionSelect');

if (!marketSelect || !countrySelect || !regionSelect) {
  throw new Error('distributor-search: failed to find selection inputs');
}

var marketSelectDefault = (_b = document.getElementById('marketSelectDefault')) === null || _b === void 0 ? void 0 : _b.innerText;
var countrySelectDefault = (_c = document.getElementById('countrySelectDefault')) === null || _c === void 0 ? void 0 : _c.innerText;
var regionSelectDefault = (_d = document.getElementById('regionSelectDefault')) === null || _d === void 0 ? void 0 : _d.innerText;

if (!marketSelectDefault || !countrySelectDefault || !regionSelectDefault) {
  throw new Error('distributor-search: failed to find default values');
}

setDisabled(marketSelect, false);
setDisabled(countrySelect, true);
setDisabled(regionSelect, true);

for (var _e = 0, vendors_2 = vendors; _e < vendors_2.length; _e++) {
  var vendor = vendors_2[_e];

  if (!markets.includes(vendor.market)) {
    markets.push(vendor.market);
  }
}

setEntries(marketSelect, markets);

marketSelect.onchange = function () {
  var market = marketSelect.getAttribute("value");
  countries = [];

  for (var _i = 0, vendors_3 = vendors; _i < vendors_3.length; _i++) {
    var vendor = vendors_3[_i];

    if (vendor.market == market && !countries.includes(vendor.country)) {
      countries.push(vendor.country);
    }
  }

  setEntries(countrySelect, countries);
  setValue(countrySelect, countrySelectDefault);
  setValue(regionSelect, regionSelectDefault);
  setDisabled(countrySelect, false);
  setDisabled(regionSelect, true);
  Array.from($('.vendor-category-container')).forEach(function (element) {
    element.classList.remove('toggled');
  });
  var collection = $('.vendor-content-container, .vendor-category-container.' + market);
  mixer.filter(collection);
};

countrySelect.onchange = function () {
  var country = countrySelect.getAttribute("value");

  if (!country) {
    console.error('countrySelect.onchange: countrySelect has no value');
    return;
  }

  regions = [];

  for (var _i = 0, vendors_4 = vendors; _i < vendors_4.length; _i++) {
    var vendor = vendors_4[_i];

    if (vendor.country == country && !regions.includes(vendor.region)) {
      regions.push(vendor.region);
    }
  }

  if (regions.length == 1 && regions[0] === "") {
    setValue(regionSelect, regionSelectDefault);
    setDisabled(regionSelect, true);
  } else {
    setEntries(regionSelect, regions);
    setValue(regionSelect, regionSelectDefault);
    setDisabled(regionSelect, false);
  }

  Array.from($('.vendor-category-container')).forEach(function (element) {
    element.classList.remove('toggled');
  });
  var search = country.replace(/ /g, '').replace(/&/g, '-');
  var collection = $('.vendor-content-container, .vendor-category-container.' + search);
  mixer.filter(collection);
  Array.from($('.vendor-category-container.' + search)).forEach(function (element) {
    element.classList.add('toggled');
  });
};

regionSelect.onchange = function () {
  var region = regionSelect.getAttribute("value");

  if (!region) {
    console.error('regionSelect.onchange: regionSelect has no value');
    return;
  }

  Array.from($('.vendor-category-container')).forEach(function (element) {
    element.classList.remove('toggled');
  });
  var search = region.replace(/ /g, '').replace(/&/g, '-');
  var collection = $('.vendor-content-container.' + search + ', .vendor-category-container.' + search);
  Array.from($('.vendor-category-container.' + search)).forEach(function (element) {
    element.classList.add('toggled');
  });
  mixer.filter(collection);
};

var container = document.getElementById('vendor-list');

if (!container) {
  throw new Error('distributor-search: vendor list not found');
}

var mixer = mixitup(container, {
  animation: {
    duration: 350
  }
});

function onToggle(event) {
  var _a;

  if (!event.target) {
    console.error('onToggle: event target is missing');
    return;
  }

  var element = event.target;
  element.activeAnimations = element.activeAnimations == null ? 0 : element.activeAnimations;

  if (element.activeAnimations != 0) {
    console.log('onToggle: has still running animations');
    return;
  }

  var contentContainers = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByClassName('vendor-content-container');

  if (!contentContainers) {
    console.error('onToggle: content containers not found');
    return;
  }

  var minus = event.target.getElementsByClassName('minus')[0];

  if (!element.toggled) {
    element.toggled = true;
    element.parentElement.classList.add("toggled");
    element.activeAnimations += 1;
    (0, animate_1.animateElement)(minus, new animate_1.Animation(animate_1.AnimationName.CustomPlusToMinus, undefined, undefined, animate_1.AnimationDuration.Faster, function () {
      element.activeAnimations -= 1;
      minus.style.display = 'none';
    }));
    Array.from(contentContainers).forEach(function (contentContainer) {
      element.activeAnimations += 1;
      (0, animate_1.animateElement)(contentContainer, new animate_1.Animation(animate_1.AnimationName.FadeIn, undefined, undefined, undefined, function () {
        element.activeAnimations -= 1;
      }));
    });
  } else {
    element.activeAnimations += 1;
    minus.style.display = 'block';
    (0, animate_1.animateElement)(minus, new animate_1.Animation(animate_1.AnimationName.CustomMinusToPlus, undefined, undefined, animate_1.AnimationDuration.Faster, function () {
      element.activeAnimations -= 1;

      if (element.activeAnimations == 0) {
        element.toggled = false;
        element.parentElement.classList.remove("toggled");
      }
    }));
    Array.from(contentContainers).forEach(function (contentContainer) {
      element.activeAnimations += 1;
      (0, animate_1.animateElement)(contentContainer, new animate_1.Animation(animate_1.AnimationName.FadeOut, undefined, undefined, animate_1.AnimationDuration.Faster, function () {
        element.activeAnimations -= 1;

        if (element.activeAnimations == 0) {
          element.toggled = false;
          element.parentElement.classList.remove("toggled");
        }
      }));
    });
  }
}

var vendorCategories = document.getElementsByClassName('vendor-category');
Array.from(vendorCategories).forEach(function (vendorCategory) {
  vendorCategory.addEventListener("click", onToggle);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYSIsIl9iIiwiX2MiLCJfZCIsImV4cG9ydHMiLCJfX2VzTW9kdWxlIiwiYW5pbWF0ZV8xIiwicmVxdWlyZSIsInBzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJwIiwiaW5uZXJUZXh0IiwicmVwbGFjZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRyb3Bkb3duQlROcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkcm9wZG93bkNvbnRlbnRzIiwiZHJvcGRvd25CVE4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbkNsaWNrIiwiZHJvcGRvd25Db250ZW50Iiwib25Gb2N1c291dCIsInRhcmdldCIsImNvbnNvbGUiLCJlcnJvciIsInBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJ2ZW5kb3JMaXN0Q29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwiZm9jdXMiLCJyZW1vdmUiLCJzZXRFbnRyaWVzIiwiZHJvcGRvd24iLCJuZXdFbnRyaWVzIiwiZW50cmllcyIsImxlbmd0aCIsImR1cCIsImNsb25lTm9kZSIsImFwcGVuZENoaWxkIiwiX2xvb3BfMSIsImkiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25TZWxlY3QiLCJzZXRWYWx1ZSIsInZhbHVlIiwic2V0QXR0cmlidXRlIiwic2V0RGlzYWJsZWQiLCJidG4iLCJTdHJpbmciLCJvbmNoYW5nZSIsInZlbmRvcnMiLCJtYXJrZXRzIiwiY291bnRyaWVzIiwicmVnaW9ucyIsInZlbmRvckNvbnRhaW5lcnMiLCJ2ZW5kb3JDb250YWluZXIiLCJtYXJrZXQiLCJjb3VudHJ5IiwicmVnaW9uIiwibWFya2V0Q2xhc3MiLCJjb3VudHJ5Q2xhc3MiLCJyZWdpb25DbGFzcyIsInB1c2giLCJzdHlsZSIsImRpc3BsYXkiLCJfaSIsInZlbmRvcnNfMSIsInZlbmRvciIsImluY2x1ZGVzIiwidmVuZG9yQ29udGVudHMiLCJ2ZW5kb3JDb250ZW50IiwidmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzIiwidmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzUGFyZW50IiwidGVtcENvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiRXJyb3IiLCJsYXN0U2l6ZSIsImhlYWRlciIsInRvVXBwZXJDYXNlIiwiYXBwZW5kIiwibWFya2V0U2VsZWN0IiwiY291bnRyeVNlbGVjdCIsInJlZ2lvblNlbGVjdCIsIm1hcmtldFNlbGVjdERlZmF1bHQiLCJjb3VudHJ5U2VsZWN0RGVmYXVsdCIsInJlZ2lvblNlbGVjdERlZmF1bHQiLCJfZSIsInZlbmRvcnNfMiIsInZlbmRvcnNfMyIsIiQiLCJjb2xsZWN0aW9uIiwibWl4ZXIiLCJmaWx0ZXIiLCJ2ZW5kb3JzXzQiLCJzZWFyY2giLCJjb250YWluZXIiLCJtaXhpdHVwIiwiYW5pbWF0aW9uIiwiZHVyYXRpb24iLCJvblRvZ2dsZSIsImFjdGl2ZUFuaW1hdGlvbnMiLCJsb2ciLCJjb250ZW50Q29udGFpbmVycyIsIm1pbnVzIiwidG9nZ2xlZCIsImFuaW1hdGVFbGVtZW50IiwiQW5pbWF0aW9uIiwiQW5pbWF0aW9uTmFtZSIsIkN1c3RvbVBsdXNUb01pbnVzIiwidW5kZWZpbmVkIiwiQW5pbWF0aW9uRHVyYXRpb24iLCJGYXN0ZXIiLCJjb250ZW50Q29udGFpbmVyIiwiRmFkZUluIiwiQ3VzdG9tTWludXNUb1BsdXMiLCJGYWRlT3V0IiwidmVuZG9yQ2F0ZWdvcmllcyIsInZlbmRvckNhdGVnb3J5Il0sInNvdXJjZXMiOlsiZmFrZV9mMWVkOTBhMS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfYSwgX2IsIF9jLCBfZDtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgYW5pbWF0ZV8xID0gcmVxdWlyZShcIi4vc2hhcmVkL2FuaW1hdGVcIik7XG4vL2RlbGV0ZSBhbGwgZW1wdHkgPHA+c1xudmFyIHBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwXCIpO1xuQXJyYXkuZnJvbShwcykuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgIGlmIChwLmlubmVyVGV4dC5yZXBsYWNlKC9bXlxcd1xcc10vZ2ksICcnKSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwLnBhcmVudE5vZGUpIHtcbiAgICAgICAgcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHApO1xuICAgIH1cbn0pO1xudmFyIGRyb3Bkb3duQlROcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bi1idG5cIik7XG52YXIgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2ZW5kb3ItbGlzdC1jb250YWluZXJcIik7XG5BcnJheS5mcm9tKGRyb3Bkb3duQlROcykuZm9yRWFjaChmdW5jdGlvbiAoZHJvcGRvd25CVE4pIHtcbiAgICBkcm9wZG93bkJUTi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBvbkNsaWNrKGV2ZW50KTsgfSk7XG59KTtcbkFycmF5LmZyb20oZHJvcGRvd25Db250ZW50cykuZm9yRWFjaChmdW5jdGlvbiAoZHJvcGRvd25Db250ZW50KSB7XG4gICAgZHJvcGRvd25Db250ZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c291dFwiLCBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIG9uRm9jdXNvdXQoZXZlbnQpOyB9KTtcbn0pO1xuZnVuY3Rpb24gb25DbGljayhldmVudCkge1xuICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uQ2xpY2s6IGV2ZW50IHRhcmdldCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIGlmICgocGFyZW50ID09PSBudWxsIHx8IHBhcmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcGFyZW50LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpKSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdmVuZG9yTGlzdENvbnRhaW5lciA9IHBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtY29udGFpbmVyXCIpWzBdO1xuICAgIGlmICghdmVuZG9yTGlzdENvbnRhaW5lcikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZlbmRvckxpc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgdmVuZG9yTGlzdENvbnRhaW5lci5mb2N1cygpO1xufVxuZnVuY3Rpb24gb25Gb2N1c291dChldmVudCkge1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25Gb2N1c291dDogZXZlbnQgdGFyZ2V0IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25Gb2N1c291dDogcGFyZW50IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWNvbnRhaW5lclwiKVswXS5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcbn1cbmZ1bmN0aW9uIHNldEVudHJpZXMoZHJvcGRvd24sIG5ld0VudHJpZXMpIHtcbiAgICB2YXIgZHJvcGRvd25Db250ZW50ID0gZHJvcGRvd24uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWNvbnRhaW5lclwiKVswXTtcbiAgICB2YXIgZW50cmllcyA9IGRyb3Bkb3duQ29udGVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtaXRlbVwiKTtcbiAgICB3aGlsZSAoZW50cmllcy5sZW5ndGggPCBuZXdFbnRyaWVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgZHVwID0gZW50cmllc1swXS5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgICBkcm9wZG93bkNvbnRlbnQuYXBwZW5kQ2hpbGQoZHVwKTtcbiAgICAgICAgZW50cmllcyA9IGRyb3Bkb3duQ29udGVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtaXRlbVwiKTtcbiAgICB9XG4gICAgd2hpbGUgKGVudHJpZXMubGVuZ3RoID4gbmV3RW50cmllcy5sZW5ndGgpIHtcbiAgICAgICAgZW50cmllc1swXS5yZW1vdmUoKTtcbiAgICAgICAgZW50cmllcyA9IGRyb3Bkb3duQ29udGVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtaXRlbVwiKTtcbiAgICB9XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGVudHJpZXNbaV07XG4gICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gbmV3RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVsZW1lbnQubGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGVudHJpZXNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVsZW1lbnQubGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQubGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIG9uU2VsZWN0KGV2ZW50LCBuZXdFbnRyaWVzW2ldKTsgfTtcbiAgICAgICAgZW50cmllc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWxlbWVudC5saXN0ZW5lcik7XG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX2xvb3BfMShpKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRWYWx1ZShkcm9wZG93biwgdmFsdWUpIHtcbiAgICBkcm9wZG93bi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB2YWx1ZSk7XG4gICAgZHJvcGRvd24uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJ0bi10ZXh0XCIpWzBdLmlubmVyVGV4dCA9IHZhbHVlO1xuICAgIGRyb3Bkb3duLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2ZW5kb3ItbGlzdC1jb250YWluZXJcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG59XG5mdW5jdGlvbiBzZXREaXNhYmxlZChkcm9wZG93biwgdmFsdWUpIHtcbiAgICB2YXIgYnRuID0gZHJvcGRvd24uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRyb3Bkb3duLWJ0blwiKVswXTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICAgIGRyb3Bkb3duLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFN0cmluZyh2YWx1ZSkpO1xufVxuZnVuY3Rpb24gb25TZWxlY3QoZXZlbnQsIHZhbHVlKSB7XG4gICAgdmFyIF9hO1xuICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25TZWxlY3Q6IHRhcmdldCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhcmVudCA9IChfYSA9IHRhcmdldC5wYXJlbnROb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyZW50Tm9kZTtcbiAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdvblNlbGVjdDogcGFyZW50IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRWYWx1ZShwYXJlbnQsIHZhbHVlKTtcbiAgICBwYXJlbnQub25jaGFuZ2UoKTtcbn1cbnZhciB2ZW5kb3JzID0gW107XG52YXIgbWFya2V0cyA9IFtdO1xudmFyIGNvdW50cmllcyA9IFtdO1xudmFyIHJlZ2lvbnMgPSBbXTtcbnZhciB2ZW5kb3JDb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmVuZG9yLWNvbnRlbnQtY29udGFpbmVyJyk7XG5BcnJheS5mcm9tKHZlbmRvckNvbnRhaW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKHZlbmRvckNvbnRhaW5lcikge1xuICAgIHZhciBtYXJrZXQgPSB2ZW5kb3JDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnQtZmllbGQtbWFya2V0XCIpWzBdO1xuICAgIHZhciBjb3VudHJ5ID0gdmVuZG9yQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50LWZpZWxkLWNvdW50cnlcIilbMF07XG4gICAgdmFyIHJlZ2lvbiA9IHZlbmRvckNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1yZWdpb25cIilbMF07XG4gICAgdmFyIG1hcmtldENsYXNzID0gbWFya2V0LmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIGNvdW50cnlDbGFzcyA9IGNvdW50cnkuaW5uZXJUZXh0LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICB2YXIgcmVnaW9uQ2xhc3MgPSByZWdpb24uaW5uZXJUZXh0LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICBpZiAocmVnaW9uQ2xhc3MgIT09IFwiXCIpIHtcbiAgICAgICAgdmVuZG9yQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZWdpb24taGVhZGVyXCIpWzBdLmlubmVyVGV4dCA9IHJlZ2lvbi5pbm5lclRleHQ7XG4gICAgICAgIHZlbmRvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibWl4XCIpO1xuICAgICAgICB2ZW5kb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZChtYXJrZXRDbGFzcyk7XG4gICAgICAgIHZlbmRvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNvdW50cnlDbGFzcyk7XG4gICAgICAgIHZlbmRvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHJlZ2lvbkNsYXNzKTtcbiAgICB9XG4gICAgdmVuZG9ycy5wdXNoKHtcbiAgICAgICAgbWFya2V0OiBtYXJrZXQuaW5uZXJUZXh0LFxuICAgICAgICBjb3VudHJ5OiBjb3VudHJ5LmlubmVyVGV4dCxcbiAgICAgICAgcmVnaW9uOiByZWdpb24uaW5uZXJUZXh0XG4gICAgfSk7XG4gICAgbWFya2V0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgY291bnRyeS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJlZ2lvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufSk7XG5mb3IgKHZhciBfaSA9IDAsIHZlbmRvcnNfMSA9IHZlbmRvcnM7IF9pIDwgdmVuZG9yc18xLmxlbmd0aDsgX2krKykge1xuICAgIHZhciB2ZW5kb3IgPSB2ZW5kb3JzXzFbX2ldO1xuICAgIGlmICghY291bnRyaWVzLmluY2x1ZGVzKHZlbmRvci5jb3VudHJ5KSkge1xuICAgICAgICBjb3VudHJpZXMucHVzaCh2ZW5kb3IuY291bnRyeSk7XG4gICAgfVxufVxudmFyIHZlbmRvckNvbnRlbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmVuZG9yLWNvbnRlbnQnKTtcbkFycmF5LmZyb20odmVuZG9yQ29udGVudHMpLmZvckVhY2goZnVuY3Rpb24gKHZlbmRvckNvbnRlbnQpIHtcbiAgICBpZiAodmVuZG9yQ29udGVudC5pbm5lclRleHQgPT09IFwiXCIpIHtcbiAgICAgICAgaWYgKCF2ZW5kb3JDb250ZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Fub255bW91czogdmVuZG9yQ29udGVudCBwYXJlbnQgaXMgbWlzc2luZycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZlbmRvckNvbnRlbnQucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn0pO1xudmFyIHZlbmRvckNhdGVnb3J5Q29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jYXRlZ29yeS1jb250YWluZXInKTtcbnZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1swXS5jbGFzc0xpc3QuYWRkKFwibWl4XCIpO1xudmFyIHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1BhcmVudCA9IHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1swXS5wYXJlbnRFbGVtZW50O1xud2hpbGUgKHZlbmRvckNhdGVnb3J5Q29udGFpbmVycy5sZW5ndGggPCBjb3VudHJpZXMubGVuZ3RoKSB7XG4gICAgaWYgKCF2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNQYXJlbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignZGlzdHJpYnV0b3Itc2VhcmNoOiB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMgcGFyZW50IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1BhcmVudC5hcHBlbmRDaGlsZCh2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbMF0uY2xvbmVOb2RlKHRydWUpKTtcbiAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyJyk7XG59XG5mb3IgKHZhciBpID0gMDsgaSA8IGNvdW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgIHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjYXRlZ29yeS1uYW1lLWNvbnRhaW5lcicpWzBdLmlubmVyVGV4dCA9IGNvdW50cmllc1tpXTtcbn1cbnZhciB0ZW1wQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlbXAnKTtcbmlmICghdGVtcENvbnRhaW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcignZGlzdHJpYnV0b3Itc2VhcmNoOiB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMgcGFyZW50IGlzIG1pc3NpbmcnKTtcbn1cbnZlbmRvckNvbnRhaW5lcnMgPSB0ZW1wQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50LWNvbnRhaW5lcicpO1xudmFyIGxhc3RTaXplID0gdmVuZG9yQ29udGFpbmVycy5sZW5ndGg7XG53aGlsZSAodmVuZG9yQ29udGFpbmVycy5sZW5ndGggPiAwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSAoX2EgPSB2ZW5kb3JDb250YWluZXJzWzBdLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5yZW1vdmVDaGlsZCh2ZW5kb3JDb250YWluZXJzWzBdKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaXN0cmlidXRvci1zZWFyY2g6IHZlbmRvckNvbnRhaW5lciBwYXJlbnQgaXMgbWlzc2luZycpO1xuICAgIH1cbiAgICB2YXIgbWFya2V0ID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1tYXJrZXRcIilbMF1cbiAgICAgICAgLmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIGNvdW50cnkgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50LWZpZWxkLWNvdW50cnlcIilbMF1cbiAgICAgICAgLmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIHJlZ2lvbiA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnQtZmllbGQtcmVnaW9uXCIpWzBdXG4gICAgICAgIC5pbm5lclRleHQucmVwbGFjZSgvIC9nLCAnJykucmVwbGFjZSgvJi9nLCAnLScpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBoZWFkZXIgPSB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNhdGVnb3J5LW5hbWUtY29udGFpbmVyXCIpWzBdXG4gICAgICAgICAgICAuaW5uZXJUZXh0LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICAgICAgaWYgKGNvdW50cnkudG9VcHBlckNhc2UoKSA9PT0gaGVhZGVyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1tpXS5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAobWFya2V0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzW2ldLmNsYXNzTGlzdC5hZGQobWFya2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb3VudHJ5ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzW2ldLmNsYXNzTGlzdC5hZGQoY291bnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVnaW9uICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzW2ldLmNsYXNzTGlzdC5hZGQocmVnaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZlbmRvckNvbnRhaW5lcnMgPSB0ZW1wQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50LWNvbnRhaW5lcicpO1xuICAgIGlmIChsYXN0U2l6ZSA9PSB2ZW5kb3JDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rpc3RyaWJ1dG9yLXNlYXJjaDogZmFpbGVkIHRvIHJlbW92ZSB2ZW5kb3IgZnJvbSB0ZW1wb3J5IGNvbnRhaW5lcicpO1xuICAgIH1cbiAgICBsYXN0U2l6ZSA9IHZlbmRvckNvbnRhaW5lcnMubGVuZ3RoO1xufVxudmFyIG1hcmtldFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJrZXRTZWxlY3QnKTtcbnZhciBjb3VudHJ5U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnlTZWxlY3QnKTtcbnZhciByZWdpb25TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uU2VsZWN0Jyk7XG5pZiAoIW1hcmtldFNlbGVjdCB8fCAhY291bnRyeVNlbGVjdCB8fCAhcmVnaW9uU2VsZWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkaXN0cmlidXRvci1zZWFyY2g6IGZhaWxlZCB0byBmaW5kIHNlbGVjdGlvbiBpbnB1dHMnKTtcbn1cbnZhciBtYXJrZXRTZWxlY3REZWZhdWx0ID0gKF9iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcmtldFNlbGVjdERlZmF1bHQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmlubmVyVGV4dDtcbnZhciBjb3VudHJ5U2VsZWN0RGVmYXVsdCA9IChfYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudHJ5U2VsZWN0RGVmYXVsdCcpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaW5uZXJUZXh0O1xudmFyIHJlZ2lvblNlbGVjdERlZmF1bHQgPSAoX2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVnaW9uU2VsZWN0RGVmYXVsdCcpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuaW5uZXJUZXh0O1xuaWYgKCFtYXJrZXRTZWxlY3REZWZhdWx0IHx8ICFjb3VudHJ5U2VsZWN0RGVmYXVsdCB8fCAhcmVnaW9uU2VsZWN0RGVmYXVsdCkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGlzdHJpYnV0b3Itc2VhcmNoOiBmYWlsZWQgdG8gZmluZCBkZWZhdWx0IHZhbHVlcycpO1xufVxuc2V0RGlzYWJsZWQobWFya2V0U2VsZWN0LCBmYWxzZSk7XG5zZXREaXNhYmxlZChjb3VudHJ5U2VsZWN0LCB0cnVlKTtcbnNldERpc2FibGVkKHJlZ2lvblNlbGVjdCwgdHJ1ZSk7XG5mb3IgKHZhciBfZSA9IDAsIHZlbmRvcnNfMiA9IHZlbmRvcnM7IF9lIDwgdmVuZG9yc18yLmxlbmd0aDsgX2UrKykge1xuICAgIHZhciB2ZW5kb3IgPSB2ZW5kb3JzXzJbX2VdO1xuICAgIGlmICghbWFya2V0cy5pbmNsdWRlcyh2ZW5kb3IubWFya2V0KSkge1xuICAgICAgICBtYXJrZXRzLnB1c2godmVuZG9yLm1hcmtldCk7XG4gICAgfVxufVxuc2V0RW50cmllcyhtYXJrZXRTZWxlY3QsIG1hcmtldHMpO1xubWFya2V0U2VsZWN0Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtYXJrZXQgPSBtYXJrZXRTZWxlY3QuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XG4gICAgY291bnRyaWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwLCB2ZW5kb3JzXzMgPSB2ZW5kb3JzOyBfaSA8IHZlbmRvcnNfMy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHZlbmRvciA9IHZlbmRvcnNfM1tfaV07XG4gICAgICAgIGlmICh2ZW5kb3IubWFya2V0ID09IG1hcmtldCAmJiAhY291bnRyaWVzLmluY2x1ZGVzKHZlbmRvci5jb3VudHJ5KSkge1xuICAgICAgICAgICAgY291bnRyaWVzLnB1c2godmVuZG9yLmNvdW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldEVudHJpZXMoY291bnRyeVNlbGVjdCwgY291bnRyaWVzKTtcbiAgICBzZXRWYWx1ZShjb3VudHJ5U2VsZWN0LCBjb3VudHJ5U2VsZWN0RGVmYXVsdCk7XG4gICAgc2V0VmFsdWUocmVnaW9uU2VsZWN0LCByZWdpb25TZWxlY3REZWZhdWx0KTtcbiAgICBzZXREaXNhYmxlZChjb3VudHJ5U2VsZWN0LCBmYWxzZSk7XG4gICAgc2V0RGlzYWJsZWQocmVnaW9uU2VsZWN0LCB0cnVlKTtcbiAgICBBcnJheS5mcm9tKCQoJy52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyJykpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgfSk7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSAkKCcudmVuZG9yLWNvbnRlbnQtY29udGFpbmVyLCAudmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lci4nICsgbWFya2V0KTtcbiAgICBtaXhlci5maWx0ZXIoY29sbGVjdGlvbik7XG59O1xuY291bnRyeVNlbGVjdC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY291bnRyeSA9IGNvdW50cnlTZWxlY3QuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XG4gICAgaWYgKCFjb3VudHJ5KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2NvdW50cnlTZWxlY3Qub25jaGFuZ2U6IGNvdW50cnlTZWxlY3QgaGFzIG5vIHZhbHVlJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVnaW9ucyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMCwgdmVuZG9yc180ID0gdmVuZG9yczsgX2kgPCB2ZW5kb3JzXzQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciB2ZW5kb3IgPSB2ZW5kb3JzXzRbX2ldO1xuICAgICAgICBpZiAodmVuZG9yLmNvdW50cnkgPT0gY291bnRyeSAmJiAhcmVnaW9ucy5pbmNsdWRlcyh2ZW5kb3IucmVnaW9uKSkge1xuICAgICAgICAgICAgcmVnaW9ucy5wdXNoKHZlbmRvci5yZWdpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChyZWdpb25zLmxlbmd0aCA9PSAxICYmIHJlZ2lvbnNbMF0gPT09IFwiXCIpIHtcbiAgICAgICAgc2V0VmFsdWUocmVnaW9uU2VsZWN0LCByZWdpb25TZWxlY3REZWZhdWx0KTtcbiAgICAgICAgc2V0RGlzYWJsZWQocmVnaW9uU2VsZWN0LCB0cnVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNldEVudHJpZXMocmVnaW9uU2VsZWN0LCByZWdpb25zKTtcbiAgICAgICAgc2V0VmFsdWUocmVnaW9uU2VsZWN0LCByZWdpb25TZWxlY3REZWZhdWx0KTtcbiAgICAgICAgc2V0RGlzYWJsZWQocmVnaW9uU2VsZWN0LCBmYWxzZSk7XG4gICAgfVxuICAgIEFycmF5LmZyb20oJCgnLnZlbmRvci1jYXRlZ29yeS1jb250YWluZXInKSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICB9KTtcbiAgICB2YXIgc2VhcmNoID0gY291bnRyeS5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSAkKCcudmVuZG9yLWNvbnRlbnQtY29udGFpbmVyLCAudmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lci4nICsgc2VhcmNoKTtcbiAgICBtaXhlci5maWx0ZXIoY29sbGVjdGlvbik7XG4gICAgQXJyYXkuZnJvbSgkKCcudmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lci4nICsgc2VhcmNoKSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3RvZ2dsZWQnKTtcbiAgICB9KTtcbn07XG5yZWdpb25TZWxlY3Qub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlZ2lvbiA9IHJlZ2lvblNlbGVjdC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTtcbiAgICBpZiAoIXJlZ2lvbikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdyZWdpb25TZWxlY3Qub25jaGFuZ2U6IHJlZ2lvblNlbGVjdCBoYXMgbm8gdmFsdWUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBBcnJheS5mcm9tKCQoJy52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyJykpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGVkJyk7XG4gICAgfSk7XG4gICAgdmFyIHNlYXJjaCA9IHJlZ2lvbi5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSAkKCcudmVuZG9yLWNvbnRlbnQtY29udGFpbmVyLicgKyBzZWFyY2hcbiAgICAgICAgKyAnLCAudmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lci4nICsgc2VhcmNoKTtcbiAgICBBcnJheS5mcm9tKCQoJy52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyLicgKyBzZWFyY2gpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndG9nZ2xlZCcpO1xuICAgIH0pO1xuICAgIG1peGVyLmZpbHRlcihjb2xsZWN0aW9uKTtcbn07XG52YXIgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZlbmRvci1saXN0Jyk7XG5pZiAoIWNvbnRhaW5lcikge1xuICAgIHRocm93IG5ldyBFcnJvcignZGlzdHJpYnV0b3Itc2VhcmNoOiB2ZW5kb3IgbGlzdCBub3QgZm91bmQnKTtcbn1cbnZhciBtaXhlciA9IG1peGl0dXAoY29udGFpbmVyLCB7XG4gICAgYW5pbWF0aW9uOiB7XG4gICAgICAgIGR1cmF0aW9uOiAzNTBcbiAgICB9XG59KTtcbmZ1bmN0aW9uIG9uVG9nZ2xlKGV2ZW50KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uVG9nZ2xlOiBldmVudCB0YXJnZXQgaXMgbWlzc2luZycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbGVtZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgIGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyA9IGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyA9PSBudWxsID8gMCA6IGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucztcbiAgICBpZiAoZWxlbWVudC5hY3RpdmVBbmltYXRpb25zICE9IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ29uVG9nZ2xlOiBoYXMgc3RpbGwgcnVubmluZyBhbmltYXRpb25zJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnRDb250YWluZXJzID0gKF9hID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2ZW5kb3ItY29udGVudC1jb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRlbnRDb250YWluZXJzKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uVG9nZ2xlOiBjb250ZW50IGNvbnRhaW5lcnMgbm90IGZvdW5kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG1pbnVzID0gZXZlbnQudGFyZ2V0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21pbnVzJylbMF07XG4gICAgaWYgKCFlbGVtZW50LnRvZ2dsZWQpIHtcbiAgICAgICAgZWxlbWVudC50b2dnbGVkID0gdHJ1ZTtcbiAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGVkXCIpO1xuICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgKz0gMTtcbiAgICAgICAgKDAsIGFuaW1hdGVfMS5hbmltYXRlRWxlbWVudCkobWludXMsIG5ldyBhbmltYXRlXzEuQW5pbWF0aW9uKGFuaW1hdGVfMS5BbmltYXRpb25OYW1lLkN1c3RvbVBsdXNUb01pbnVzLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgYW5pbWF0ZV8xLkFuaW1hdGlvbkR1cmF0aW9uLkZhc3RlciwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zIC09IDE7XG4gICAgICAgICAgICBtaW51cy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KSk7XG4gICAgICAgIEFycmF5LmZyb20oY29udGVudENvbnRhaW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyArPSAxO1xuICAgICAgICAgICAgKDAsIGFuaW1hdGVfMS5hbmltYXRlRWxlbWVudCkoY29udGVudENvbnRhaW5lciwgbmV3IGFuaW1hdGVfMS5BbmltYXRpb24oYW5pbWF0ZV8xLkFuaW1hdGlvbk5hbWUuRmFkZUluLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zIC09IDE7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zICs9IDE7XG4gICAgICAgIG1pbnVzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAoMCwgYW5pbWF0ZV8xLmFuaW1hdGVFbGVtZW50KShtaW51cywgbmV3IGFuaW1hdGVfMS5BbmltYXRpb24oYW5pbWF0ZV8xLkFuaW1hdGlvbk5hbWUuQ3VzdG9tTWludXNUb1BsdXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhbmltYXRlXzEuQW5pbWF0aW9uRHVyYXRpb24uRmFzdGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgLT0gMTtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgPT0gMCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBBcnJheS5mcm9tKGNvbnRlbnRDb250YWluZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50Q29udGFpbmVyKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgKz0gMTtcbiAgICAgICAgICAgICgwLCBhbmltYXRlXzEuYW5pbWF0ZUVsZW1lbnQpKGNvbnRlbnRDb250YWluZXIsIG5ldyBhbmltYXRlXzEuQW5pbWF0aW9uKGFuaW1hdGVfMS5BbmltYXRpb25OYW1lLkZhZGVPdXQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhbmltYXRlXzEuQW5pbWF0aW9uRHVyYXRpb24uRmFzdGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zIC09IDE7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudG9nZ2xlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInRvZ2dsZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG52YXIgdmVuZG9yQ2F0ZWdvcmllcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jYXRlZ29yeScpO1xuQXJyYXkuZnJvbSh2ZW5kb3JDYXRlZ29yaWVzKS5mb3JFYWNoKGZ1bmN0aW9uICh2ZW5kb3JDYXRlZ29yeSkge1xuICAgIHZlbmRvckNhdGVnb3J5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvblRvZ2dsZSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsRUFBSixFQUFRQyxFQUFSLEVBQVlDLEVBQVosRUFBZ0JDLEVBQWhCOztBQUNBQyxPQUFPLENBQUNDLFVBQVIsR0FBcUIsSUFBckI7O0FBQ0EsSUFBSUMsU0FBUyxHQUFHQyxPQUFPLENBQUMsa0JBQUQsQ0FBdkIsQyxDQUNBOzs7QUFDQSxJQUFJQyxFQUFFLEdBQUdDLFFBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsR0FBOUIsQ0FBVDtBQUNBQyxLQUFLLENBQUNDLElBQU4sQ0FBV0osRUFBWCxFQUFlSyxPQUFmLENBQXVCLFVBQVVDLENBQVYsRUFBYTtFQUNoQyxJQUFJQSxDQUFDLENBQUNDLFNBQUYsQ0FBWUMsT0FBWixDQUFvQixXQUFwQixFQUFpQyxFQUFqQyxNQUF5QyxFQUE3QyxFQUFpRDtJQUM3QztFQUNIOztFQUNELElBQUlGLENBQUMsQ0FBQ0csVUFBTixFQUFrQjtJQUNkSCxDQUFDLENBQUNHLFVBQUYsQ0FBYUMsV0FBYixDQUF5QkosQ0FBekI7RUFDSDtBQUNKLENBUEQ7QUFRQSxJQUFJ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
},{"./shared/animate":2}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.animateElement = exports.Animation = exports.AnimationDuration = exports.AnimationDelay = exports.AnimationRepeat = exports.AnimationName = void 0;
var AnimationName;

(function (AnimationName) {
  AnimationName["Bounce"] = "bounce";
  AnimationName["Flash"] = "flash";
  AnimationName["RubberBand"] = "rubberBand";
  AnimationName["Pulse"] = "pulse";
  AnimationName["Shake"] = "shake";
  AnimationName["Swing"] = "swing";
  AnimationName["Tada"] = "tada";
  AnimationName["Wobble"] = "wobble";
  AnimationName["BounceIn"] = "bounceIn";
  AnimationName["BounceInDown"] = "bounceInDown";
  AnimationName["BounceInLeft"] = "bounceInLeft";
  AnimationName["BounceInRight"] = "bounceInRight";
  AnimationName["BounceInUp"] = "bounceInUp";
  AnimationName["BounceOut"] = "bounceOut";
  AnimationName["BounceOutDown"] = "bounceOutDown";
  AnimationName["BounceOutLeft"] = "bounceOutLeft";
  AnimationName["BounceOutRight"] = "bounceOutRight";
  AnimationName["BounceOutUp"] = "bounceOutUp";
  AnimationName["FadeIn"] = "fadeIn";
  AnimationName["FadeInDown"] = "fadeInDown";
  AnimationName["FadeInDownBig"] = "fadeInDownBig";
  AnimationName["FadeInLeft"] = "fadeInLeft";
  AnimationName["FadeInLeftBig"] = "fadeInLeftBig";
  AnimationName["FadeInRight"] = "fadeInRight";
  AnimationName["FadeInRightBig"] = "fadeInRightBig";
  AnimationName["FadeInUp"] = "fadeInUp";
  AnimationName["FadeInUpBig"] = "fadeInUpBig";
  AnimationName["FadeOut"] = "fadeOut";
  AnimationName["FadeOutDown"] = "fadeOutDown";
  AnimationName["FadeOutDownBig"] = "fadeOutDownBig";
  AnimationName["FadeOutLeft"] = "fadeOutLeft";
  AnimationName["FadeOutLeftBig"] = "fadeOutLeftBig";
  AnimationName["FadeOutRight"] = "fadeOutRight";
  AnimationName["FadeOutRightBig"] = "fadeOutRightBig";
  AnimationName["FadeOutUp"] = "fadeOutUp";
  AnimationName["FadeOutUpBig"] = "fadeOutUpBig";
  AnimationName["Flip"] = "flip";
  AnimationName["FlipInX"] = "flipInX";
  AnimationName["FlipInY"] = "flipInY";
  AnimationName["FlipOutX"] = "flipOutX";
  AnimationName["FlipOutY"] = "flipOutY";
  AnimationName["LightSpeedIn"] = "lightSpeedIn";
  AnimationName["LightSpeedOut"] = "lightSpeedOut";
  AnimationName["RotateIn"] = "rotateIn";
  AnimationName["RotateInDownLeft"] = "rotateInDownLeft";
  AnimationName["RotateInDownRight"] = "rotateInDownRight";
  AnimationName["RotateInUpLeft"] = "rotateInUpLeft";
  AnimationName["RotateInUpRight"] = "rotateInUpRight";
  AnimationName["RotateOut"] = "rotateOut";
  AnimationName["RotateOutDownLeft"] = "rotateOutDownLeft";
  AnimationName["RotateOutDownRight"] = "rotateOutDownRight";
  AnimationName["RotateOutUpLeft"] = "rotateOutUpLeft";
  AnimationName["RotateOutUpRight"] = "rotateOutUpRight";
  AnimationName["Hinge"] = "hinge";
  AnimationName["RollIn"] = "rollIn";
  AnimationName["RollOut"] = "rollOut";
  AnimationName["ZoomIn"] = "zoomIn";
  AnimationName["ZoomInDown"] = "zoomInDown";
  AnimationName["ZoomInLeft"] = "zoomInLeft";
  AnimationName["ZoomInRight"] = "zoomInRight";
  AnimationName["ZoomInUp"] = "zoomInUp";
  AnimationName["ZoomOut"] = "zoomOut";
  AnimationName["ZoomOutDown"] = "zoomOutDown";
  AnimationName["ZoomOutLeft"] = "zoomOutLeft";
  AnimationName["ZoomOutRight"] = "zoomOutRight";
  AnimationName["ZoomOutUp"] = "zoomOutUp";
  AnimationName["SlideInDown"] = "slideInDown";
  AnimationName["SlideInLeft"] = "slideInLeft";
  AnimationName["SlideInRight"] = "slideInRight";
  AnimationName["SlideInUp"] = "slideInUp";
  AnimationName["SlideOutDown"] = "slideOutDown";
  AnimationName["SlideOutLeft"] = "slideOutLeft";
  AnimationName["SlideOutRight"] = "slideOutRight";
  AnimationName["SlideOutUp"] = "slideOutUp";
  AnimationName["CustomPlusToMinus"] = "customPlusToMinus";
  AnimationName["CustomMinusToPlus"] = "customMinusToPlus";
})(AnimationName = exports.AnimationName || (exports.AnimationName = {}));

var AnimationRepeat;

(function (AnimationRepeat) {
  AnimationRepeat["Infinite"] = "infinite";
  AnimationRepeat["RepeatOnce"] = "repeat-1";
  AnimationRepeat["RepeatTwice"] = "repeat-2";
  AnimationRepeat["RepeatThrice"] = "repeat-3";
})(AnimationRepeat = exports.AnimationRepeat || (exports.AnimationRepeat = {}));

var AnimationDelay;

(function (AnimationDelay) {
  AnimationDelay["OneSecond"] = "delay-1s";
  AnimationDelay["TwoSeconds"] = "delay-2s";
  AnimationDelay["ThreeSeconds"] = "delay-3s";
  AnimationDelay["FourSeconds"] = "delay-4s";
  AnimationDelay["FiveSeconds"] = "delay-5s";
})(AnimationDelay = exports.AnimationDelay || (exports.AnimationDelay = {}));

var AnimationDuration;

(function (AnimationDuration) {
  AnimationDuration["Slow"] = "slow";
  AnimationDuration["Slower"] = "slower";
  AnimationDuration["Fast"] = "fast";
  AnimationDuration["Faster"] = "faster";
})(AnimationDuration = exports.AnimationDuration || (exports.AnimationDuration = {}));

var Animation =
/** @class */
function () {
  function Animation(name, repeat, delay, duration, callback) {
    this.name = name;
    this.repeat = repeat;
    this.delay = delay;
    this.duration = duration;
    this.callback = callback;
  }

  return Animation;
}();

exports.Animation = Animation;

function animateElement(el, animation) {
  var _a;

  var prefix = 'animate__';
  var animationName = "".concat(prefix).concat(animation.name);
  var animationClasses = ["".concat(prefix, "animated"), animationName];

  if (animation.repeat) {
    animationClasses.push("".concat(prefix).concat(animation.repeat));
  }

  if (animation.delay) {
    animationClasses.push("".concat(prefix).concat(animation.delay));
  }

  if (animation.duration) {
    animationClasses.push("".concat(prefix).concat(animation.duration));
  }

  (_a = el.classList).add.apply(_a, animationClasses);

  function handleAnimationEnd(event) {
    var _a;

    event.stopPropagation();

    (_a = el.classList).remove.apply(_a, animationClasses);

    if (animation.callback) {
      animation.callback();
    }
  }

  el.addEventListener('animationend', handleAnimationEnd, {
    once: true
  });
}

exports.animateElement = animateElement;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJleHBvcnRzIiwiX19lc01vZHVsZSIsImFuaW1hdGVFbGVtZW50IiwiQW5pbWF0aW9uIiwiQW5pbWF0aW9uRHVyYXRpb24iLCJBbmltYXRpb25EZWxheSIsIkFuaW1hdGlvblJlcGVhdCIsIkFuaW1hdGlvbk5hbWUiLCJuYW1lIiwicmVwZWF0IiwiZGVsYXkiLCJkdXJhdGlvbiIsImNhbGxiYWNrIiwiZWwiLCJhbmltYXRpb24iLCJfYSIsInByZWZpeCIsImFuaW1hdGlvbk5hbWUiLCJjb25jYXQiLCJhbmltYXRpb25DbGFzc2VzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGx5IiwiaGFuZGxlQW5pbWF0aW9uRW5kIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwib25jZSJdLCJzb3VyY2VzIjpbImFuaW1hdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5hbmltYXRlRWxlbWVudCA9IGV4cG9ydHMuQW5pbWF0aW9uID0gZXhwb3J0cy5BbmltYXRpb25EdXJhdGlvbiA9IGV4cG9ydHMuQW5pbWF0aW9uRGVsYXkgPSBleHBvcnRzLkFuaW1hdGlvblJlcGVhdCA9IGV4cG9ydHMuQW5pbWF0aW9uTmFtZSA9IHZvaWQgMDtcbnZhciBBbmltYXRpb25OYW1lO1xuKGZ1bmN0aW9uIChBbmltYXRpb25OYW1lKSB7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZVwiXSA9IFwiYm91bmNlXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZsYXNoXCJdID0gXCJmbGFzaFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJSdWJiZXJCYW5kXCJdID0gXCJydWJiZXJCYW5kXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlB1bHNlXCJdID0gXCJwdWxzZVwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTaGFrZVwiXSA9IFwic2hha2VcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiU3dpbmdcIl0gPSBcInN3aW5nXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlRhZGFcIl0gPSBcInRhZGFcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiV29iYmxlXCJdID0gXCJ3b2JibGVcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiQm91bmNlSW5cIl0gPSBcImJvdW5jZUluXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZUluRG93blwiXSA9IFwiYm91bmNlSW5Eb3duXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZUluTGVmdFwiXSA9IFwiYm91bmNlSW5MZWZ0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZUluUmlnaHRcIl0gPSBcImJvdW5jZUluUmlnaHRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiQm91bmNlSW5VcFwiXSA9IFwiYm91bmNlSW5VcFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJCb3VuY2VPdXRcIl0gPSBcImJvdW5jZU91dFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJCb3VuY2VPdXREb3duXCJdID0gXCJib3VuY2VPdXREb3duXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZU91dExlZnRcIl0gPSBcImJvdW5jZU91dExlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiQm91bmNlT3V0UmlnaHRcIl0gPSBcImJvdW5jZU91dFJpZ2h0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkJvdW5jZU91dFVwXCJdID0gXCJib3VuY2VPdXRVcFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlSW5cIl0gPSBcImZhZGVJblwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlSW5Eb3duXCJdID0gXCJmYWRlSW5Eb3duXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZhZGVJbkRvd25CaWdcIl0gPSBcImZhZGVJbkRvd25CaWdcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiRmFkZUluTGVmdFwiXSA9IFwiZmFkZUluTGVmdFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlSW5MZWZ0QmlnXCJdID0gXCJmYWRlSW5MZWZ0QmlnXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZhZGVJblJpZ2h0XCJdID0gXCJmYWRlSW5SaWdodFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlSW5SaWdodEJpZ1wiXSA9IFwiZmFkZUluUmlnaHRCaWdcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiRmFkZUluVXBcIl0gPSBcImZhZGVJblVwXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZhZGVJblVwQmlnXCJdID0gXCJmYWRlSW5VcEJpZ1wiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0XCJdID0gXCJmYWRlT3V0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZhZGVPdXREb3duXCJdID0gXCJmYWRlT3V0RG93blwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0RG93bkJpZ1wiXSA9IFwiZmFkZU91dERvd25CaWdcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiRmFkZU91dExlZnRcIl0gPSBcImZhZGVPdXRMZWZ0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZhZGVPdXRMZWZ0QmlnXCJdID0gXCJmYWRlT3V0TGVmdEJpZ1wiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0UmlnaHRcIl0gPSBcImZhZGVPdXRSaWdodFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0UmlnaHRCaWdcIl0gPSBcImZhZGVPdXRSaWdodEJpZ1wiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0VXBcIl0gPSBcImZhZGVPdXRVcFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGYWRlT3V0VXBCaWdcIl0gPSBcImZhZGVPdXRVcEJpZ1wiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGbGlwXCJdID0gXCJmbGlwXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkZsaXBJblhcIl0gPSBcImZsaXBJblhcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiRmxpcEluWVwiXSA9IFwiZmxpcEluWVwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJGbGlwT3V0WFwiXSA9IFwiZmxpcE91dFhcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiRmxpcE91dFlcIl0gPSBcImZsaXBPdXRZXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkxpZ2h0U3BlZWRJblwiXSA9IFwibGlnaHRTcGVlZEluXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkxpZ2h0U3BlZWRPdXRcIl0gPSBcImxpZ2h0U3BlZWRPdXRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm90YXRlSW5cIl0gPSBcInJvdGF0ZUluXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlJvdGF0ZUluRG93bkxlZnRcIl0gPSBcInJvdGF0ZUluRG93bkxlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm90YXRlSW5Eb3duUmlnaHRcIl0gPSBcInJvdGF0ZUluRG93blJpZ2h0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlJvdGF0ZUluVXBMZWZ0XCJdID0gXCJyb3RhdGVJblVwTGVmdFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJSb3RhdGVJblVwUmlnaHRcIl0gPSBcInJvdGF0ZUluVXBSaWdodFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJSb3RhdGVPdXRcIl0gPSBcInJvdGF0ZU91dFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJSb3RhdGVPdXREb3duTGVmdFwiXSA9IFwicm90YXRlT3V0RG93bkxlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm90YXRlT3V0RG93blJpZ2h0XCJdID0gXCJyb3RhdGVPdXREb3duUmlnaHRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm90YXRlT3V0VXBMZWZ0XCJdID0gXCJyb3RhdGVPdXRVcExlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm90YXRlT3V0VXBSaWdodFwiXSA9IFwicm90YXRlT3V0VXBSaWdodFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJIaW5nZVwiXSA9IFwiaGluZ2VcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm9sbEluXCJdID0gXCJyb2xsSW5cIjtcbiAgICBBbmltYXRpb25OYW1lW1wiUm9sbE91dFwiXSA9IFwicm9sbE91dFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJab29tSW5cIl0gPSBcInpvb21JblwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJab29tSW5Eb3duXCJdID0gXCJ6b29tSW5Eb3duXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlpvb21JbkxlZnRcIl0gPSBcInpvb21JbkxlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiWm9vbUluUmlnaHRcIl0gPSBcInpvb21JblJpZ2h0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlpvb21JblVwXCJdID0gXCJ6b29tSW5VcFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJab29tT3V0XCJdID0gXCJ6b29tT3V0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlpvb21PdXREb3duXCJdID0gXCJ6b29tT3V0RG93blwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJab29tT3V0TGVmdFwiXSA9IFwiem9vbU91dExlZnRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiWm9vbU91dFJpZ2h0XCJdID0gXCJ6b29tT3V0UmlnaHRcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiWm9vbU91dFVwXCJdID0gXCJ6b29tT3V0VXBcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiU2xpZGVJbkRvd25cIl0gPSBcInNsaWRlSW5Eb3duXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlNsaWRlSW5MZWZ0XCJdID0gXCJzbGlkZUluTGVmdFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTbGlkZUluUmlnaHRcIl0gPSBcInNsaWRlSW5SaWdodFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTbGlkZUluVXBcIl0gPSBcInNsaWRlSW5VcFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTbGlkZU91dERvd25cIl0gPSBcInNsaWRlT3V0RG93blwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTbGlkZU91dExlZnRcIl0gPSBcInNsaWRlT3V0TGVmdFwiO1xuICAgIEFuaW1hdGlvbk5hbWVbXCJTbGlkZU91dFJpZ2h0XCJdID0gXCJzbGlkZU91dFJpZ2h0XCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIlNsaWRlT3V0VXBcIl0gPSBcInNsaWRlT3V0VXBcIjtcbiAgICBBbmltYXRpb25OYW1lW1wiQ3VzdG9tUGx1c1RvTWludXNcIl0gPSBcImN1c3RvbVBsdXNUb01pbnVzXCI7XG4gICAgQW5pbWF0aW9uTmFtZVtcIkN1c3RvbU1pbnVzVG9QbHVzXCJdID0gXCJjdXN0b21NaW51c1RvUGx1c1wiO1xufSkoQW5pbWF0aW9uTmFtZSA9IGV4cG9ydHMuQW5pbWF0aW9uTmFtZSB8fCAoZXhwb3J0cy5BbmltYXRpb25OYW1lID0ge30pKTtcbnZhciBBbmltYXRpb25SZXBlYXQ7XG4oZnVuY3Rpb24gKEFuaW1hdGlvblJlcGVhdCkge1xuICAgIEFuaW1hdGlvblJlcGVhdFtcIkluZmluaXRlXCJdID0gXCJpbmZpbml0ZVwiO1xuICAgIEFuaW1hdGlvblJlcGVhdFtcIlJlcGVhdE9uY2VcIl0gPSBcInJlcGVhdC0xXCI7XG4gICAgQW5pbWF0aW9uUmVwZWF0W1wiUmVwZWF0VHdpY2VcIl0gPSBcInJlcGVhdC0yXCI7XG4gICAgQW5pbWF0aW9uUmVwZWF0W1wiUmVwZWF0VGhyaWNlXCJdID0gXCJyZXBlYXQtM1wiO1xufSkoQW5pbWF0aW9uUmVwZWF0ID0gZXhwb3J0cy5BbmltYXRpb25SZXBlYXQgfHwgKGV4cG9ydHMuQW5pbWF0aW9uUmVwZWF0ID0ge30pKTtcbnZhciBBbmltYXRpb25EZWxheTtcbihmdW5jdGlvbiAoQW5pbWF0aW9uRGVsYXkpIHtcbiAgICBBbmltYXRpb25EZWxheVtcIk9uZVNlY29uZFwiXSA9IFwiZGVsYXktMXNcIjtcbiAgICBBbmltYXRpb25EZWxheVtcIlR3b1NlY29uZHNcIl0gPSBcImRlbGF5LTJzXCI7XG4gICAgQW5pbWF0aW9uRGVsYXlbXCJUaHJlZVNlY29uZHNcIl0gPSBcImRlbGF5LTNzXCI7XG4gICAgQW5pbWF0aW9uRGVsYXlbXCJGb3VyU2Vjb25kc1wiXSA9IFwiZGVsYXktNHNcIjtcbiAgICBBbmltYXRpb25EZWxheVtcIkZpdmVTZWNvbmRzXCJdID0gXCJkZWxheS01c1wiO1xufSkoQW5pbWF0aW9uRGVsYXkgPSBleHBvcnRzLkFuaW1hdGlvbkRlbGF5IHx8IChleHBvcnRzLkFuaW1hdGlvbkRlbGF5ID0ge30pKTtcbnZhciBBbmltYXRpb25EdXJhdGlvbjtcbihmdW5jdGlvbiAoQW5pbWF0aW9uRHVyYXRpb24pIHtcbiAgICBBbmltYXRpb25EdXJhdGlvbltcIlNsb3dcIl0gPSBcInNsb3dcIjtcbiAgICBBbmltYXRpb25EdXJhdGlvbltcIlNsb3dlclwiXSA9IFwic2xvd2VyXCI7XG4gICAgQW5pbWF0aW9uRHVyYXRpb25bXCJGYXN0XCJdID0gXCJmYXN0XCI7XG4gICAgQW5pbWF0aW9uRHVyYXRpb25bXCJGYXN0ZXJcIl0gPSBcImZhc3RlclwiO1xufSkoQW5pbWF0aW9uRHVyYXRpb24gPSBleHBvcnRzLkFuaW1hdGlvbkR1cmF0aW9uIHx8IChleHBvcnRzLkFuaW1hdGlvbkR1cmF0aW9uID0ge30pKTtcbnZhciBBbmltYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uKG5hbWUsIHJlcGVhdCwgZGVsYXksIGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcbiAgICAgICAgdGhpcy5kZWxheSA9IGRlbGF5O1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG4gICAgcmV0dXJuIEFuaW1hdGlvbjtcbn0oKSk7XG5leHBvcnRzLkFuaW1hdGlvbiA9IEFuaW1hdGlvbjtcbmZ1bmN0aW9uIGFuaW1hdGVFbGVtZW50KGVsLCBhbmltYXRpb24pIHtcbiAgICB2YXIgX2E7XG4gICAgdmFyIHByZWZpeCA9ICdhbmltYXRlX18nO1xuICAgIHZhciBhbmltYXRpb25OYW1lID0gXCJcIi5jb25jYXQocHJlZml4KS5jb25jYXQoYW5pbWF0aW9uLm5hbWUpO1xuICAgIHZhciBhbmltYXRpb25DbGFzc2VzID0gW1wiXCIuY29uY2F0KHByZWZpeCwgXCJhbmltYXRlZFwiKSwgYW5pbWF0aW9uTmFtZV07XG4gICAgaWYgKGFuaW1hdGlvbi5yZXBlYXQpIHtcbiAgICAgICAgYW5pbWF0aW9uQ2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KGFuaW1hdGlvbi5yZXBlYXQpKTtcbiAgICB9XG4gICAgaWYgKGFuaW1hdGlvbi5kZWxheSkge1xuICAgICAgICBhbmltYXRpb25DbGFzc2VzLnB1c2goXCJcIi5jb25jYXQocHJlZml4KS5jb25jYXQoYW5pbWF0aW9uLmRlbGF5KSk7XG4gICAgfVxuICAgIGlmIChhbmltYXRpb24uZHVyYXRpb24pIHtcbiAgICAgICAgYW5pbWF0aW9uQ2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KHByZWZpeCkuY29uY2F0KGFuaW1hdGlvbi5kdXJhdGlvbikpO1xuICAgIH1cbiAgICAoX2EgPSBlbC5jbGFzc0xpc3QpLmFkZC5hcHBseShfYSwgYW5pbWF0aW9uQ2xhc3Nlcyk7XG4gICAgZnVuY3Rpb24gaGFuZGxlQW5pbWF0aW9uRW5kKGV2ZW50KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIChfYSA9IGVsLmNsYXNzTGlzdCkucmVtb3ZlLmFwcGx5KF9hLCBhbmltYXRpb25DbGFzc2VzKTtcbiAgICAgICAgaWYgKGFuaW1hdGlvbi5jYWxsYmFjaykge1xuICAgICAgICAgICAgYW5pbWF0aW9uLmNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgaGFuZGxlQW5pbWF0aW9uRW5kLCB7IG9uY2U6IHRydWUgfSk7XG59XG5leHBvcnRzLmFuaW1hdGVFbGVtZW50ID0gYW5pbWF0ZUVsZW1lbnQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBQSxPQUFPLENBQUNDLFVBQVIsR0FBcUIsSUFBckI7QUFDQUQsT0FBTyxDQUFDRSxjQUFSLEdBQXlCRixPQUFPLENBQUNHLFNBQVIsR0FBb0JILE9BQU8sQ0FBQ0ksaUJBQVIsR0FBNEJKLE9BQU8sQ0FBQ0ssY0FBUixHQUF5QkwsT0FBTyxDQUFDTSxlQUFSLEdBQTBCTixPQUFPLENBQUNPLGFBQVIsR0FBd0IsS0FBSyxDQUF6SjtBQUNBLElBQUlBLGFBQUo7O0FBQ0EsQ0FBQyxVQUFVQSxhQUFWLEVBQXlCO0VBQ3RCQSxhQUFhLENBQUMsUUFBRCxDQUFiLEdBQTBCLFFBQTFCO0VBQ0FBLGFBQWEsQ0FBQyxPQUFELENBQWIsR0FBeUIsT0FBekI7RUFDQUEsYUFBYSxDQUFDLFlBQUQsQ0FBYixHQUE4QixZQUE5QjtFQUNBQSxhQUFhLENBQUMsT0FBRCxDQUFiLEdBQXlCLE9BQXpCO0VBQ0FBLGFBQWEsQ0FBQyxPQUFELENBQWIsR0FBeUIsT0FBekI7RUFDQUEsYUFBYSxDQUFDLE9BQUQsQ0FBYixHQUF5QixPQUF6QjtFQUNBQSxhQUFhLENBQUMsTUFBRCxDQUFiLEdBQXdCLE1BQXhCO0VBQ0FBLGFBQWEsQ0FBQyxRQUFELENBQWIsR0FBMEIsUUFBMUI7RUFDQUEsYUFBYSxDQUFDLFVBQUQsQ0FBYixHQUE0QixVQUE1QjtFQUNBQSxhQUFhLENBQUMsY0FBRCxDQUFiLEdBQWdDLGNBQWhDO0VBQ0FBLGFBQWEsQ0FBQyxjQUFELENBQWIsR0FBZ0MsY0FBaEM7RUFDQUEsYUFBYSxDQUFDLGVBQUQsQ0FBYixHQUFpQyxlQUFqQztFQUNBQSxhQUFhLENBQUMsWUFBRCxDQUFiLEdBQThCLFlBQTlCO0VBQ0FBLGFBQWEsQ0FBQyxXQUFELENBQWIsR0FBNkIsV0FBN0I7RUFDQUEsYUFBYSxDQUFDLGVBQUQsQ0FBYixH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
},{}]},{},[1])