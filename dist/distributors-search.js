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

var umlautMap = {
  "\xDC": 'UE',
  "\xC4": 'AE',
  "\xD6": 'OE',
  "\xFC": 'ue',
  "\xE4": 'ae',
  "\xF6": 'oe',
  "\xDF": 'ss'
};

function replaceUmlaute(str) {
  return str.replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, function (a) {
    var big = umlautMap[a.slice(0, 1)];
    return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
  }).replace(new RegExp('[' + Object.keys(umlautMap).join('|') + ']', "g"), function (a) {
    return umlautMap[a];
  });
}

vendorContainers = tempContainer.getElementsByClassName('vendor-content-container');
var vendorArray = Array.from(vendorContainers).sort(function (a, b) {
  var countryA = replaceUmlaute(a.getElementsByClassName("content-field-country")[0].innerText);
  var countryB = replaceUmlaute(b.getElementsByClassName("content-field-country")[0].innerText);
  var regionA = replaceUmlaute(a.getElementsByClassName("content-field-region")[0].innerText);
  var regionB = replaceUmlaute(b.getElementsByClassName("content-field-region")[0].innerText);

  if (countryA !== countryB) {
    return countryA < countryB ? -1 : 1;
  }

  if (regionA !== regionB) {
    return regionA < regionB ? -1 : 1;
  }

  return 0;
});

