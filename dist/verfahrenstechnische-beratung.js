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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyIkIiwic2xpY2siLCJhcnJvd3MiLCJpbmZpbml0ZSIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsInNwZWVkIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJyZXNwb25zaXZlIiwiYnJlYWtwb2ludCIsInNldHRpbmdzIiwib24iXSwic291cmNlcyI6WyJmYWtlXzk5ZDNkZjAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG4gICAgLy8tLS0tLS0tLSBDcmVhdGUgc2xpZGVyIC0tLS0tLS0tLS1cbiAgICAkKCcjY21zLXNsaWRlcicpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwMCxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgICQoJyNjbXMtc2xpZGVyMicpLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgYXV0b3BsYXlTcGVlZDogODAwMCxcbiAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMDI0LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzY4LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgIC8vLS0tLS0tLS0tIEN1c3RvbSBOYXYgLS0tLS0tLS0tXG4gICAgJCgnI2Ntcy1zbGlkZXItcmlnaHQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjbXMtc2xpZGVyJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuICAgIH0pO1xuICAgICQoJyNjbXMtc2xpZGVyLWxlZnQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNjbXMtc2xpZGVyJykuc2xpY2soJ3NsaWNrUHJldicpO1xuICAgIH0pO1xuICAgICQoJyNjbXMtc2xpZGVyLXJpZ2h0MicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI2Ntcy1zbGlkZXIyJykuc2xpY2soJ3NsaWNrTmV4dCcpO1xuICAgIH0pO1xuICAgICQoJyNjbXMtc2xpZGVyLWxlZnQyJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjY21zLXNsaWRlcjInKS5zbGljaygnc2xpY2tQcmV2Jyk7XG4gICAgfSk7XG59KTtcbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsQ0FBQyxDQUFDLFlBQVk7RUFDVjtFQUNBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCQyxLQUFqQixDQUF1QjtJQUNuQkMsTUFBTSxFQUFFLEtBRFc7SUFFbkJDLFFBQVEsRUFBRSxJQUZTO0lBR25CQyxRQUFRLEVBQUUsS0FIUztJQUluQkMsYUFBYSxFQUFFLElBSkk7SUFLbkJDLEtBQUssRUFBRSxHQUxZO0lBTW5CQyxZQUFZLEVBQUUsQ0FOSztJQU9uQkMsY0FBYyxFQUFFLENBUEc7SUFRbkJDLFVBQVUsRUFBRSxDQUFDO01BQ0xDLFVBQVUsRUFBRSxJQURQO01BRUxDLFFBQVEsRUFBRTtRQUNOSixZQUFZLEVBQUU7TUFEUjtJQUZMLENBQUQsRUFNUjtNQUNJRyxVQUFVLEVBQUUsR0FEaEI7TUFFSUMsUUFBUSxFQUFFO1FBQ05KLFlBQVksRUFBRTtNQURSO0lBRmQsQ0FOUTtFQVJPLENBQXZCO0VBc0JBUCxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCQyxLQUFsQixDQUF3QjtJQUNwQkMsTUFBTSxFQUFFLEtBRFk7SUFFcEJDLFFBQVEsRUFBRSxJQUZVO0lBR3BCQyxRQUFRLEVBQUUsS0FIVTtJQUlwQkMsYUFBYSxFQUFFLElBSks7SUFLcEJDLEtBQUssRUFBRSxHQUxhO0lBTXBCQyxZQUFZLEVBQUUsQ0FOTTtJQU9wQkMsY0FBYyxFQUFFLENBUEk7SUFRcEJDLFVBQVUsRUFBRSxDQUFDO01BQ0xDLFVBQVUsRUFBRSxJQURQO01BRUxDLFFBQVEsRUFBRTtRQUNOSixZQUFZLEVBQUU7TUFEUjtJQUZMLENBQUQsRUFNUjtNQUNJRyxVQUFVLEVBQUUsR0FEaEI7TUFFSUMsUUFBUSxFQUFFO1FBQ05KLFlBQVksRUFBRTtNQURSO0lBRmQsQ0FOUTtFQVJRLENBQXhCLEVBeEJVLENBOENWOztFQUNBUCxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QlksRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBWTtJQUMzQ1osQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQkMsS0FBakIsQ0FBdUIsV0FBdkI7RUFDSCxDQUZEO0VBR0FELENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCWSxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxZQUFZO0lBQzFDWixDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCQyxLQUFqQixDQUF1QixXQUF2QjtFQUNILENBRkQ7RUFHQUQsQ0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JZLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFlBQVk7SUFDNUNaLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JDLEtBQWxCLENBQXdCLFdBQXhCO0VBQ0gsQ0FGRDtFQUdBRCxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QlksRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBWTtJQUMzQ1osQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQkMsS0FBbEIsQ0FBd0IsV0FBeEI7RUFDSCxDQUZEO0FBR0gsQ0EzREEsQ0FBRCJ9
},{}]},{},[1])