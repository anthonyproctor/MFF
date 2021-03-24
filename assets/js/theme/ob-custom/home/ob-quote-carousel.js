import "slick-carousel"

export default function() {

  $('.ob-testimonials-panel .quotes-container').slick({
    dots: false,
    infinite: true,
    arrows: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  });

}
