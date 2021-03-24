import "slick-carousel"

export default function() {

  $('.ob-popular-panel .slide-wrapper').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  });

}
