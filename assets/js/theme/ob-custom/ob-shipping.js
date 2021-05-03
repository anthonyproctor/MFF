import swal from '../global/sweet-alert';
import flatpickr from 'flatpickr';
import moment from 'moment-timezone';

let momentDateFormat = 'YYYY-MM-DD';
let momentDateTimeFormat = 'YYYY-MM-DD HH:mm';

import { retailLocations, satelliteLocations } from './ob-pickup-locations'

import {
  shippingModalHTML,
  shippingZipCodes,
  zipCodeValidationMessages,
  shippingPluginSelectors,
  calendarConfig
} from './ob-shipping-data';

import {
  resetPickupRadioInputState,
  setZipCodeValidationMessage,
  setCheckoutValidationMessage,
  setZipCodeButtonMessage,
  showSection,
  toggleSectionVisibility,
  clearButtonUIState,
  generateCachedStateElement,
  clearCachedStateElement
} from './ob-shipping-ui';

const {
  shippingMethodButtonSelector,
  pickupSectionSelector,
  deliverySectionSelector,
  calendarSectionSelector,
  pickupRadioInputSelector,
  flatpickrInstanceSelector,
  zipCodeInputSelector,
  zipCodeButtonSelector,
  deliveryTimePickerButtonsSelector,
  confirmDetailsSelector,
  deliveryTimeGroupSelector
} = shippingPluginSelectors;


const initialState = {
  shippingMethod: null,
  zipCode: null,
  time: null,
  date: null,
  validated: null,
}

let state = initialState;
let calendar = null;

export default function bindPreCheckoutShippingStage() {

  const persistedStateJSON = window.localStorage.getItem('ob-shipping');
  const timeSet = window.localStorage.getItem('ob-cached-time');

  if (persistedStateJSON) {
    const persistedState = JSON.parse(persistedStateJSON);
    if (!timeSet) {
      resetCachedState();
    } else if (timeSet) {
      console.log(`Cache was set: ${timeSet}`)
      const timeSetMoment = moment(timeSet, momentDateTimeFormat);
      const expirationTime = timeSetMoment.add(1, 'hours');
      const currentMomentCutoff = moment();
      console.log(`Current Time: ${currentMomentCutoff.format(momentDateTimeFormat)}`);
      console.log(`Cache Expiration: ${expirationTime.format(momentDateTimeFormat)}`);
      if (currentMomentCutoff.isAfter(expirationTime)) {
        console.log("Clearing cache after 1 hours.");
        resetCachedState()
      } else {
        console.log("Re-building cached state.")
        reBuildCachedState(persistedState);
      }
    }
  }
  $('#ob-shipping-checkout-trigger').on('click', deferCheckoutAndTriggerPopup);
}

function reBuildCachedState(persistedState) {
  state = persistedState;
  generateCachedStateElement(state);
  $('#change-shipping-details').on('click', changeShippingDetails);
}


function resetCachedState() {
  state = initialState;
  window.localStorage.removeItem('ob-shipping');
  window.localStorage.removeItem('ob-cached-time')
}

function changeShippingDetails(event) {
  initShipping({
    changeDetails: true,
  });
}
function deferCheckoutAndTriggerPopup(event) {
  event.preventDefault();
  if (state.validated || state.shippingMethod === 'Shipping') {
    window.location.href = "/checkout.php";
  } else {
    initShipping();
  }
}

function initShipping(config = {}) {
  const { changeDetails } = config;
  showShippingModal();
  bindEvents();
  if (changeDetails) {
    $('.ob-shipping-modal').attr('edit-modal', true);
  }
}

function showShippingModal() {
  // Clear state on fresh modal.
  // This is an issue with the persisted state.
  state = initialState;
  swal.fire({
    icon: "info",
    html: shippingModalHTML,
    allowOutsideClick: false,
    showConfirmButton: false,
    customClass: 'ob-shipping-modal'
  });

  buildPickupLocationsHTML()
}

function buildPickupLocationsHTML() {
  retailLocations.forEach(loc => {
    buildLoc(loc, 'retail')
  })
  satelliteLocations.forEach(loc => {
    buildLoc(loc, 'satellite')
  })
}

