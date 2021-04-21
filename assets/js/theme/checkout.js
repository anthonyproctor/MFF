import 'regenerator-runtime';
import PageManager from './page-manager';
import axios from 'axios';
import reactTriggerChange from 'react-trigger-change';
// Mutation Listener is an IIFE so there's no need to call it - it appends a function to the global window.
import './ob-custom/MutationListener';

export default class Checkout extends PageManager {
  constructor() {
    super();
    this.checkoutState = null;
    this.orderCommentsSelector = '.optimizedCheckout-form-input[name="orderComment"]'
    this.shippingMethodPreselected = false;
  }
  getCachedCheckoutState() {
    console.log("Getting Cached Delivery Options")

    const cachedStateJSON = window.localStorage.getItem('ob-shipping');

    if (cachedStateJSON) {
      this.checkoutState = JSON.parse(cachedStateJSON);
      console.log("Checkout State Set:", this.checkoutState)
    }

    if (!this.checkoutState) {
      console.error("[Warning]: Pickup/Delivery Customization not properly persisting data for this customer.")
      return false;

    }

    return true
  }

  generateShippingString(state) {
    const { shippingMethod, date, time, pickupLocationFull } = state;
    return `${shippingMethod} ${pickupLocationFull ? ` | Store: ${pickupLocationFull} | `: ''} Day: ${date}${time ? ` | Time: ${time}`: ''}`;
  }

  onReady() {
    // Cart icon clicks take you directly to the cart page
    $('[data-cart-preview]').on('click', (event) => window.location.href = '/cart.php');
    const valid = this.getCachedCheckoutState();
    
    if (!valid) {
      // Return early if there is no checkout state properly configured.
      console.error("Checkout state improperly configured..")
		$('[name="orderComment"]').val("empty");
      return;
    }
    if (valid && this.checkoutState.shippingMethod == 'Shipping') {
      console.log("Shipping-Colorodo: Default Checkout Flow.")
      window.listenForMutations('[data-test="checkout-shipping-comments"]', function(element) {

        // Clear Order Comments
        const $input = $(element).find('input');
        $input.val("");

        reactTriggerChange(element);
        $(element).addClass('ob-hidden');
      });

      return;
    }

    // Allows us to access 'this' context of current instance from callbacks passed to Mutation Listener
    const that = this;

    window.listenForMutations('#checkout-app', async function(element) {
      const cartResponse = await axios.get('/api/storefront/carts/');
      that.checkoutID = cartResponse.data[0].id;
	  
      if (that.checkoutState) {
        const stateString = that.generateShippingString(that.checkoutState);
        const checkoutUpdateURL =  `/api/storefront/checkouts/${that.checkoutID }`;
        await axios.put(
            checkoutUpdateURL, { customerMessage: stateString }
        );

        $(that.orderCommentsSelector).val(stateString);
        const orderCommentsDOMNode = document.querySelector(that.orderCommentsSelector);

        window.localStorage.setItem('orderComment', stateString)

        reactTriggerChange(orderCommentsDOMNode);

        // Force click back to shipping step if possible
        const $triggerShippingStepButton = $('.checkout-step.optimizedCheckout-checkoutStep.checkout-step--shipping .stepHeader [data-test="step-edit-button"]');
        $triggerShippingStepButton.click();
    
      }
    });

    window.listenForMutations('#checkoutShippingAddress', function(element) {
      // Always hide the "My Billing Address is the same as Shipping Element"
      $('#sameAsBilling').parent('.form-field').addClass('ob-hidden');
      // Lock the Order Comments field.
      $(that.orderCommentsSelector).attr('readonly', true);

      that.shippingMethodPreselected = false;
    });


    // By passing in 'true', we will listen for every. single. mutation. on the shipping options container.
    window.listenForMutations('#checkout-shipping-options .shippingOptions-container', function(element){
		
      if ($('.dropdownMenu').length) return // Return early to prevent constant mutations.

      let { checkoutState: { shippingMethod } } = that;

      if(shippingMethod !== "Pickup")
        shippingMethod = "Delivery"

      const $shippingMethodToPreselect = $(`span.shippingOption-desc:contains("${shippingMethod}")`);

      if ($shippingMethodToPreselect.length) {

        const $preselectedMethodParentFormField = $shippingMethodToPreselect.parents('.shippingOptions-container .form-field');
        const $formFieldsToHide = $('.shippingOptions-container .form-field').not($preselectedMethodParentFormField);

        $formFieldsToHide.parents('.form-checklist-item').addClass('ob-hidden');

        if (!that.shippingMethodPreselected) {
          setTimeout(function() {
            $shippingMethodToPreselect.parents('.form-label.optimizedCheckout-form-label').click();
            that.shippingMethodPreselected = true;
          }, 1000)
        }

        const stateString = that.generateShippingString(that.checkoutState);
        $(that.orderCommentsSelector).val(stateString);

        const orderCommentsDOMNode = document.querySelector(that.orderCommentsSelector);
        window.localStorage.setItem('orderComment', stateString)
        reactTriggerChange(orderCommentsDOMNode);

        const url =  `/api/storefront/checkouts/${that.checkoutID }`;
        axios.put(
          url, { customerMessage: stateString }
        );
      } else {
        console.log("Shipping Option Names are not configured correctly - must be 'Pickup' or 'Delivery'")
      }
    }, true);
  }
}
