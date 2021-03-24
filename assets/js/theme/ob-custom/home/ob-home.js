import PageManager from '../../page-manager';

//ob custom
import quoteCarousel from "./ob-quote-carousel"
import popularCarousel from "./ob-popular-carousel"
import newMealCarousel from "./ob-new-meal-carousel"
import instagramFeed from "./ob-instagram-feed"


export default class Home extends PageManager {
  constructor(context) {
        super(context);
  }
  
  onReady() {
    quoteCarousel()
    popularCarousel()
    newMealCarousel()
    instagramFeed()

    setTimeout(function(){ 
    	$('.fit-meals-btn').animate({bottom: "0", opacity: "1"}, {duration: "slow"});
    }, 1500);
  }
}