function buildLoc(loc, locType) {
    let storeHours = ""
    for (const [day, hours] of Object.entries(loc.hours)) {
      if(hours) {
        storeHours += `<span>${day}: ${hours}</span>`
      }
    }
    let template = `
    <div class="label-input-container">
      <input type="radio" id="pickup-${loc.input_id}" name="pickup" value="${loc.name}">
      <label for="pickup-${loc.input_id}"> <span style="font-weight:600">${loc.name}</span>
        <label class="collapse" for="_${loc.id}">hours</label>
        <input id="_${loc.id}" type="checkbox">
        <div class="extra-info">
          <p>${loc.address}</p>
          <p>Store hours
            <div id="store-hours-contain">${storeHours}</div>
          </p>
          <p>Please place orders before 3:15pm for next-day pickup</p>
        </div>
      </label>
    </div>`
    $(`#pickup-radio-group-${locType}`).append(template)
}

function bindEvents() {
  $(shippingMethodButtonSelector).on('click', handleShippingMethodSelection);
  $(pickupRadioInputSelector).on('change', handlePickupLocationChange);
  $(zipCodeButtonSelector).on('click', handleZipCodeVerification);
  $(deliveryTimePickerButtonsSelector).on('click', handleDeliveryTimePicker);
  $(confirmDetailsSelector).on('click', confirmDetailsAndAllowCheckout);
}

// Event Handlers
function handleShippingMethodSelection(event) {
  const $currentButton = $(event.currentTarget);
  const shippingMethod = $currentButton.data('method');

  if (shippingMethod == 'Shipping') {	
    // Bypass Script - Default Checkout Flow.	
    state = {	
      shippingMethod	
    }	

    const timeStateCached = moment().format(momentDateTimeFormat);	

    window.localStorage.setItem('ob-shipping', JSON.stringify(state));	
    window.localStorage.setItem('ob-cached-time', timeStateCached);	

    $currentButton.addClass('active');	
    $currentButton.text("Proceeding to Checkout...");	

    window.location.href = '/checkout.php';	
  }

  if (state.shippingMethod !== shippingMethod) {
    clearButtonUIState(shippingMethodButtonSelector);
    clearButtonUIState(deliveryTimePickerButtonsSelector);
    triggerShippingStateReset();
    $currentButton.addClass('active');

    // Set Application State - Shipping Method
    state = {
      shippingMethod
    }
    showSection(shippingMethod);
  } else {
    console.log("No state change required.");
  }
  console.log(state);
}

function handleZipCodeVerification(event) {
  // Reset Button UI State before validating
  setZipCodeButtonMessage("Validating Zip Code");
  $(zipCodeButtonSelector).attr('class', 'zip-code-verification-button');

  const zipCodeString = $(zipCodeInputSelector).val();
  if (zipCodeString.length < 5) {
    setZipCodeButtonMessage("Verify Zip Code");
    return setZipCodeValidationMessage(zipCodeValidationMessages.noZip, 'error');
  }

  const zipCode = Number(zipCodeString);

  setZipCodeValidationMessage('');

  if (zipCode) {
    const validZipCode = shippingZipCodes.includes(zipCode)

    if (!validZipCode) {

      setZipCodeButtonMessage("Verify Zip Code");
      setZipCodeValidationMessage(zipCodeValidationMessages.noDelivery, 'error');

  } else if (state.shippingMethod === 'Colorado,'){

      state.zipCode = zipCode;

      setZipCodeButtonMessage("Zip Code Accepted");
      setZipCodeValidationMessage(zipCodeValidationMessages.success, 'success');
      $(zipCodeButtonSelector).addClass('success');

      buildCalendar('Colorado,');
      toggleSectionVisibility(deliveryTimeGroupSelector, 'show');
    } else if (state.shippingMethod === 'Oregon,'){

      state.zipCode = zipCode;

      setZipCodeButtonMessage("Zip Code Accepted");
      setZipCodeValidationMessage(zipCodeValidationMessages.success, 'success');
      $(zipCodeButtonSelector).addClass('success');

      buildCalendar('Oregon,');
      toggleSectionVisibility(deliveryTimeGroupSelector, 'show');
    } else if (state.shippingMethod === 'Texas,'){

      state.zipCode = zipCode;

      setZipCodeButtonMessage("Zip Code Accepted");
      setZipCodeValidationMessage(zipCodeValidationMessages.success, 'success');
      $(zipCodeButtonSelector).addClass('success');

      buildCalendar('Texas,');
      toggleSectionVisibility(deliveryTimeGroupSelector, 'show');
    }

  } else {

    setZipCodeButtonMessage("Verify Zip Code");
    setZipCodeValidationMessage(zipCodeValidationMessages.noZip, 'error');

  }
}

