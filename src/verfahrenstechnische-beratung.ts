$(function () {

  //-------- Create slider ----------

  ($('#cms-slider') as any).slick({
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
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
    ]
  });

  ($('#cms-slider2') as any).slick({
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
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }
    ]
  });

  //--------- Custom Nav ---------

  $('#cms-slider-right').on('click', function () {
    ($('#cms-slider') as any).slick('slickNext');
  });
  $('#cms-slider-left').on('click', function () {
    ($('#cms-slider') as any).slick('slickPrev');
  });
  $('#cms-slider-right2').on('click', function () {
    ($('#cms-slider2') as any).slick('slickNext');
  });
  $('#cms-slider-left2').on('click', function () {
    ($('#cms-slider2') as any).slick('slickPrev');
  });
});