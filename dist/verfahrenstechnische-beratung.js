(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

$(function () {
  //-------- Create slider ----------
  $('#cms-slider').slick({
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 8000,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('#cms-slider2').slick({
    arrows: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 8000,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  }); //--------- Custom Nav ---------

  $('#cms-slider-right').on('click', function () {
    $('#cms-slider').slick('slickNext');
  });
  $('#cms-slider-left').on('click', function () {
    $('#cms-slider').slick('slickPrev');
  });
  $('#cms-slider-right2').on('click', function () {
    $('#cms-slider2').slick('slickNext');
  });
  $('#cms-slider-left2').on('click', function () {
    $('#cms-slider2').slick('slickPrev');
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwic2xpY2siLCJhcnJvd3MiLCJpbmZpbml0ZSIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwib24iXSwic291cmNlcyI6WyJmYWtlXzM0Y2ExODc0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xuICAgIC8vLS0tLS0tLS0gQ3JlYXRlIHNsaWRlciAtLS0tLS0tLS0tXG4gICAgJCgnI2Ntcy1zbGlkZXInKS5zbGljayh7XG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMDAsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAkKCcjY21zLXNsaWRlcjInKS5zbGljayh7XG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgIGF1dG9wbGF5U3BlZWQ6IDgwMDAsXG4gICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgIHJlc3BvbnNpdmU6IFt7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogMTAyNCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc2OCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICAvLy0tLS0tLS0tLSBDdXN0b20gTmF2IC0tLS0tLS0tLVxuICAgICQoJyNjbXMtc2xpZGVyLXJpZ2h0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY21zLXNsaWRlcicpLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICB9KTtcbiAgICAkKCcjY21zLXNsaWRlci1sZWZ0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY21zLXNsaWRlcicpLnNsaWNrKCdzbGlja1ByZXYnKTtcbiAgICB9KTtcbiAgICAkKCcjY21zLXNsaWRlci1yaWdodDInKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjbXMtc2xpZGVyMicpLnNsaWNrKCdzbGlja05leHQnKTtcbiAgICB9KTtcbiAgICAkKCcjY21zLXNsaWRlci1sZWZ0MicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2Ntcy1zbGlkZXIyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuICAgIH0pO1xufSk7XG4iXSwibWFwcGluZ3MiOiI7O0FBQUFBLENBQUMsQ0FBQyxZQUFZO0VBQ1Y7RUFDQUEsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQkMsS0FBakIsQ0FBdUI7SUFDbkJDLE1BQU0sRUFBRSxLQURXO0lBRW5CQyxRQUFRLEVBQUUsSUFGUztJQUduQkMsUUFBUSxFQUFFLEtBSFM7SUFJbkJDLGFBQWEsRUFBRSxJQUpJO0lBS25CQyxLQUFLLEVBQUUsR0FMWTtJQU1uQkMsWUFBWSxFQUFFLENBTks7SUFPbkJDLGNBQWMsRUFBRSxDQVBHO0lBUW5CQyxVQUFVLEVBQUUsQ0FBQztNQUNMQyxVQUFVLEVBQUUsSUFEUDtNQUVMQyxRQUFRLEVBQUU7UUFDTkosWUFBWSxFQUFFO01BRFI7SUFGTCxDQUFELEVBTVI7TUFDSUcsVUFBVSxFQUFFLEdBRGhCO01BRUlDLFFBQVEsRUFBRTtRQUNOSixZQUFZLEVBQUU7TUFEUjtJQUZkLENBTlE7RUFSTyxDQUF2QjtFQXNCQVAsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQkMsS0FBbEIsQ0FBd0I7SUFDcEJDLE1BQU0sRUFBRSxLQURZO0lBRXBCQyxRQUFRLEVBQUUsSUFGVTtJQUdwQkMsUUFBUSxFQUFFLEtBSFU7SUFJcEJDLGFBQWEsRUFBRSxJQUpLO0lBS3BCQyxLQUFLLEVBQUUsR0FMYTtJQU1wQkMsWUFBWSxFQUFFLENBTk07SUFPcEJDLGNBQWMsRUFBRSxDQVBJO0lBUXBCQyxVQUFVLEVBQUUsQ0FBQztNQUNMQyxVQUFVLEVBQUUsSUFEUDtNQUVMQyxRQUFRLEVBQUU7UUFDTkosWUFBWSxFQUFFO01BRFI7SUFGTCxDQUFELEVBTVI7TUFDSUcsVUFBVSxFQUFFLEdBRGhCO01BRUlDLFFBQVEsRUFBRTtRQUNOSixZQUFZLEVBQUU7TUFEUjtJQUZkLENBTlE7RUFSUSxDQUF4QixFQXhCVSxDQThDVjs7RUFDQVAsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJZLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7SUFDM0NaLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJDLEtBQWpCLENBQXVCLFdBQXZCO0VBQ0gsQ0FGRDtFQUdBRCxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQlksRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBWTtJQUMxQ1osQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQkMsS0FBakIsQ0FBdUIsV0FBdkI7RUFDSCxDQUZEO0VBR0FELENBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCWSxFQUF4QixDQUEyQixPQUEzQixFQUFvQyxZQUFZO0lBQzVDWixDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCQyxLQUFsQixDQUF3QixXQUF4QjtFQUNILENBRkQ7RUFHQUQsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUJZLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLFlBQVk7SUFDM0NaLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JDLEtBQWxCLENBQXdCLFdBQXhCO0VBQ0gsQ0FGRDtBQUdILENBM0RBLENBQUQifQ==
},{}]},{},[1])