function handleDeliveryTimePicker(event) {
  clearButtonUIState(deliveryTimePickerButtonsSelector);
  const $currentButton = $(event.currentTarget);
  $currentButton.addClass('active');
  const time = $currentButton.attr('value');
  state.time = time;
}

function handlePickupLocationChange(event) {
  const $currentRadioInput = $(event.currentTarget);
  const id = $currentRadioInput.attr('id');
  const choice = event.target.value;
  destroyCalendar();
  buildCalendar(id);
  state.pickupLocationFull = choice;
  state.pickupLocationShort = id;
}

function handleDateChange(dateArray, pickedDate, instanceConfiguration) {
  state.date = pickedDate;
}

function confirmDetailsAndAllowCheckout(event) {
  if (validateState(state)) {
    state.validated = true;

    const timeStateCached = moment().format(momentDateTimeFormat);

    window.localStorage.setItem('ob-shipping', JSON.stringify(state));
    window.localStorage.setItem('ob-cached-time', timeStateCached);

    const isEditAction = $('.ob-shipping-modal').attr('edit-modal');

    if (isEditAction) {
      clearCachedStateElement();
      generateCachedStateElement(state);
      $('#change-shipping-details').on('click', changeShippingDetails);
      return swal.close();
    } else {
      window.location.href = "/checkout.php";
    }
  }
}

function validateState(state) {
  setCheckoutValidationMessage("");
  if (!state.shippingMethod) {
    setCheckoutValidationMessage("Please select a shipping method", "error");
  } else if (!state.date) {
    setCheckoutValidationMessage(`Please select a ${state.shippingMethod} date`, "error");
  } else if (state.shippingMethod === 'Pickup' && !state.pickupLocationShort) {
    setCheckoutValidationMessage(`Please select a pickup location.`, "error");
  } else if (state.shippingMethod === 'Colorado,' && !state.time) {
    setCheckoutValidationMessage(`Please select a delivery time.`, "error");
  } else if (state.shippingMethod === 'Oregon,' && !state.time) {
    setCheckoutValidationMessage(`Please select a delivery time.`, "error");
  } else if (state.shippingMethod === 'Texas,' && !state.time) {
    setCheckoutValidationMessage(`Please select a delivery time.`, "error");
  } else {

    return true;
  }
}

function triggerShippingStateReset() {
  state = initialState;
  // Hide All Sections
  toggleSectionVisibility(pickupSectionSelector, 'hide');
  toggleSectionVisibility(deliverySectionSelector, 'hide');
  toggleSectionVisibility(calendarSectionSelector, 'hide');
  toggleSectionVisibility(deliveryTimeGroupSelector, 'hide');
  // Reset Pickup Radio Buttons
  resetPickupRadioInputState();
  // Reset Delivery Zip Code State
  $(zipCodeButtonSelector).attr('class', 'zip-code-verification-button');
  setZipCodeButtonMessage("Verify Zip Code");
  setZipCodeValidationMessage('');
  $(zipCodeInputSelector).val('');
  // Clean up FlatPickr instance
  destroyCalendar();
}

// Date Picker Construction

function buildCalendar(configType) {
  toggleSectionVisibility(calendarSectionSelector, 'show');
  calendar = flatpickr(flatpickrInstanceSelector, {...calendarConfig[configType], onChange: handleDateChange});
  calendar.clear();
  window.calendar = calendar;
}

function destroyCalendar() {
  if (calendar) {
    calendar.destroy();
  }
}