while (vendorArray.length > 0) {
  var element = vendorArray.shift();

  if (!element) {
    throw new Error('distributor-search: element is undefined');
  }

  (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYSIsIl9iIiwiX2MiLCJfZCIsImV4cG9ydHMiLCJfX2VzTW9kdWxlIiwiYW5pbWF0ZV8xIiwicmVxdWlyZSIsInBzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIkFycmF5IiwiZnJvbSIsImZvckVhY2giLCJwIiwiaW5uZXJUZXh0IiwicmVwbGFjZSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImRyb3Bkb3duQlROcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkcm9wZG93bkNvbnRlbnRzIiwiZHJvcGRvd25CVE4iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbkNsaWNrIiwiZHJvcGRvd25Db250ZW50Iiwib25Gb2N1c291dCIsInRhcmdldCIsImNvbnNvbGUiLCJlcnJvciIsInBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJ2ZW5kb3JMaXN0Q29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwiZm9jdXMiLCJyZW1vdmUiLCJzZXRFbnRyaWVzIiwiZHJvcGRvd24iLCJuZXdFbnRyaWVzIiwiZW50cmllcyIsImxlbmd0aCIsImR1cCIsImNsb25lTm9kZSIsImFwcGVuZENoaWxkIiwiX2xvb3BfMSIsImkiLCJlbGVtZW50IiwibGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25TZWxlY3QiLCJzZXRWYWx1ZSIsInZhbHVlIiwic2V0QXR0cmlidXRlIiwic2V0RGlzYWJsZWQiLCJidG4iLCJTdHJpbmciLCJvbmNoYW5nZSIsInZlbmRvcnMiLCJtYXJrZXRzIiwiY291bnRyaWVzIiwicmVnaW9ucyIsInZlbmRvckNvbnRhaW5lcnMiLCJ2ZW5kb3JDb250YWluZXIiLCJtYXJrZXQiLCJjb3VudHJ5IiwicmVnaW9uIiwibWFya2V0Q2xhc3MiLCJjb3VudHJ5Q2xhc3MiLCJyZWdpb25DbGFzcyIsInB1c2giLCJzdHlsZSIsImRpc3BsYXkiLCJfaSIsInZlbmRvcnNfMSIsInZlbmRvciIsImluY2x1ZGVzIiwidmVuZG9yQ29udGVudHMiLCJ2ZW5kb3JDb250ZW50IiwidmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzIiwidmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzUGFyZW50IiwidGVtcENvbnRhaW5lciIsImdldEVsZW1lbnRCeUlkIiwiRXJyb3IiLCJ1bWxhdXRNYXAiLCJyZXBsYWNlVW1sYXV0ZSIsInN0ciIsImEiLCJiaWciLCJzbGljZSIsImNoYXJBdCIsInRvTG93ZXJDYXNlIiwiUmVnRXhwIiwiT2JqZWN0Iiwia2V5cyIsImpvaW4iLCJ2ZW5kb3JBcnJheSIsInNvcnQiLCJiIiwiY291bnRyeUEiLCJjb3VudHJ5QiIsInJlZ2lvbkEiLCJyZWdpb25CIiwic2hpZnQiLCJoZWFkZXIiLCJ0b1VwcGVyQ2FzZSIsImFwcGVuZCIsIm1hcmtldFNlbGVjdCIsImNvdW50cnlTZWxlY3QiLCJyZWdpb25TZWxlY3QiLCJtYXJrZXRTZWxlY3REZWZhdWx0IiwiY291bnRyeVNlbGVjdERlZmF1bHQiLCJyZWdpb25TZWxlY3REZWZhdWx0IiwiX2UiLCJ2ZW5kb3JzXzIiLCJ2ZW5kb3JzXzMiLCIkIiwiY29sbGVjdGlvbiIsIm1peGVyIiwiZmlsdGVyIiwidmVuZG9yc180Iiwic2VhcmNoIiwiY29udGFpbmVyIiwibWl4aXR1cCIsImFuaW1hdGlvbiIsImR1cmF0aW9uIiwib25Ub2dnbGUiLCJhY3RpdmVBbmltYXRpb25zIiwibG9nIiwiY29udGVudENvbnRhaW5lcnMiLCJtaW51cyIsInRvZ2dsZWQiLCJhbmltYXRlRWxlbWVudCIsIkFuaW1hdGlvbiIsIkFuaW1hdGlvbk5hbWUiLCJDdXN0b21QbHVzVG9NaW51cyIsInVuZGVmaW5lZCIsIkFuaW1hdGlvbkR1cmF0aW9uIiwiRmFzdGVyIiwiY29udGVudENvbnRhaW5lciIsIkZhZGVJbiIsIkN1c3RvbU1pbnVzVG9QbHVzIiwiRmFkZU91dCIsInZlbmRvckNhdGVnb3JpZXMiLCJ2ZW5kb3JDYXRlZ29yeSJdLCJzb3VyY2VzIjpbImZha2VfYjQzNzc0MTAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX2EsIF9iLCBfYywgX2Q7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIGFuaW1hdGVfMSA9IHJlcXVpcmUoXCIuL3NoYXJlZC9hbmltYXRlXCIpO1xuLy9kZWxldGUgYWxsIGVtcHR5IDxwPnNcbnZhciBwcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicFwiKTtcbkFycmF5LmZyb20ocHMpLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICBpZiAocC5pbm5lclRleHQucmVwbGFjZSgvW15cXHdcXHNdL2dpLCAnJykgIT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHAucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwKTtcbiAgICB9XG59KTtcbnZhciBkcm9wZG93bkJUTnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd24tYnRuXCIpO1xudmFyIGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtY29udGFpbmVyXCIpO1xuQXJyYXkuZnJvbShkcm9wZG93bkJUTnMpLmZvckVhY2goZnVuY3Rpb24gKGRyb3Bkb3duQlROKSB7XG4gICAgZHJvcGRvd25CVE4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gb25DbGljayhldmVudCk7IH0pO1xufSk7XG5BcnJheS5mcm9tKGRyb3Bkb3duQ29udGVudHMpLmZvckVhY2goZnVuY3Rpb24gKGRyb3Bkb3duQ29udGVudCkge1xuICAgIGRyb3Bkb3duQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBvbkZvY3Vzb3V0KGV2ZW50KTsgfSk7XG59KTtcbmZ1bmN0aW9uIG9uQ2xpY2soZXZlbnQpIHtcbiAgICBpZiAoIWV2ZW50LnRhcmdldCkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdvbkNsaWNrOiBldmVudCB0YXJnZXQgaXMgbWlzc2luZycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcbiAgICBpZiAoKHBhcmVudCA9PT0gbnVsbCB8fCBwYXJlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBhcmVudC5nZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKSkgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHZlbmRvckxpc3RDb250YWluZXIgPSBwYXJlbnQgPT09IG51bGwgfHwgcGFyZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWNvbnRhaW5lclwiKVswXTtcbiAgICBpZiAoIXZlbmRvckxpc3RDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2ZW5kb3JMaXN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xuICAgIHZlbmRvckxpc3RDb250YWluZXIuZm9jdXMoKTtcbn1cbmZ1bmN0aW9uIG9uRm9jdXNvdXQoZXZlbnQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uRm9jdXNvdXQ6IGV2ZW50IHRhcmdldCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHBhcmVudCA9IHRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgIGlmICghcGFyZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uRm9jdXNvdXQ6IHBhcmVudCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2ZW5kb3ItbGlzdC1jb250YWluZXJcIilbMF0uY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG59XG5mdW5jdGlvbiBzZXRFbnRyaWVzKGRyb3Bkb3duLCBuZXdFbnRyaWVzKSB7XG4gICAgdmFyIGRyb3Bkb3duQ29udGVudCA9IGRyb3Bkb3duLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2ZW5kb3ItbGlzdC1jb250YWluZXJcIilbMF07XG4gICAgdmFyIGVudHJpZXMgPSBkcm9wZG93bkNvbnRlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWl0ZW1cIik7XG4gICAgd2hpbGUgKGVudHJpZXMubGVuZ3RoIDwgbmV3RW50cmllcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGR1cCA9IGVudHJpZXNbMF0uY2xvbmVOb2RlKGZhbHNlKTtcbiAgICAgICAgZHJvcGRvd25Db250ZW50LmFwcGVuZENoaWxkKGR1cCk7XG4gICAgICAgIGVudHJpZXMgPSBkcm9wZG93bkNvbnRlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWl0ZW1cIik7XG4gICAgfVxuICAgIHdoaWxlIChlbnRyaWVzLmxlbmd0aCA+IG5ld0VudHJpZXMubGVuZ3RoKSB7XG4gICAgICAgIGVudHJpZXNbMF0ucmVtb3ZlKCk7XG4gICAgICAgIGVudHJpZXMgPSBkcm9wZG93bkNvbnRlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInZlbmRvci1saXN0LWl0ZW1cIik7XG4gICAgfVxuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBlbnRyaWVzW2ldO1xuICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IG5ld0VudHJpZXNbaV07XG4gICAgICAgIGlmIChlbGVtZW50Lmxpc3RlbmVyKSB7XG4gICAgICAgICAgICBlbnRyaWVzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbGVtZW50Lmxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50Lmxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7IHJldHVybiBvblNlbGVjdChldmVudCwgbmV3RW50cmllc1tpXSk7IH07XG4gICAgICAgIGVudHJpZXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVsZW1lbnQubGlzdGVuZXIpO1xuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9sb29wXzEoaSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0VmFsdWUoZHJvcGRvd24sIHZhbHVlKSB7XG4gICAgZHJvcGRvd24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgdmFsdWUpO1xuICAgIGRyb3Bkb3duLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJidG4tdGV4dFwiKVswXS5pbm5lclRleHQgPSB2YWx1ZTtcbiAgICBkcm9wZG93bi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmVuZG9yLWxpc3QtY29udGFpbmVyXCIpWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xufVxuZnVuY3Rpb24gc2V0RGlzYWJsZWQoZHJvcGRvd24sIHZhbHVlKSB7XG4gICAgdmFyIGJ0biA9IGRyb3Bkb3duLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bi1idG5cIilbMF07XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xuICAgIH1cbiAgICBkcm9wZG93bi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBTdHJpbmcodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIG9uU2VsZWN0KGV2ZW50LCB2YWx1ZSkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ29uU2VsZWN0OiB0YXJnZXQgaXMgbWlzc2luZycpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwYXJlbnQgPSAoX2EgPSB0YXJnZXQucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcmVudE5vZGU7XG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25TZWxlY3Q6IHBhcmVudCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2V0VmFsdWUocGFyZW50LCB2YWx1ZSk7XG4gICAgcGFyZW50Lm9uY2hhbmdlKCk7XG59XG52YXIgdmVuZG9ycyA9IFtdO1xudmFyIG1hcmtldHMgPSBbXTtcbnZhciBjb3VudHJpZXMgPSBbXTtcbnZhciByZWdpb25zID0gW107XG52YXIgdmVuZG9yQ29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50LWNvbnRhaW5lcicpO1xuQXJyYXkuZnJvbSh2ZW5kb3JDb250YWluZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh2ZW5kb3JDb250YWluZXIpIHtcbiAgICB2YXIgbWFya2V0ID0gdmVuZG9yQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50LWZpZWxkLW1hcmtldFwiKVswXTtcbiAgICB2YXIgY291bnRyeSA9IHZlbmRvckNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1jb3VudHJ5XCIpWzBdO1xuICAgIHZhciByZWdpb24gPSB2ZW5kb3JDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnQtZmllbGQtcmVnaW9uXCIpWzBdO1xuICAgIHZhciBtYXJrZXRDbGFzcyA9IG1hcmtldC5pbm5lclRleHQucmVwbGFjZSgvIC9nLCAnJykucmVwbGFjZSgvJi9nLCAnLScpO1xuICAgIHZhciBjb3VudHJ5Q2xhc3MgPSBjb3VudHJ5LmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgdmFyIHJlZ2lvbkNsYXNzID0gcmVnaW9uLmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgaWYgKHJlZ2lvbkNsYXNzICE9PSBcIlwiKSB7XG4gICAgICAgIHZlbmRvckNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicmVnaW9uLWhlYWRlclwiKVswXS5pbm5lclRleHQgPSByZWdpb24uaW5uZXJUZXh0O1xuICAgICAgICB2ZW5kb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1peFwiKTtcbiAgICAgICAgdmVuZG9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQobWFya2V0Q2xhc3MpO1xuICAgICAgICB2ZW5kb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZChjb3VudHJ5Q2xhc3MpO1xuICAgICAgICB2ZW5kb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZChyZWdpb25DbGFzcyk7XG4gICAgfVxuICAgIHZlbmRvcnMucHVzaCh7XG4gICAgICAgIG1hcmtldDogbWFya2V0LmlubmVyVGV4dCxcbiAgICAgICAgY291bnRyeTogY291bnRyeS5pbm5lclRleHQsXG4gICAgICAgIHJlZ2lvbjogcmVnaW9uLmlubmVyVGV4dFxuICAgIH0pO1xuICAgIG1hcmtldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGNvdW50cnkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICByZWdpb24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuZm9yICh2YXIgX2kgPSAwLCB2ZW5kb3JzXzEgPSB2ZW5kb3JzOyBfaSA8IHZlbmRvcnNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICB2YXIgdmVuZG9yID0gdmVuZG9yc18xW19pXTtcbiAgICBpZiAoIWNvdW50cmllcy5pbmNsdWRlcyh2ZW5kb3IuY291bnRyeSkpIHtcbiAgICAgICAgY291bnRyaWVzLnB1c2godmVuZG9yLmNvdW50cnkpO1xuICAgIH1cbn1cbnZhciB2ZW5kb3JDb250ZW50cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50Jyk7XG5BcnJheS5mcm9tKHZlbmRvckNvbnRlbnRzKS5mb3JFYWNoKGZ1bmN0aW9uICh2ZW5kb3JDb250ZW50KSB7XG4gICAgaWYgKHZlbmRvckNvbnRlbnQuaW5uZXJUZXh0ID09PSBcIlwiKSB7XG4gICAgICAgIGlmICghdmVuZG9yQ29udGVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdhbm9ueW1vdXM6IHZlbmRvckNvbnRlbnQgcGFyZW50IGlzIG1pc3NpbmcnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2ZW5kb3JDb250ZW50LnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG59KTtcbnZhciB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyJyk7XG52ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbMF0uY2xhc3NMaXN0LmFkZChcIm1peFwiKTtcbnZhciB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNQYXJlbnQgPSB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbMF0ucGFyZW50RWxlbWVudDtcbndoaWxlICh2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMubGVuZ3RoIDwgY291bnRyaWVzLmxlbmd0aCkge1xuICAgIGlmICghdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzUGFyZW50KSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Rpc3RyaWJ1dG9yLXNlYXJjaDogdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzIHBhcmVudCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNQYXJlbnQuYXBwZW5kQ2hpbGQodmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzWzBdLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lcicpO1xufVxuZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2F0ZWdvcnktbmFtZS1jb250YWluZXInKVswXS5pbm5lclRleHQgPSBjb3VudHJpZXNbaV07XG59XG52YXIgdGVtcENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wJyk7XG5pZiAoIXRlbXBDb250YWluZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rpc3RyaWJ1dG9yLXNlYXJjaDogdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzIHBhcmVudCBpcyBtaXNzaW5nJyk7XG59XG52YXIgdW1sYXV0TWFwID0ge1xuICAgICdcXHUwMGRjJzogJ1VFJyxcbiAgICAnXFx1MDBjNCc6ICdBRScsXG4gICAgJ1xcdTAwZDYnOiAnT0UnLFxuICAgICdcXHUwMGZjJzogJ3VlJyxcbiAgICAnXFx1MDBlNCc6ICdhZScsXG4gICAgJ1xcdTAwZjYnOiAnb2UnLFxuICAgICdcXHUwMGRmJzogJ3NzJ1xufTtcbmZ1bmN0aW9uIHJlcGxhY2VVbWxhdXRlKHN0cikge1xuICAgIHJldHVybiBzdHJcbiAgICAgICAgLnJlcGxhY2UoL1tcXHUwMGRjfFxcdTAwYzR8XFx1MDBkNl1bYS16XS9nLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYmlnID0gdW1sYXV0TWFwW2Euc2xpY2UoMCwgMSldO1xuICAgICAgICByZXR1cm4gYmlnLmNoYXJBdCgwKSArIGJpZy5jaGFyQXQoMSkudG9Mb3dlckNhc2UoKSArIGEuc2xpY2UoMSk7XG4gICAgfSlcbiAgICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnWycgKyBPYmplY3Qua2V5cyh1bWxhdXRNYXApLmpvaW4oJ3wnKSArICddJywgXCJnXCIpLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gdW1sYXV0TWFwW2FdOyB9KTtcbn1cbnZlbmRvckNvbnRhaW5lcnMgPSB0ZW1wQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50LWNvbnRhaW5lcicpO1xudmFyIHZlbmRvckFycmF5ID0gQXJyYXkuZnJvbSh2ZW5kb3JDb250YWluZXJzKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgdmFyIGNvdW50cnlBID0gcmVwbGFjZVVtbGF1dGUoYS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1jb3VudHJ5XCIpWzBdLmlubmVyVGV4dCk7XG4gICAgdmFyIGNvdW50cnlCID0gcmVwbGFjZVVtbGF1dGUoYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1jb3VudHJ5XCIpWzBdLmlubmVyVGV4dCk7XG4gICAgdmFyIHJlZ2lvbkEgPSByZXBsYWNlVW1sYXV0ZShhLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50LWZpZWxkLXJlZ2lvblwiKVswXS5pbm5lclRleHQpO1xuICAgIHZhciByZWdpb25CID0gcmVwbGFjZVVtbGF1dGUoYi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1yZWdpb25cIilbMF0uaW5uZXJUZXh0KTtcbiAgICBpZiAoY291bnRyeUEgIT09IGNvdW50cnlCKSB7XG4gICAgICAgIHJldHVybiBjb3VudHJ5QSA8IGNvdW50cnlCID8gLTEgOiAxO1xuICAgIH1cbiAgICBpZiAocmVnaW9uQSAhPT0gcmVnaW9uQikge1xuICAgICAgICByZXR1cm4gcmVnaW9uQSA8IHJlZ2lvbkIgPyAtMSA6IDE7XG4gICAgfVxuICAgIHJldHVybiAwO1xufSk7XG53aGlsZSAodmVuZG9yQXJyYXkubGVuZ3RoID4gMCkge1xuICAgIHZhciBlbGVtZW50ID0gdmVuZG9yQXJyYXkuc2hpZnQoKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkaXN0cmlidXRvci1zZWFyY2g6IGVsZW1lbnQgaXMgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIChfYSA9IGVsZW1lbnQucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgIHZhciBtYXJrZXQgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50LWZpZWxkLW1hcmtldFwiKVswXVxuICAgICAgICAuaW5uZXJUZXh0LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICB2YXIgY291bnRyeSA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnQtZmllbGQtY291bnRyeVwiKVswXVxuICAgICAgICAuaW5uZXJUZXh0LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICB2YXIgcmVnaW9uID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudC1maWVsZC1yZWdpb25cIilbMF1cbiAgICAgICAgLmlubmVyVGV4dC5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC8mL2csICctJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGhlYWRlciA9IHZlbmRvckNhdGVnb3J5Q29udGFpbmVyc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2F0ZWdvcnktbmFtZS1jb250YWluZXJcIilbMF1cbiAgICAgICAgICAgIC5pbm5lclRleHQucmVwbGFjZSgvIC9nLCAnJykucmVwbGFjZSgvJi9nLCAnLScpO1xuICAgICAgICBpZiAoY291bnRyeS50b1VwcGVyQ2FzZSgpID09PSBoZWFkZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgdmVuZG9yQ2F0ZWdvcnlDb250YWluZXJzW2ldLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChtYXJrZXQgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LmFkZChtYXJrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvdW50cnkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LmFkZChjb3VudHJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWdpb24gIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB2ZW5kb3JDYXRlZ29yeUNvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LmFkZChyZWdpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG52YXIgbWFya2V0U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcmtldFNlbGVjdCcpO1xudmFyIGNvdW50cnlTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRyeVNlbGVjdCcpO1xudmFyIHJlZ2lvblNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpb25TZWxlY3QnKTtcbmlmICghbWFya2V0U2VsZWN0IHx8ICFjb3VudHJ5U2VsZWN0IHx8ICFyZWdpb25TZWxlY3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Rpc3RyaWJ1dG9yLXNlYXJjaDogZmFpbGVkIHRvIGZpbmQgc2VsZWN0aW9uIGlucHV0cycpO1xufVxudmFyIG1hcmtldFNlbGVjdERlZmF1bHQgPSAoX2IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFya2V0U2VsZWN0RGVmYXVsdCcpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5uZXJUZXh0O1xudmFyIGNvdW50cnlTZWxlY3REZWZhdWx0ID0gKF9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50cnlTZWxlY3REZWZhdWx0JykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pbm5lclRleHQ7XG52YXIgcmVnaW9uU2VsZWN0RGVmYXVsdCA9IChfZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWdpb25TZWxlY3REZWZhdWx0JykpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5pbm5lclRleHQ7XG5pZiAoIW1hcmtldFNlbGVjdERlZmF1bHQgfHwgIWNvdW50cnlTZWxlY3REZWZhdWx0IHx8ICFyZWdpb25TZWxlY3REZWZhdWx0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkaXN0cmlidXRvci1zZWFyY2g6IGZhaWxlZCB0byBmaW5kIGRlZmF1bHQgdmFsdWVzJyk7XG59XG5zZXREaXNhYmxlZChtYXJrZXRTZWxlY3QsIGZhbHNlKTtcbnNldERpc2FibGVkKGNvdW50cnlTZWxlY3QsIHRydWUpO1xuc2V0RGlzYWJsZWQocmVnaW9uU2VsZWN0LCB0cnVlKTtcbmZvciAodmFyIF9lID0gMCwgdmVuZG9yc18yID0gdmVuZG9yczsgX2UgPCB2ZW5kb3JzXzIubGVuZ3RoOyBfZSsrKSB7XG4gICAgdmFyIHZlbmRvciA9IHZlbmRvcnNfMltfZV07XG4gICAgaWYgKCFtYXJrZXRzLmluY2x1ZGVzKHZlbmRvci5tYXJrZXQpKSB7XG4gICAgICAgIG1hcmtldHMucHVzaCh2ZW5kb3IubWFya2V0KTtcbiAgICB9XG59XG5zZXRFbnRyaWVzKG1hcmtldFNlbGVjdCwgbWFya2V0cyk7XG5tYXJrZXRTZWxlY3Qub25jaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1hcmtldCA9IG1hcmtldFNlbGVjdC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTtcbiAgICBjb3VudHJpZXMgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDAsIHZlbmRvcnNfMyA9IHZlbmRvcnM7IF9pIDwgdmVuZG9yc18zLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgdmVuZG9yID0gdmVuZG9yc18zW19pXTtcbiAgICAgICAgaWYgKHZlbmRvci5tYXJrZXQgPT0gbWFya2V0ICYmICFjb3VudHJpZXMuaW5jbHVkZXModmVuZG9yLmNvdW50cnkpKSB7XG4gICAgICAgICAgICBjb3VudHJpZXMucHVzaCh2ZW5kb3IuY291bnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0RW50cmllcyhjb3VudHJ5U2VsZWN0LCBjb3VudHJpZXMpO1xuICAgIHNldFZhbHVlKGNvdW50cnlTZWxlY3QsIGNvdW50cnlTZWxlY3REZWZhdWx0KTtcbiAgICBzZXRWYWx1ZShyZWdpb25TZWxlY3QsIHJlZ2lvblNlbGVjdERlZmF1bHQpO1xuICAgIHNldERpc2FibGVkKGNvdW50cnlTZWxlY3QsIGZhbHNlKTtcbiAgICBzZXREaXNhYmxlZChyZWdpb25TZWxlY3QsIHRydWUpO1xuICAgIEFycmF5LmZyb20oJCgnLnZlbmRvci1jYXRlZ29yeS1jb250YWluZXInKSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICB9KTtcbiAgICB2YXIgY29sbGVjdGlvbiA9ICQoJy52ZW5kb3ItY29udGVudC1jb250YWluZXIsIC52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyLicgKyBtYXJrZXQpO1xuICAgIG1peGVyLmZpbHRlcihjb2xsZWN0aW9uKTtcbn07XG5jb3VudHJ5U2VsZWN0Lm9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb3VudHJ5ID0gY291bnRyeVNlbGVjdC5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKTtcbiAgICBpZiAoIWNvdW50cnkpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignY291bnRyeVNlbGVjdC5vbmNoYW5nZTogY291bnRyeVNlbGVjdCBoYXMgbm8gdmFsdWUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWdpb25zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwLCB2ZW5kb3JzXzQgPSB2ZW5kb3JzOyBfaSA8IHZlbmRvcnNfNC5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHZlbmRvciA9IHZlbmRvcnNfNFtfaV07XG4gICAgICAgIGlmICh2ZW5kb3IuY291bnRyeSA9PSBjb3VudHJ5ICYmICFyZWdpb25zLmluY2x1ZGVzKHZlbmRvci5yZWdpb24pKSB7XG4gICAgICAgICAgICByZWdpb25zLnB1c2godmVuZG9yLnJlZ2lvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlZ2lvbnMubGVuZ3RoID09IDEgJiYgcmVnaW9uc1swXSA9PT0gXCJcIikge1xuICAgICAgICBzZXRWYWx1ZShyZWdpb25TZWxlY3QsIHJlZ2lvblNlbGVjdERlZmF1bHQpO1xuICAgICAgICBzZXREaXNhYmxlZChyZWdpb25TZWxlY3QsIHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2V0RW50cmllcyhyZWdpb25TZWxlY3QsIHJlZ2lvbnMpO1xuICAgICAgICBzZXRWYWx1ZShyZWdpb25TZWxlY3QsIHJlZ2lvblNlbGVjdERlZmF1bHQpO1xuICAgICAgICBzZXREaXNhYmxlZChyZWdpb25TZWxlY3QsIGZhbHNlKTtcbiAgICB9XG4gICAgQXJyYXkuZnJvbSgkKCcudmVuZG9yLWNhdGVnb3J5LWNvbnRhaW5lcicpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndG9nZ2xlZCcpO1xuICAgIH0pO1xuICAgIHZhciBzZWFyY2ggPSBjb3VudHJ5LnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICB2YXIgY29sbGVjdGlvbiA9ICQoJy52ZW5kb3ItY29udGVudC1jb250YWluZXIsIC52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyLicgKyBzZWFyY2gpO1xuICAgIG1peGVyLmZpbHRlcihjb2xsZWN0aW9uKTtcbiAgICBBcnJheS5mcm9tKCQoJy52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyLicgKyBzZWFyY2gpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndG9nZ2xlZCcpO1xuICAgIH0pO1xufTtcbnJlZ2lvblNlbGVjdC5vbmNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVnaW9uID0gcmVnaW9uU2VsZWN0LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpO1xuICAgIGlmICghcmVnaW9uKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlZ2lvblNlbGVjdC5vbmNoYW5nZTogcmVnaW9uU2VsZWN0IGhhcyBubyB2YWx1ZScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIEFycmF5LmZyb20oJCgnLnZlbmRvci1jYXRlZ29yeS1jb250YWluZXInKSkuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZWQnKTtcbiAgICB9KTtcbiAgICB2YXIgc2VhcmNoID0gcmVnaW9uLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoLyYvZywgJy0nKTtcbiAgICB2YXIgY29sbGVjdGlvbiA9ICQoJy52ZW5kb3ItY29udGVudC1jb250YWluZXIuJyArIHNlYXJjaFxuICAgICAgICArICcsIC52ZW5kb3ItY2F0ZWdvcnktY29udGFpbmVyLicgKyBzZWFyY2gpO1xuICAgIEFycmF5LmZyb20oJCgnLnZlbmRvci1jYXRlZ29yeS1jb250YWluZXIuJyArIHNlYXJjaCkpLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0b2dnbGVkJyk7XG4gICAgfSk7XG4gICAgbWl4ZXIuZmlsdGVyKGNvbGxlY3Rpb24pO1xufTtcbnZhciBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmVuZG9yLWxpc3QnKTtcbmlmICghY29udGFpbmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdkaXN0cmlidXRvci1zZWFyY2g6IHZlbmRvciBsaXN0IG5vdCBmb3VuZCcpO1xufVxudmFyIG1peGVyID0gbWl4aXR1cChjb250YWluZXIsIHtcbiAgICBhbmltYXRpb246IHtcbiAgICAgICAgZHVyYXRpb246IDM1MFxuICAgIH1cbn0pO1xuZnVuY3Rpb24gb25Ub2dnbGUoZXZlbnQpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCFldmVudC50YXJnZXQpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25Ub2dnbGU6IGV2ZW50IHRhcmdldCBpcyBtaXNzaW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zID0gZWxlbWVudC5hY3RpdmVBbmltYXRpb25zID09IG51bGwgPyAwIDogZWxlbWVudC5hY3RpdmVBbmltYXRpb25zO1xuICAgIGlmIChlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgIT0gMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnb25Ub2dnbGU6IGhhcyBzdGlsbCBydW5uaW5nIGFuaW1hdGlvbnMnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29udGVudENvbnRhaW5lcnMgPSAoX2EgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ZlbmRvci1jb250ZW50LWNvbnRhaW5lcicpO1xuICAgIGlmICghY29udGVudENvbnRhaW5lcnMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignb25Ub2dnbGU6IGNvbnRlbnQgY29udGFpbmVycyBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbWludXMgPSBldmVudC50YXJnZXQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWludXMnKVswXTtcbiAgICBpZiAoIWVsZW1lbnQudG9nZ2xlZCkge1xuICAgICAgICBlbGVtZW50LnRvZ2dsZWQgPSB0cnVlO1xuICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRvZ2dsZWRcIik7XG4gICAgICAgIGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyArPSAxO1xuICAgICAgICAoMCwgYW5pbWF0ZV8xLmFuaW1hdGVFbGVtZW50KShtaW51cywgbmV3IGFuaW1hdGVfMS5BbmltYXRpb24oYW5pbWF0ZV8xLkFuaW1hdGlvbk5hbWUuQ3VzdG9tUGx1c1RvTWludXMsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBhbmltYXRlXzEuQW5pbWF0aW9uRHVyYXRpb24uRmFzdGVyLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgLT0gMTtcbiAgICAgICAgICAgIG1pbnVzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pKTtcbiAgICAgICAgQXJyYXkuZnJvbShjb250ZW50Q29udGFpbmVycykuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudENvbnRhaW5lcikge1xuICAgICAgICAgICAgZWxlbWVudC5hY3RpdmVBbmltYXRpb25zICs9IDE7XG4gICAgICAgICAgICAoMCwgYW5pbWF0ZV8xLmFuaW1hdGVFbGVtZW50KShjb250ZW50Q29udGFpbmVyLCBuZXcgYW5pbWF0ZV8xLkFuaW1hdGlvbihhbmltYXRlXzEuQW5pbWF0aW9uTmFtZS5GYWRlSW4sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgLT0gMTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgKz0gMTtcbiAgICAgICAgbWludXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICgwLCBhbmltYXRlXzEuYW5pbWF0ZUVsZW1lbnQpKG1pbnVzLCBuZXcgYW5pbWF0ZV8xLkFuaW1hdGlvbihhbmltYXRlXzEuQW5pbWF0aW9uTmFtZS5DdXN0b21NaW51c1RvUGx1cywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFuaW1hdGVfMS5BbmltYXRpb25EdXJhdGlvbi5GYXN0ZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyAtPSAxO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIEFycmF5LmZyb20oY29udGVudENvbnRhaW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnRDb250YWluZXIpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWN0aXZlQW5pbWF0aW9ucyArPSAxO1xuICAgICAgICAgICAgKDAsIGFuaW1hdGVfMS5hbmltYXRlRWxlbWVudCkoY29udGVudENvbnRhaW5lciwgbmV3IGFuaW1hdGVfMS5BbmltYXRpb24oYW5pbWF0ZV8xLkFuaW1hdGlvbk5hbWUuRmFkZU91dCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGFuaW1hdGVfMS5BbmltYXRpb25EdXJhdGlvbi5GYXN0ZXIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFjdGl2ZUFuaW1hdGlvbnMgLT0gMTtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5hY3RpdmVBbmltYXRpb25zID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC50b2dnbGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbnZhciB2ZW5kb3JDYXRlZ29yaWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmVuZG9yLWNhdGVnb3J5Jyk7XG5BcnJheS5mcm9tKHZlbmRvckNhdGVnb3JpZXMpLmZvckVhY2goZnVuY3Rpb24gKHZlbmRvckNhdGVnb3J5KSB7XG4gICAgdmVuZG9yQ2F0ZWdvcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uVG9nZ2xlKTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFJQSxFQUFKLEVBQVFDLEVBQVIsRUFBWUMsRUFBWixFQUFnQkMsRUFBaEI7O0FBQ0FDLE9BQU8sQ0FBQ0MsVUFBUixHQUFxQixJQUFyQjs7QUFDQSxJQUFJQyxTQUFTLEdBQUdDLE9BQU8sQ0FBQyxrQkFBRCxDQUF2QixDLENBQ0E7OztBQUNBLElBQUlDLEVBQUUsR0FBR0MsUUFBUSxDQUFDQyxvQkFBVCxDQUE4QixHQUE5QixDQUFUO0FBQ0FDLEtBQUssQ0FBQ0MsSUFBTixDQUFXSixFQUFYLEVBQWVLLE9BQWYsQ0FBdUIsVUFBVUMsQ0FBVixFQUFhO0VBQ2hDLElBQUlBLENBQUMsQ0FBQ0MsU0FBRixDQUFZQyxPQUFaLENBQW9CLFdBQXBCLEVBQWlDLEVBQWpDLE1BQXlDLEVBQTdDLEVBQWlEO0lBQzdDO0VBQ0g7O0VBQ0QsSUFBSUYsQ0FBQyxDQUFDRyxVQUFOLEVBQWtCO0lBQ2RILENBQUMsQ0FBQ0csVUFBRixDQUFhQyxXQUFiLENBQXlCSixDQUF6QjtFQUNIO0FBQ0osQ0FQRDtBQVFBLElBQUlLLFlBQVksR0FBR1YsUUFBUSxDQUFDVyxzQkFBVCxDQUFnQyxjQUFoQyxDQUFuQjtBQUNBLElBQUlDLGdCQUFnQixHQUFHWixRQUFRLENBQUNXLHNCQUFULENBQWdDLHVCQUFoQyxDQUF2QjtBQUNBVCxLQUFLLENBQUNDLElBQU4sQ0FBV08sWUFBWCxFQUF5Qk4sT0FBekIsQ0FBaUMsVUFBVVMsV0FBVixFQUF1QjtFQUNwREEsV0FBVyxDQUFDQyxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxVQUFVQyxLQUFWLEVBQWlCO0lBQUUsT0FBT0MsT0FBTyxDQUFDRCxLQUFELENBQWQ7RUFBd0IsQ0FBakY7QUFDSCxDQUZEO0FBR0FiLEtBQUssQ0FBQ0MsSUFBTixDQUFXUyxnQkFBWCxFQUE2QlIsT0FBN0IsQ0FBcUMsVUFBVWEsZUFBVixFQUEyQjtFQUM1REEsZUFBZSxDQUFDSCxnQkFBaEIsQ0FBaUMsVUFBakMsRUFBNkMsVUFBVUMsS0FBVixFQUFpQjtJQUFFLE9BQU9HLFVBQVUsQ0FBQ0gsS0FBRCxDQUFqQjtFQUEyQixDQUEzRjtBQUNILENBRkQ7O0FBR0EsU0FBU0MsT0FBVCxDQUFpQkQsS0FBakIsRUFBd0I7RUFDcEIsSUFBSSxDQUFDQSxLQUFLLENBQUNJLE1BQVgsRUFBbUI7SUFDZkMsT0FBTyxDQUFDQyxLQUFSLENBQWMsa0NBQWQ7SUFDQTtFQUNIOztFQUNELElBQUlDLE1BQU0sR0FBR1AsS0FBSyxDQUFDSSxNQUFOLENBQWFJLGFBQTFCOztFQUNBLElBQUksQ0FBQ0QsTUFBTSxLQUFLLElBQVgsSUFBbUJBLE1BQU0sS0FBSyxLQUFLLENBQW5DLEdBQXVDLEtBQUssQ0FBNUMsR0FBZ0RBLE1BQU0sQ0FBQ0UsWUFBUCxDQUFvQixVQUFwQixDQUFqRCxNQUFzRixNQUExRixFQUFrRztJQUM5RjtFQUNIOztFQUNELElBQUlDLG1CQUFtQixHQUFHSCxNQUFNLEtBQUssSUFBWCxJQUFtQkEsTUFBTSxLQUFLLEtBQUssQ0FBbkMsR0FBdUMsS0FBSyxDQUE1QyxHQUFnREEsTUFBTSxDQUFDWCxzQkFBUCxDQUE4Qix1QkFBOUIsRUFBdUQsQ0FBdkQsQ0FBMUU7O0VBQ0EsSUFBSSxDQUFDYyxtQkFBTCxFQUEwQjtJQUN0QjtFQUNIOztFQUNEQSxtQkFBbUIsQ0FBQ0MsU0FBcEIsQ0FBOEJDLEdBQTlCLENBQWtDLFNBQWxDO0VBQ0FGLG1CQUFtQixDQUFDRyxLQUFwQjtBQUNIOztBQUNELFNBQVNWLFVBQVQsQ0FBb0JILEtBQXBCLEVBQTJCO0VBQ3ZCLElBQUlJLE1BQU0sR0FBR0osS0FBSyxDQUFDSSxNQUFuQjs7RUFDQSxJQUFJLENBQUNBLE1BQUwsRUFBYTtJQUNUQyxPQUFPLENBQUNDLEtBQVIsQ0FBYyxxQ0FBZDtJQUNBO0VBQ0g7O0VBQ0QsSUFBSUMsTUFBTSxHQUFHSCxNQUFNLENBQUNJLGFBQXBCOztFQUNBLElBQUksQ0FBQ0QsTUFBTCxFQUFhO0lBQ1RGLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLCtCQUFkO0lBQ0E7RUFDSDs7RUFDREMsTUFBTSxDQUFDWCxzQkFBUCxDQUE4Qix1QkFBOUIsRUFBdUQsQ0FBdkQsRUFBMERlLFNBQTFELENBQW9FRyxNQUFwRSxDQUEyRSxTQUEzRTtBQUNIOztBQUNELFNBQVNDLFVBQVQsQ0FBb0JDLFFBQXBCLEVBQThCQyxVQUE5QixFQUEwQztFQUN0QyxJQUFJZixlQUFlLEdBQUdjLFFBQVEsQ0FBQ3BCLHNCQUFULENBQWdDLHVCQUFoQyxFQUF5RCxDQUF6RCxDQUF0QjtFQUNBLElBQUlzQixPQUFPLEdBQUdoQixlQUFlLENBQUNOLHNCQUFoQixDQUF1QyxrQkFBdkMsQ0FBZDs7RUFDQSxPQUFPc0IsT0FBTyxDQUFDQyxNQUFSLEdBQWlCRixVQUFVLENBQUNFLE1BQW5DLEVBQTJDO0lBQ3ZDLElBQUlDLEdBQUcsR0FBR0YsT0FBTyxDQUFDLENBQUQsQ0FBUCxDQUFXRyxTQUFYLENBQXFCLEtBQXJCLENBQVY7SUFDQW5CLGVBQWUsQ0FBQ29CLFdBQWhCLENBQTRCRixHQUE1QjtJQUNBRixPQUFPLEdBQUdoQixlQUFlLENBQUNOLHNCQUFoQixDQUF1QyxrQkFBdkMsQ0FBVjtFQUNIOztFQUNELE9BQU9zQixPQUFPLENBQUNDLE1BQVIsR0FBaUJGLFVBQVUsQ0FBQ0UsTUFBbkMsRUFBMkM7SUFDdkNELE9BQU8sQ0FBQyxDQUFELENBQVAsQ0FBV0osTUFBWDtJQUNBSSxPQUFPLEdBQUdoQixlQUFlLENBQUNOLHNCQUFoQixDQUF1QyxrQkFBdkMsQ0FBVjtFQUNIOztFQUNELElBQUkyQixPQUFPLEdBQUcsU0FBVkEsT0FBVSxDQUFVQyxDQUFWLEVBQWE7SUFDdkIsSUFBSUMsT0FBTyxHQUFHUCxPQUFPLENBQUNNLENBQUQsQ0FBckI7SUFDQUMsT0FBTyxDQUFDbEMsU0FBUixHQUFvQjBCLFVBQVUsQ0FBQ08sQ0FBRCxDQUE5Qjs7SUFDQSxJQUFJQyxPQUFPLENBQUNDLFFBQVosRUFBc0I7TUFDbEJSLE9BQU8sQ0FBQ00sQ0FBRCxDQUFQLENBQVdHLG1CQUFYLENBQStCLE9BQS9CLEVBQXdDRixPQUFPLENBQUNDLFFBQWhEO0lBQ0g7O0lBQ0RELE9BQU8sQ0FBQ0MsUUFBUixHQUFtQixVQUFVMUIsS0FBVixFQUFpQjtNQUFFLE9BQU80QixRQUFRLENBQUM1QixLQUFELEVBQVFpQixVQUFVLENBQUNPLENBQUQsQ0FBbEIsQ0FBZjtJQUF3QyxDQUE5RTs7SUFDQU4sT0FBTyxDQUFDTSxDQUFELENBQVAsQ0FBV3pCLGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDMEIsT0FBTyxDQUFDQyxRQUE3QztFQUNILENBUkQ7O0VBU0EsS0FBSyxJQUFJRixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTixPQUFPLENBQUNDLE1BQTVCLEVBQW9DSyxDQUFDLEVBQXJDLEVBQXlDO0lBQ3JDRCxPQUFPLENBQUNDLENBQUQsQ0FBUDtFQUNIO0FBQ0o7O0FBQ0QsU0FBU0ssUUFBVCxDQUFrQmIsUUFBbEIsRUFBNEJjLEtBQTVCLEVBQW1DO0VBQy9CZCxRQUFRLENBQUNlLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0JELEtBQS9CO0VBQ0FkLFFBQVEsQ0FBQ3BCLHNCQUFULENBQWdDLFVBQWhDLEVBQTRDLENBQTVDLEVBQStDTCxTQUEvQyxHQUEyRHVDLEtBQTNEO0VBQ0FkLFFBQVEsQ0FBQ3BCLHNCQUFULENBQWdDLHVCQUFoQyxFQUF5RCxDQUF6RCxFQUE0RGUsU0FBNUQsQ0FBc0VHLE1BQXRFLENBQTZFLFNBQTdFO0FBQ0g7O0FBQ0QsU0FBU2tCLFdBQVQsQ0FBcUJoQixRQUFyQixFQUErQmMsS0FBL0IsRUFBc0M7RUFDbEMsSUFBSUcsR0FBRyxHQUFHakIsUUFBUSxDQUFDcEIsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsQ0FBVjs7RUFDQSxJQUFJa0MsS0FBSixFQUFXO0lBQ1BHLEdBQUcsQ0FBQ3RCLFNBQUosQ0FBY0MsR0FBZCxDQUFrQixVQUFsQjtFQUNILENBRkQsTUFHSztJQUNEcUIsR0FBRyxDQUFDdEIsU0FBSixDQUFjRyxNQUFkLENBQXFCLFVBQXJCO0VBQ0g7O0VBQ0RFLFFBQVEsQ0FBQ2UsWUFBVCxDQUFzQixVQUF0QixFQUFrQ0csTUFBTSxDQUFDSixLQUFELENBQXhDO0FBQ0g7O0FBQ0QsU0FBU0YsUUFBVCxDQUFrQjVCLEtBQWxCLEVBQXlCOEIsS0FBekIsRUFBZ0M7RUFDNUIsSUFBSXRELEVBQUo7O0VBQ0EsSUFBSTRCLE1BQU0sR0FBR0osS0FBSyxDQUFDSSxNQUFuQjs7RUFDQSxJQUFJLENBQUNBLE1BQUwsRUFBYTtJQUNUQyxPQUFPLENBQUNDLEtBQVIsQ0FBYyw2QkFBZDtJQUNBO0VBQ0g7O0VBQ0QsSUFBSUMsTUFBTSxHQUFHLENBQUMvQixFQUFFLEdBQUc0QixNQUFNLENBQUNYLFVBQWIsTUFBNkIsSUFBN0IsSUFBcUNqQixFQUFFLEtBQUssS0FBSyxDQUFqRCxHQUFxRCxLQUFLLENBQTFELEdBQThEQSxFQUFFLENBQUNpQixVQUE5RTs7RUFDQSxJQUFJLENBQUNjLE1BQUwsRUFBYTtJQUNURixPQUFPLENBQUNDLEtBQVIsQ0FBYyw2QkFBZDtJQUNBO0VBQ0g7O0VBQ0R1QixRQUFRLENBQUN0QixNQUFELEVBQVN1QixLQUFULENBQVI7RUFDQXZCLE1BQU0sQ0FBQzRCLFFBQVA7QUFDSDs7QUFDRCxJQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLE9BQU8sR0FBRyxFQUFkO0FBQ0EsSUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBQ0EsSUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxJQUFJQyxnQkFBZ0IsR0FBR3ZELFFBQVEsQ0FBQ1csc0JBQVQsQ0FBZ0MsMEJBQWhDLENBQXZCO0FBQ0FULEtBQUssQ0FBQ0MsSUFBTixDQUFXb0QsZ0JBQVgsRUFBNkJuRCxPQUE3QixDQUFxQyxVQUFVb0QsZUFBVixFQUEyQjtFQUM1RCxJQUFJQyxNQUFNLEdBQUdELGVBQWUsQ0FBQzdDLHNCQUFoQixDQUF1QyxzQkFBdkMsRUFBK0QsQ0FBL0QsQ0FBYjtFQUNBLElBQUkrQyxPQUFPLEdBQUdGLGVBQWUsQ0FBQzdDLHNCQUFoQixDQUF1Qyx1QkFBdkMsRUFBZ0UsQ0FBaEUsQ0FBZDtFQUNBLElBQUlnRCxNQUFNLEdBQUdILGVBQWUsQ0FBQzdDLHNCQUFoQixDQUF1QyxzQkFBdkMsRUFBK0QsQ0FBL0QsQ0FBYjtFQUNBLElBQUlpRCxXQUFXLEdBQUdILE1BQU0sQ0FBQ25ELFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCLElBQXpCLEVBQStCLEVBQS9CLEVBQW1DQSxPQUFuQyxDQUEyQyxJQUEzQyxFQUFpRCxHQUFqRCxDQUFsQjtFQUNBLElBQUlzRCxZQUFZLEdBQUdILE9BQU8sQ0FBQ3BELFNBQVIsQ0FBa0JDLE9BQWxCLENBQTBCLElBQTFCLEVBQWdDLEVBQWhDLEVBQW9DQSxPQUFwQyxDQUE0QyxJQUE1QyxFQUFrRCxHQUFsRCxDQUFuQjtFQUNBLElBQUl1RCxXQUFXLEdBQUdILE1BQU0sQ0FBQ3JELFNBQVAsQ0FBaUJDLE9BQWpCLENBQXlCLElBQXpCLEVBQStCLEVBQS9CLEVBQW1DQSxPQUFuQyxDQUEyQyxJQUEzQyxFQUFpRCxHQUFqRCxDQUFsQjs7RUFDQSxJQUFJdUQsV0FBVyxLQUFLLEVBQXBCLEVBQXdCO0lBQ3BCTixlQUFlLENBQUM3QyxzQkFBaEIsQ0FBdUMsZUFBdkMsRUFBd0QsQ0FBeEQsRUFBMkRMLFNBQTNELEdBQXVFcUQsTUFBTSxDQUFDckQsU0FBOUU7SUFDQWtELGVBQWUsQ0FBQzlCLFNBQWhCLENBQTBCQyxHQUExQixDQUE4QixLQUE5QjtJQUNBNkIsZUFBZSxDQUFDOUIsU0FBaEIsQ0FBMEJDLEdBQTFCLENBQThCaUMsV0FBOUI7SUFDQUosZUFBZSxDQUFDOUIsU0FBaEIsQ0FBMEJDLEdBQTFCLENBQThCa0MsWUFBOUI7SUFDQUwsZUFBZSxDQUFDOUIsU0FBaEIsQ0FBMEJDLEdBQTFCLENBQThCbUMsV0FBOUI7RUFDSDs7RUFDRFgsT0FBTyxDQUFDWSxJQUFSLENBQWE7SUFDVE4sTUFBTSxFQUFFQSxNQUFNLENBQUNuRCxTQUROO0lBRVRvRCxPQUFPLEVBQUVBLE9BQU8sQ0FBQ3BELFNBRlI7SUFHVHFELE1BQU0sRUFBRUEsTUFBTSxDQUFDckQ7RUFITixDQUFiO0VBS0FtRCxNQUFNLENBQUNPLEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtFQUNBUCxPQUFPLENBQUNNLEtBQVIsQ0FBY0MsT0FBZCxHQUF3QixNQUF4QjtFQUNBTixNQUFNLENBQUNLLEtBQVAsQ0FBYUMsT0FBYixHQUF1QixNQUF2QjtBQUNILENBdEJEOztBQXVCQSxLQUFLLElBQUlDLEVBQUUsR0FBRyxDQUFULEVBQVlDLFNBQVMsR0FBR2hCLE9BQTdCLEVBQXNDZSxFQUFFLEdBQUdDLFNBQVMsQ0FBQ2pDLE1BQXJELEVBQTZEZ0MsRUFBRSxFQUEvRCxFQUFtRTtFQUMvRCxJQUFJRSxNQUFNLEdBQUdELFNBQVMsQ0FBQ0QsRUFBRCxDQUF0Qjs7RUFDQSxJQUFJLENBQUNiLFNBQVMsQ0FBQ2dCLFFBQVYsQ0FBbUJELE1BQU0sQ0FBQ1YsT0FBMUIsQ0FBTCxFQUF5QztJQUNyQ0wsU0FBUyxDQUFDVSxJQUFWLENBQWVLLE1BQU0sQ0FBQ1YsT0FBdEI7RUFDSDtBQUNKOztBQUNELElBQUlZLGNBQWMsR0FBR3RFLFFBQVEsQ0FBQ1csc0JBQVQsQ0FBZ0MsZ0JBQWhDLENBQXJCO0FBQ0FULEtBQUssQ0FBQ0MsSUFBTixDQUFXbUUsY0FBWCxFQUEyQmxFLE9BQTNCLENBQW1DLFVBQVVtRSxhQUFWLEVBQXlCO0VBQ3hELElBQUlBLGFBQWEsQ0FBQ2pFLFNBQWQsS0FBNEIsRUFBaEMsRUFBb0M7SUFDaEMsSUFBSSxDQUFDaUUsYUFBYSxDQUFDaEQsYUFBbkIsRUFBa0M7TUFDOUJILE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDRDQUFkO01BQ0E7SUFDSDs7SUFDRGtELGFBQWEsQ0FBQ2hELGFBQWQsQ0FBNEJ5QyxLQUE1QixDQUFrQ0MsT0FBbEMsR0FBNEMsTUFBNUM7RUFDSDtBQUNKLENBUkQ7QUFTQSxJQUFJTyx3QkFBd0IsR0FBR3hFLFFBQVEsQ0FBQ1csc0JBQVQsQ0FBZ0MsMkJBQWhDLENBQS9CO0FBQ0E2RCx3QkFBd0IsQ0FBQyxDQUFELENBQXhCLENBQTRCOUMsU0FBNUIsQ0FBc0NDLEdBQXRDLENBQTBDLEtBQTFDO0FBQ0EsSUFBSThDLDhCQUE4QixHQUFHRCx3QkFBd0IsQ0FBQyxDQUFELENBQXhCLENBQTRCakQsYUFBakU7O0FBQ0EsT0FBT2lELHdCQUF3QixDQUFDdEMsTUFBekIsR0FBa0NtQixTQUFTLENBQUNuQixNQUFuRCxFQUEyRDtFQUN2RCxJQUFJLENBQUN1Qyw4QkFBTCxFQUFxQztJQUNqQ3JELE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGdFQUFkO0lBQ0E7RUFDSDs7RUFDRG9ELDhCQUE4QixDQUFDcEMsV0FBL0IsQ0FBMkNtQyx3QkFBd0IsQ0FBQyxDQUFELENBQXhCLENBQTRCcEMsU0FBNUIsQ0FBc0MsSUFBdEMsQ0FBM0M7RUFDQW9DLHdCQUF3QixHQUFHeEUsUUFBUSxDQUFDVyxzQkFBVCxDQUFnQywyQkFBaEMsQ0FBM0I7QUFDSDs7QUFDRCxLQUFLLElBQUk0QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHYyxTQUFTLENBQUNuQixNQUE5QixFQUFzQ0ssQ0FBQyxFQUF2QyxFQUEyQztFQUN2Q2lDLHdCQUF3QixDQUFDakMsQ0FBRCxDQUF4QixDQUE0QjVCLHNCQUE1QixDQUFtRCx5QkFBbkQsRUFBOEUsQ0FBOUUsRUFBaUZMLFNBQWpGLEdBQTZGK0MsU0FBUyxDQUFDZCxDQUFELENBQXRHO0FBQ0g7O0FBQ0QsSUFBSW1DLGFBQWEsR0FBRzFFLFFBQVEsQ0FBQzJFLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBcEI7O0FBQ0EsSUFBSSxDQUFDRCxhQUFMLEVBQW9CO0VBQ2hCLE1BQU0sSUFBSUUsS0FBSixDQUFVLGdFQUFWLENBQU47QUFDSDs7QUFDRCxJQUFJQyxTQUFTLEdBQUc7RUFDWixRQUFVLElBREU7RUFFWixRQUFVLElBRkU7RUFHWixRQUFVLElBSEU7RUFJWixRQUFVLElBSkU7RUFLWixRQUFVLElBTEU7RUFNWixRQUFVLElBTkU7RUFPWixRQUFVO0FBUEUsQ0FBaEI7O0FBU0EsU0FBU0MsY0FBVCxDQUF3QkMsR0FBeEIsRUFBNkI7RUFDekIsT0FBT0EsR0FBRyxDQUNMeEUsT0FERSxDQUNNLDhCQUROLEVBQ3NDLFVBQVV5RSxDQUFWLEVBQWE7SUFDdEQsSUFBSUMsR0FBRyxHQUFHSixTQUFTLENBQUNHLENBQUMsQ0FBQ0UsS0FBRixDQUFRLENBQVIsRUFBVyxDQUFYLENBQUQsQ0FBbkI7SUFDQSxPQUFPRCxHQUFHLENBQUNFLE1BQUosQ0FBVyxDQUFYLElBQWdCRixHQUFHLENBQUNFLE1BQUosQ0FBVyxDQUFYLEVBQWNDLFdBQWQsRUFBaEIsR0FBOENKLENBQUMsQ0FBQ0UsS0FBRixDQUFRLENBQVIsQ0FBckQ7RUFDSCxDQUpNLEVBS0YzRSxPQUxFLENBS00sSUFBSThFLE1BQUosQ0FBVyxNQUFNQyxNQUFNLENBQUNDLElBQVAsQ0FBWVYsU0FBWixFQUF1QlcsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FBTixHQUF5QyxHQUFwRCxFQUF5RCxHQUF6RCxDQUxOLEVBS3FFLFVBQVVSLENBQVYsRUFBYTtJQUFFLE9BQU9ILFNBQVMsQ0FBQ0csQ0FBRCxDQUFoQjtFQUFzQixDQUwxRyxDQUFQO0FBTUg7O0FBQ0R6QixnQkFBZ0IsR0FBR21CLGFBQWEsQ0FBQy9ELHNCQUFkLENBQXFDLDBCQUFyQyxDQUFuQjtBQUNBLElBQUk4RSxXQUFXLEdBQUd2RixLQUFLLENBQUNDLElBQU4sQ0FBV29ELGdCQUFYLEVBQTZCbUMsSUFBN0IsQ0FBa0MsVUFBVVYsQ0FBVixFQUFhVyxDQUFiLEVBQWdCO0VBQ2hFLElBQUlDLFFBQVEsR0FBR2QsY0FBYyxDQUFDRSxDQUFDLENBQUNyRSxzQkFBRixDQUF5Qix1QkFBekIsRUFBa0QsQ0FBbEQsRUFBcURMLFNBQXRELENBQTdCO0VBQ0EsSUFBSXVGLFFBQVEsR0FBR2YsY0FBYyxDQUFDYSxDQUFDLENBQUNoRixzQkFBRixDQUF5Qix1QkFBekIsRUFBa0QsQ0FBbEQsRUFBcURMLFNBQXRELENBQTdCO0VBQ0EsSUFBSXdGLE9BQU8sR0FBR2hCLGNBQWMsQ0FBQ0UsQ0FBQyxDQUFDckUsc0JBQUYsQ0FBeUIsc0JBQXpCLEVBQWlELENBQWpELEVBQW9ETCxTQUFyRCxDQUE1QjtFQUNBLElBQUl5RixPQUFPLEdBQUdqQixjQUFjLENBQUNhLENBQUMsQ0FBQ2hGLHNCQUFGLENBQXlCLHNCQUF6QixFQUFpRCxDQUFqRCxFQUFvREwsU0FBckQsQ0FBNUI7O0VBQ0EsSUFBSXNGLFFBQVEsS0FBS0MsUUFBakIsRUFBMkI7SUFDdkIsT0FBT0QsUUFBUSxHQUFHQyxRQUFYLEdBQXNCLENBQUMsQ0FBdkIsR0FBMkIsQ0FBbEM7RUFDSDs7RUFDRCxJQUFJQyxPQUFPLEtBQUtDLE9BQWhCLEVBQXlCO0lBQ3JCLE9BQU9ELE9BQU8sR0FBR0MsT0FBVixHQUFvQixDQUFDLENBQXJCLEdBQXlCLENBQWhDO0VBQ0g7O0VBQ0QsT0FBTyxDQUFQO0FBQ0gsQ0FaaUIsQ0FBbEI7O0FBYUEsT0FBT04sV0FBVyxDQUFDdkQsTUFBWixHQUFxQixDQUE1QixFQUErQjtFQUMzQixJQUFJTSxPQUFPLEdBQUdpRCxXQUFXLENBQUNPLEtBQVosRUFBZDs7RUFDQSxJQUFJLENBQUN4RCxPQUFMLEVBQWM7SUFDVixNQUFNLElBQUlvQyxLQUFKLENBQVUsMENBQVYsQ0FBTjtFQUNIOztFQUNELENBQUNyRixFQUFFLEdBQUdpRCxPQUFPLENBQUNqQixhQUFkLE1BQWlDLElBQWpDLElBQXlDaEMsRUFBRSxLQUFLLEtBQUssQ0FBckQsR0FBeUQsS0FBSyxDQUE5RCxHQUFrRUEsRUFBRSxDQUFDa0IsV0FBSCxDQUFlK0IsT0FBZixDQUFsRTtFQUNBLElBQUlpQixNQUFNLEdBQUdqQixPQUFPLENBQUM3QixzQkFBUixDQUErQixzQkFBL0IsRUFBdUQsQ0FBdkQsRUFDUkwsU0FEUSxDQUNFQyxPQURGLENBQ1UsSUFEVixFQUNnQixFQURoQixFQUNvQkEsT0FEcEIsQ0FDNEIsSUFENUIsRUFDa0MsR0FEbEMsQ0FBYjtFQUVBLElBQUltRCxPQUFPLEdBQUdsQixPQUFPLENBQUM3QixzQkFBUixDQUErQix1QkFBL0IsRUFBd0QsQ0FBeEQsRUFDVEwsU0FEUyxDQUNDQyxPQURELENBQ1MsSUFEVCxFQUNlLEVBRGYsRUFDbUJBLE9BRG5CLENBQzJCLElBRDNCLEVBQ2lDLEdBRGpDLENBQWQ7RUFFQSxJQUFJb0QsTUFBTSxHQUFHbkIsT0FBTyxDQUFDN0Isc0JBQVIsQ0FBK0Isc0JBQS9CLEVBQXVELENBQXZELEVBQ1JMLFNBRFEsQ0FDRUMsT0FERixDQUNVLElBRFYsRUFDZ0IsRUFEaEIsRUFDb0JBLE9BRHBCLENBQzRCLElBRDVCLEVBQ2tDLEdBRGxDLENBQWI7O0VBRUEsS0FBSyxJQUFJZ0MsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lDLHdCQUF3QixDQUFDdEMsTUFBN0MsRUFBcURLLENBQUMsRUFBdEQsRUFBMEQ7SUFDdEQsSUFBSTBELE1BQU0sR0FBR3pCLHdCQUF3QixDQUFDakMsQ0FBRCxDQUF4QixDQUE0QjVCLHNCQUE1QixDQUFtRCx5QkFBbkQsRUFBOEUsQ0FBOUUsRUFDUkwsU0FEUSxDQUNFQyxPQURGLENBQ1UsSUFEVixFQUNnQixFQURoQixFQUNvQkEsT0FEcEIsQ0FDNEIsSUFENUIsRUFDa0MsR0FEbEMsQ0FBYjs7SUFFQSxJQUFJbUQsT0FBTyxDQUFDd0MsV0FBUixPQUEwQkQsTUFBTSxDQUFDQyxXQUFQLEVBQTlCLEVBQW9EO01BQ2hEMUIsd0JBQXdCLENBQUNqQyxDQUFELENBQXhCLENBQTRCNEQsTUFBNUIsQ0FBbUMzRCxPQUFuQzs7TUFDQSxJQUFJaUIsTUFBTSxLQUFLLEVBQWYsRUFBbUI7UUFDZmUsd0JBQXdCLENBQUNqQyxDQUFELENBQXhCLENBQTRCYixTQUE1QixDQUFzQ0MsR0FBdEMsQ0FBMEM4QixNQUExQztNQUNIOztNQUNELElBQUlDLE9BQU8sS0FBSyxFQUFoQixFQUFvQjtRQUNoQmMsd0JBQXdCLENBQUNqQyxDQUFELENBQXhCLENBQTRCYixTQUE1QixDQUFzQ0MsR0FBdEMsQ0FBMEMrQixPQUExQztNQUNIOztNQUNELElBQUlDLE1BQU0sS0FBSyxFQUFmLEVBQW1CO1FBQ2ZhLHdCQUF3QixDQUFDakMsQ0FBRCxDQUF4QixDQUE0QmIsU0FBNUIsQ0FBc0NDLEdBQXRDLENBQTBDZ0MsTUFBMUM7TUFDSDs7TUFDRDtJQUNIO0VBQ0o7QUFDSjs7QUFDRCxJQUFJeUMsWUFBWSxHQUFHcEcsUUFBUSxDQUFDMkUsY0FBVCxDQUF3QixjQUF4QixDQUFuQjtBQUNBLElBQUkwQixhQUFhLEdBQUdyRyxRQUFRLENBQUMyRSxjQUFULENBQXdCLGVBQXhCLENBQXBCO0FBQ0EsSUFBSTJCLFlBQVksR0FBR3RHLFFBQVEsQ0FBQzJFLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBbkI7O0FBQ0EsSUFBSSxDQUFDeUIsWUFBRCxJQUFpQixDQUFDQyxhQUFsQixJQUFtQyxDQUFDQyxZQUF4QyxFQUFzRDtFQUNsRCxNQUFNLElBQUkxQixLQUFKLENBQVUscURBQVYsQ0FBTjtBQUNIOztBQUNELElBQUkyQixtQkFBbUIsR0FBRyxDQUFDL0csRUFBRSxHQUFHUSxRQUFRLENBQUMyRSxjQUFULENBQXdCLHFCQUF4QixDQUFOLE1BQTBELElBQTFELElBQWtFbkYsRUFBRSxLQUFLLEtBQUssQ0FBOUUsR0FBa0YsS0FBSyxDQUF2RixHQUEyRkEsRUFBRSxDQUFDYyxTQUF4SDtBQUNBLElBQUlrRyxvQkFBb0IsR0FBRyxDQUFDL0csRUFBRSxHQUFHTyxRQUFRLENBQUMyRSxjQUFULENBQXdCLHNCQUF4QixDQUFOLE1BQTJELElBQTNELElBQW1FbEYsRUFBRSxLQUFLLEtBQUssQ0FBL0UsR0FBbUYsS0FBSyxDQUF4RixHQUE0RkEsRUFBRSxDQUFDYSxTQUExSDtBQUNBLElBQUltRyxtQkFBbUIsR0FBRyxDQUFDL0csRUFBRSxHQUFHTSxRQUFRLENBQUMyRSxjQUFULENBQXdCLHFCQUF4QixDQUFOLE1BQTBELElBQTFELElBQWtFakYsRUFBRSxLQUFLLEtBQUssQ0FBOUUsR0FBa0YsS0FBSyxDQUF2RixHQUEyRkEsRUFBRSxDQUFDWSxTQUF4SDs7QUFDQSxJQUFJLENBQUNpRyxtQkFBRCxJQUF3QixDQUFDQyxvQkFBekIsSUFBaUQsQ0FBQ0MsbUJBQXRELEVBQTJFO0VBQ3ZFLE1BQU0sSUFBSTdCLEtBQUosQ0FBVSxtREFBVixDQUFOO0FBQ0g7O0FBQ0Q3QixXQUFXLENBQUNxRCxZQUFELEVBQWUsS0FBZixDQUFYO0FBQ0FyRCxXQUFXLENBQUNzRCxhQUFELEVBQWdCLElBQWhCLENBQVg7QUFDQXRELFdBQVcsQ0FBQ3VELFlBQUQsRUFBZSxJQUFmLENBQVg7O0FBQ0EsS0FBSyxJQUFJSSxFQUFFLEdBQUcsQ0FBVCxFQUFZQyxTQUFTLEdBQUd4RCxPQUE3QixFQUFzQ3VELEVBQUUsR0FBR0MsU0FBUyxDQUFDekUsTUFBckQsRUFBNkR3RSxFQUFFLEVBQS9ELEVBQW1FO0VBQy9ELElBQUl0QyxNQUFNLEdBQUd1QyxTQUFTLENBQUNELEVBQUQsQ0FBdEI7O0VBQ0EsSUFBSSxDQUFDdEQsT0FBTyxDQUFDaUIsUUFBUixDQUFpQkQsTUFBTSxDQUFDWCxNQUF4QixDQUFMLEVBQXNDO0lBQ2xDTCxPQUFPLENBQUNXLElBQVIsQ0FBYUssTUFBTSxDQUFDWCxNQUFwQjtFQUNIO0FBQ0o7O0FBQ0QzQixVQUFVLENBQUNzRSxZQUFELEVBQWVoRCxPQUFmLENBQVY7O0FBQ0FnRCxZQUFZLENBQUNsRCxRQUFiLEdBQXdCLFlBQVk7RUFDaEMsSUFBSU8sTUFBTSxHQUFHMkMsWUFBWSxDQUFDNUUsWUFBYixDQUEwQixPQUExQixDQUFiO0VBQ0E2QixTQUFTLEdBQUcsRUFBWjs7RUFDQSxLQUFLLElBQUlhLEVBQUUsR0FBRyxDQUFULEVBQVkwQyxTQUFTLEdBQUd6RCxPQUE3QixFQUFzQ2UsRUFBRSxHQUFHMEMsU0FBUyxDQUFDMUUsTUFBckQsRUFBNkRnQyxFQUFFLEVBQS9ELEVBQW1FO0lBQy9ELElBQUlFLE1BQU0sR0FBR3dDLFNBQVMsQ0FBQzFDLEVBQUQsQ0FBdEI7O0lBQ0EsSUFBSUUsTUFBTSxDQUFDWCxNQUFQLElBQWlCQSxNQUFqQixJQUEyQixDQUFDSixTQUFTLENBQUNnQixRQUFWLENBQW1CRCxNQUFNLENBQUNWLE9BQTFCLENBQWhDLEVBQW9FO01BQ2hFTCxTQUFTLENBQUNVLElBQVYsQ0FBZUssTUFBTSxDQUFDVixPQUF0QjtJQUNIO0VBQ0o7O0VBQ0Q1QixVQUFVLENBQUN1RSxhQUFELEVBQWdCaEQsU0FBaEIsQ0FBVjtFQUNBVCxRQUFRLENBQUN5RCxhQUFELEVBQWdCRyxvQkFBaEIsQ0FBUjtFQUNBNUQsUUFBUSxDQUFDMEQsWUFBRCxFQUFlRyxtQkFBZixDQUFSO0VBQ0ExRCxXQUFXLENBQUNzRCxhQUFELEVBQWdCLEtBQWhCLENBQVg7RUFDQXRELFdBQVcsQ0FBQ3VELFlBQUQsRUFBZSxJQUFmLENBQVg7RUFDQXBHLEtBQUssQ0FBQ0MsSUFBTixDQUFXMEcsQ0FBQyxDQUFDLDRCQUFELENBQVosRUFBNEN6RyxPQUE1QyxDQUFvRCxVQUFVb0MsT0FBVixFQUFtQjtJQUNuRUEsT0FBTyxDQUFDZCxTQUFSLENBQWtCRyxNQUFsQixDQUF5QixTQUF6QjtFQUNILENBRkQ7RUFHQSxJQUFJaUYsVUFBVSxHQUFHRCxDQUFDLENBQUMsMkRBQTJEcEQsTUFBNUQsQ0FBbEI7RUFDQXNELEtBQUssQ0FBQ0MsTUFBTixDQUFhRixVQUFiO0FBQ0gsQ0FuQkQ7O0FBb0JBVCxhQUFhLENBQUNuRCxRQUFkLEdBQXlCLFlBQVk7RUFDakMsSUFBSVEsT0FBTyxHQUFHMkMsYUFBYSxDQUFDN0UsWUFBZCxDQUEyQixPQUEzQixDQUFkOztFQUNBLElBQUksQ0FBQ2tDLE9BQUwsRUFBYztJQUNWdEMsT0FBTyxDQUFDQyxLQUFSLENBQWMsb0RBQWQ7SUFDQTtFQUNIOztFQUNEaUMsT0FBTyxHQUFHLEVBQVY7O0VBQ0EsS0FBSyxJQUFJWSxFQUFFLEdBQUcsQ0FBVCxFQUFZK0MsU0FBUyxHQUFHOUQsT0FBN0IsRUFBc0NlLEVBQUUsR0FBRytDLFNBQVMsQ0FBQy9FLE1BQXJELEVBQTZEZ0MsRUFBRSxFQUEvRCxFQUFtRTtJQUMvRCxJQUFJRSxNQUFNLEdBQUc2QyxTQUFTLENBQUMvQyxFQUFELENBQXRCOztJQUNBLElBQUlFLE1BQU0sQ0FBQ1YsT0FBUCxJQUFrQkEsT0FBbEIsSUFBNkIsQ0FBQ0osT0FBTyxDQUFDZSxRQUFSLENBQWlCRCxNQUFNLENBQUNULE1BQXhCLENBQWxDLEVBQW1FO01BQy9ETCxPQUFPLENBQUNTLElBQVIsQ0FBYUssTUFBTSxDQUFDVCxNQUFwQjtJQUNIO0VBQ0o7O0VBQ0QsSUFBSUwsT0FBTyxDQUFDcEIsTUFBUixJQUFrQixDQUFsQixJQUF1Qm9CLE9BQU8sQ0FBQyxDQUFELENBQVAsS0FBZSxFQUExQyxFQUE4QztJQUMxQ1YsUUFBUSxDQUFDMEQsWUFBRCxFQUFlRyxtQkFBZixDQUFSO0lBQ0ExRCxXQUFXLENBQUN1RCxZQUFELEVBQWUsSUFBZixDQUFYO0VBQ0gsQ0FIRCxNQUlLO0lBQ0R4RSxVQUFVLENBQUN3RSxZQUFELEVBQWVoRCxPQUFmLENBQVY7SUFDQVYsUUFBUSxDQUFDMEQsWUFBRCxFQUFlRyxtQkFBZixDQUFSO0lBQ0ExRCxXQUFXLENBQUN1RCxZQUFELEVBQWUsS0FBZixDQUFYO0VBQ0g7O0VBQ0RwRyxLQUFLLENBQUNDLElBQU4sQ0FBVzBHLENBQUMsQ0FBQyw0QkFBRCxDQUFaLEVBQTRDekcsT0FBNUMsQ0FBb0QsVUFBVW9DLE9BQVYsRUFBbUI7SUFDbkVBLE9BQU8sQ0FBQ2QsU0FBUixDQUFrQkcsTUFBbEIsQ0FBeUIsU0FBekI7RUFDSCxDQUZEO0VBR0EsSUFBSXFGLE1BQU0sR0FBR3hELE9BQU8sQ0FBQ25ELE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsRUFBdEIsRUFBMEJBLE9BQTFCLENBQWtDLElBQWxDLEVBQXdDLEdBQXhDLENBQWI7RUFDQSxJQUFJdUcsVUFBVSxHQUFHRCxDQUFDLENBQUMsMkRBQTJESyxNQUE1RCxDQUFsQjtFQUNBSCxLQUFLLENBQUNDLE1BQU4sQ0FBYUYsVUFBYjtFQUNBNUcsS0FBSyxDQUFDQyxJQUFOLENBQVcwRyxDQUFDLENBQUMsZ0NBQWdDSyxNQUFqQyxDQUFaLEVBQXNEOUcsT0FBdEQsQ0FBOEQsVUFBVW9DLE9BQVYsRUFBbUI7SUFDN0VBLE9BQU8sQ0FBQ2QsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsU0FBdEI7RUFDSCxDQUZEO0FBR0gsQ0EvQkQ7O0FBZ0NBMkUsWUFBWSxDQUFDcEQsUUFBYixHQUF3QixZQUFZO0VBQ2hDLElBQUlTLE1BQU0sR0FBRzJDLFlBQVksQ0FBQzlFLFlBQWIsQ0FBMEIsT0FBMUIsQ0FBYjs7RUFDQSxJQUFJLENBQUNtQyxNQUFMLEVBQWE7SUFDVHZDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLGtEQUFkO0lBQ0E7RUFDSDs7RUFDRG5CLEtBQUssQ0FBQ0MsSUFBTixDQUFXMEcsQ0FBQyxDQUFDLDRCQUFELENBQVosRUFBNEN6RyxPQUE1QyxDQUFvRCxVQUFVb0MsT0FBVixFQUFtQjtJQUNuRUEsT0FBTyxDQUFDZCxTQUFSLENBQWtCRyxNQUFsQixDQUF5QixTQUF6QjtFQUNILENBRkQ7RUFHQSxJQUFJcUYsTUFBTSxHQUFHdkQsTUFBTSxDQUFDcEQsT0FBUCxDQUFlLElBQWYsRUFBcUIsRUFBckIsRUFBeUJBLE9BQXpCLENBQWlDLElBQWpDLEVBQXVDLEdBQXZDLENBQWI7RUFDQSxJQUFJdUcsVUFBVSxHQUFHRCxDQUFDLENBQUMsK0JBQStCSyxNQUEvQixHQUNiLCtCQURhLEdBQ3FCQSxNQUR0QixDQUFsQjtFQUVBaEgsS0FBSyxDQUFDQyxJQUFOLENBQVcwRyxDQUFDLENBQUMsZ0NBQWdDSyxNQUFqQyxDQUFaLEVBQXNEOUcsT0FBdEQsQ0FBOEQsVUFBVW9DLE9BQVYsRUFBbUI7SUFDN0VBLE9BQU8sQ0FBQ2QsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsU0FBdEI7RUFDSCxDQUZEO0VBR0FvRixLQUFLLENBQUNDLE1BQU4sQ0FBYUYsVUFBYjtBQUNILENBaEJEOztBQWlCQSxJQUFJSyxTQUFTLEdBQUduSCxRQUFRLENBQUMyRSxjQUFULENBQXdCLGFBQXhCLENBQWhCOztBQUNBLElBQUksQ0FBQ3dDLFNBQUwsRUFBZ0I7RUFDWixNQUFNLElBQUl2QyxLQUFKLENBQVUsMkNBQVYsQ0FBTjtBQUNIOztBQUNELElBQUltQyxLQUFLLEdBQUdLLE9BQU8sQ0FBQ0QsU0FBRCxFQUFZO0VBQzNCRSxTQUFTLEVBQUU7SUFDUEMsUUFBUSxFQUFFO0VBREg7QUFEZ0IsQ0FBWixDQUFuQjs7QUFLQSxTQUFTQyxRQUFULENBQWtCeEcsS0FBbEIsRUFBeUI7RUFDckIsSUFBSXhCLEVBQUo7O0VBQ0EsSUFBSSxDQUFDd0IsS0FBSyxDQUFDSSxNQUFYLEVBQW1CO0lBQ2ZDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLG1DQUFkO0lBQ0E7RUFDSDs7RUFDRCxJQUFJbUIsT0FBTyxHQUFHekIsS0FBSyxDQUFDSSxNQUFwQjtFQUNBcUIsT0FBTyxDQUFDZ0YsZ0JBQVIsR0FBMkJoRixPQUFPLENBQUNnRixnQkFBUixJQUE0QixJQUE1QixHQUFtQyxDQUFuQyxHQUF1Q2hGLE9BQU8sQ0FBQ2dGLGdCQUExRTs7RUFDQSxJQUFJaEYsT0FBTyxDQUFDZ0YsZ0JBQVIsSUFBNEIsQ0FBaEMsRUFBbUM7SUFDL0JwRyxPQUFPLENBQUNxRyxHQUFSLENBQVksd0NBQVo7SUFDQTtFQUNIOztFQUNELElBQUlDLGlCQUFpQixHQUFHLENBQUNuSSxFQUFFLEdBQUd3QixLQUFLLENBQUNJLE1BQU4sQ0FBYUksYUFBbkIsTUFBc0MsSUFBdEMsSUFBOENoQyxFQUFFLEtBQUssS0FBSyxDQUExRCxHQUE4RCxLQUFLLENBQW5FLEdBQXVFQSxFQUFFLENBQUNvQixzQkFBSCxDQUEwQiwwQkFBMUIsQ0FBL0Y7O0VBQ0EsSUFBSSxDQUFDK0csaUJBQUwsRUFBd0I7SUFDcEJ0RyxPQUFPLENBQUNDLEtBQVIsQ0FBYyx3Q0FBZDtJQUNBO0VBQ0g7O0VBQ0QsSUFBSXNHLEtBQUssR0FBRzVHLEtBQUssQ0FBQ0ksTUFBTixDQUFhUixzQkFBYixDQUFvQyxPQUFwQyxFQUE2QyxDQUE3QyxDQUFaOztFQUNBLElBQUksQ0FBQzZCLE9BQU8sQ0FBQ29GLE9BQWIsRUFBc0I7SUFDbEJwRixPQUFPLENBQUNvRixPQUFSLEdBQWtCLElBQWxCO0lBQ0FwRixPQUFPLENBQUNqQixhQUFSLENBQXNCRyxTQUF0QixDQUFnQ0MsR0FBaEMsQ0FBb0MsU0FBcEM7SUFDQWEsT0FBTyxDQUFDZ0YsZ0JBQVIsSUFBNEIsQ0FBNUI7SUFDQSxDQUFDLEdBQUczSCxTQUFTLENBQUNnSSxjQUFkLEVBQThCRixLQUE5QixFQUFxQyxJQUFJOUgsU0FBUyxDQUFDaUksU0FBZCxDQUF3QmpJLFNBQVMsQ0FBQ2tJLGFBQVYsQ0FBd0JDLGlCQUFoRCxFQUFtRUMsU0FBbkUsRUFBOEVBLFNBQTlFLEVBQXlGcEksU0FBUyxDQUFDcUksaUJBQVYsQ0FBNEJDLE1BQXJILEVBQTZILFlBQVk7TUFDMUszRixPQUFPLENBQUNnRixnQkFBUixJQUE0QixDQUE1QjtNQUNBRyxLQUFLLENBQUMzRCxLQUFOLENBQVlDLE9BQVosR0FBc0IsTUFBdEI7SUFDSCxDQUhvQyxDQUFyQztJQUlBL0QsS0FBSyxDQUFDQyxJQUFOLENBQVd1SCxpQkFBWCxFQUE4QnRILE9BQTlCLENBQXNDLFVBQVVnSSxnQkFBVixFQUE0QjtNQUM5RDVGLE9BQU8sQ0FBQ2dGLGdCQUFSLElBQTRCLENBQTVCO01BQ0EsQ0FBQyxHQUFHM0gsU0FBUyxDQUFDZ0ksY0FBZCxFQUE4Qk8sZ0JBQTlCLEVBQWdELElBQUl2SSxTQUFTLENBQUNpSSxTQUFkLENBQXdCakksU0FBUyxDQUFDa0ksYUFBVixDQUF3Qk0sTUFBaEQsRUFBd0RKLFNBQXhELEVBQW1FQSxTQUFuRSxFQUE4RUEsU0FBOUUsRUFBeUYsWUFBWTtRQUNqSnpGLE9BQU8sQ0FBQ2dGLGdCQUFSLElBQTRCLENBQTVCO01BQ0gsQ0FGK0MsQ0FBaEQ7SUFHSCxDQUxEO0VBTUgsQ0FkRCxNQWVLO0lBQ0RoRixPQUFPLENBQUNnRixnQkFBUixJQUE0QixDQUE1QjtJQUNBRyxLQUFLLENBQUMzRCxLQUFOLENBQVlDLE9BQVosR0FBc0IsT0FBdEI7SUFDQSxDQUFDLEdBQUdwRSxTQUFTLENBQUNnSSxjQUFkLEVBQThCRixLQUE5QixFQUFxQyxJQUFJOUgsU0FBUyxDQUFDaUksU0FBZCxDQUF3QmpJLFNBQVMsQ0FBQ2tJLGFBQVYsQ0FBd0JPLGlCQUFoRCxFQUFtRUwsU0FBbkUsRUFBOEVBLFNBQTlFLEVBQXlGcEksU0FBUyxDQUFDcUksaUJBQVYsQ0FBNEJDLE1BQXJILEVBQTZILFlBQVk7TUFDMUszRixPQUFPLENBQUNnRixnQkFBUixJQUE0QixDQUE1Qjs7TUFDQSxJQUFJaEYsT0FBTyxDQUFDZ0YsZ0JBQVIsSUFBNEIsQ0FBaEMsRUFBbUM7UUFDL0JoRixPQUFPLENBQUNvRixPQUFSLEdBQWtCLEtBQWxCO1FBQ0FwRixPQUFPLENBQUNqQixhQUFSLENBQXNCRyxTQUF0QixDQUFnQ0csTUFBaEMsQ0FBdUMsU0FBdkM7TUFDSDtJQUNKLENBTm9DLENBQXJDO0lBT0EzQixLQUFLLENBQUNDLElBQU4sQ0FBV3VILGlCQUFYLEVBQThCdEgsT0FBOUIsQ0FBc0MsVUFBVWdJLGdCQUFWLEVBQTRCO01BQzlENUYsT0FBTyxDQUFDZ0YsZ0JBQVIsSUFBNEIsQ0FBNUI7TUFDQSxDQUFDLEdBQUczSCxTQUFTLENBQUNnSSxjQUFkLEVBQThCTyxnQkFBOUIsRUFBZ0QsSUFBSXZJLFNBQVMsQ0FBQ2lJLFNBQWQsQ0FBd0JqSSxTQUFTLENBQUNrSSxhQUFWLENBQXdCUSxPQUFoRCxFQUF5RE4sU0FBekQsRUFBb0VBLFNBQXBFLEVBQStFcEksU0FBUyxDQUFDcUksaUJBQVYsQ0FBNEJDLE1BQTNHLEVBQW1ILFlBQVk7UUFDM0szRixPQUFPLENBQUNnRixnQkFBUixJQUE0QixDQUE1Qjs7UUFDQSxJQUFJaEYsT0FBTyxDQUFDZ0YsZ0JBQVIsSUFBNEIsQ0FBaEMsRUFBbUM7VUFDL0JoRixPQUFPLENBQUNvRixPQUFSLEdBQWtCLEtBQWxCO1VBQ0FwRixPQUFPLENBQUNqQixhQUFSLENBQXNCRyxTQUF0QixDQUFnQ0csTUFBaEMsQ0FBdUMsU0FBdkM7UUFDSDtNQUNKLENBTitDLENBQWhEO0lBT0gsQ0FURDtFQVVIO0FBQ0o7O0FBQ0QsSUFBSTJHLGdCQUFnQixHQUFHeEksUUFBUSxDQUFDVyxzQkFBVCxDQUFnQyxpQkFBaEMsQ0FBdkI7QUFDQVQsS0FBSyxDQUFDQyxJQUFOLENBQVdxSSxnQkFBWCxFQUE2QnBJLE9BQTdCLENBQXFDLFVBQVVxSSxjQUFWLEVBQTBCO0VBQzNEQSxjQUFjLENBQUMzSCxnQkFBZixDQUFnQyxPQUFoQyxFQUF5Q3lHLFFBQXpDO0FBQ0gsQ0FGRCJ9
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