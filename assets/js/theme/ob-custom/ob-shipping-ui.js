import { 
  shippingPluginSelectors,
} from './ob-shipping-data';

const { 
  pickupSectionSelector,
  deliverySectionSelector,
  zipCodeInputSelector,
  zipCodeValidationMessageSelector,
  zipCodeButtonSelector,
  pickupRadioInputSelector,
  checkoutValidationMessageSelector
} = shippingPluginSelectors;

function resetPickupRadioInputState() {
  $(pickupRadioInputSelector).prop('checked', false);
}

function setZipCodeValidationMessage(message, type) {
  $(zipCodeValidationMessageSelector).text(message);

  // Reset validation state on each iteration

  $(zipCodeValidationMessageSelector).attr('class', 'validation-message');
  $(zipCodeInputSelector).removeAttr('class');

  if (type) {
    $(zipCodeValidationMessageSelector).addClass(type);
    $(zipCodeInputSelector).addClass(type);
  }
}

function setCheckoutValidationMessage(message, type) {
    
    $(checkoutValidationMessageSelector).text(message);

  // Reset validation state on each iteration

    $(checkoutValidationMessageSelector).attr('class', 'validation-message');

  if (type) {
    $(checkoutValidationMessageSelector).addClass(type);
  }
}

function setZipCodeButtonMessage(message) {
  $(zipCodeButtonSelector).text(message);
}

function showSection(method) {
  if (method === 'Pickup') {
    toggleSectionVisibility(pickupSectionSelector, 'show')
  } else if (method === 'Colorado,') {
    toggleSectionVisibility(deliverySectionSelector, 'show')
  } else if (method === 'Oregon,') {
    toggleSectionVisibility(deliverySectionSelector, 'show')
  }
}

function toggleSectionVisibility(selector, toggleState) {
  if (toggleState === 'show') {
    $(selector).removeClass('hidden-section');
  } else if (toggleState === 'hide') {
    $(selector).addClass('hidden-section');
  }
}

function clearButtonUIState(selector) {
  $(selector).removeClass('active');
}

function clearCachedStateElement() {
  $('#cached-shipping-details').html('');
}

function generateCachedStateElement(state) {
  console.log("Building Cached State");
  console.log(state)
  const $container = $('#cached-shipping-details');
  if (state.shippingMethod) {
    $(`<div class="cached-line-item shipping-method"> ${state.shippingMethod} </div>`)
      .appendTo($container)
  }
  console.log(state.pickupLocationFull)
  if (state.shippingMethod === 'Pickup' && state.pickupLocationFull) {
    $(`<div class="cached-line-item pickup-location">Location: ${state.pickupLocationFull}</div>`)
    .appendTo($container);
  }
  if (state.date) {
    $(`<div class="cached-line-item shipping-date">Date: ${new Date(state.date).toDateString()} </div>`)
      .appendTo($container);
  }
  if (state.shippingMethod === 'Colorado,' && state.time) {
    $(`<div class="cached-line-item shipping-time">Time: ${state.time}</div>`)
      .appendTo($container);
  }
  if (state.shippingMethod === 'Oregon,' && state.time) {
    $(`<div class="cached-line-item shipping-time">Time: ${state.time}</div>`)
      .appendTo($container);
  }
  $('<button id="change-shipping-details" class="button button--primary" >Change Shipping Details</div>')
    .appendTo($container);
}

export {
  resetPickupRadioInputState,
  setZipCodeValidationMessage,
  setCheckoutValidationMessage,
  setZipCodeButtonMessage,
  showSection,
  toggleSectionVisibility,
  generateCachedStateElement,
  clearCachedStateElement,
  clearButtonUIState
}
