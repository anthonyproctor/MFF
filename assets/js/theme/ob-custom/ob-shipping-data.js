import moment from 'moment-timezone';
import GSheetProcessor from 'g-sheets-api';

let momentDateFormat = "YYYY-MM-DD";
let hourCutOff = 14;
let minuteCutOff = 15;
let todayISO = moment().add(1, 'day').format(momentDateFormat);
let tomorrowISO = moment().add(2, 'day').format(momentDateFormat);
let defaultBlockedOutDays = [];
let blockedDates = window.disabledFulfillmentDates ? window.disabledFulfillmentDates : defaultBlockedOutDays;

const options = {
  sheetId: '13VIvoTmCuHiddBjqHs9KsDfuuW7EGSTb0Ud9u1yTUwE',
  sheetNumber: 1,
  returnAllResults: true,
}

var stores = [];

GSheetProcessor(options, results => {

  results.forEach(result => {
    stores.push(results[0]);
  });
});


console.log(stores);
console.log(stores.length);
console.log(stores[0]);

const shippingModalHTML = `
<style>
.separator {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 20px;
}
.separator::before, .separator::after {
    content: '';
    flex: 1;
    border-bottom: 1.5px solid #666;
}
.separator::before {
    margin-right: .25em;
}
.separator::after {
    margin-left: .25em;
}
.label-input-container {
    max-width: 400px;
    text-align: left;
    margin-top: 2px;
    margin-bottom: 2px;
    margin-right: auto;
    margin-left: auto;
    color: #666;
}
label.collapse {
    color: white;
    font-weight: 500;
    font-size: 13px;
    border-radius: 3px;
    padding: 1px 4px 1px 4px;
    background-color: #6fbf73;
}
.collapse{
  float: right;
}
.collapse + input{
  display: none; /* hide the checkboxes */
}
.collapse + input + div{
  display:none;
}
.collapse + input:checked + div{
  display:block;
}
.extra-info{
  box-shadow: 5px 5px 20px;
  text-align: center;
  margin: 15px auto;
  padding: 10px 10px;
  background-color: #eeeeee;
  color: gray;
  vertical-align: middle;
  font-weight: 500;
}
#cached-shipping-details > div.cached-line-item.shipping-date {
  display:none;
  visibility:hidden;
}
</style>
<h4> Step 1: Please Select A Shipping Method</h4>
<div class="ob-shipping-buttons">
  <button class="shipping-method-choice-button" data-method="Pickup">
    Pick-Up
  </button>
  <button class="shipping-method-choice-button" data-method="Colorado,">
    Delivery - Colorado
  </button>
  <button class="shipping-method-choice-button" data-method="Oregon,">
    Delivery - Oregon
  </button>
  <!--
    <button class="shipping-method-choice-button" data-method="Shipping">	
      Shipping - Colorado	
    </button>
  -->
</div>
<div id="delivery-selection" class="hidden-section">
  <h4>Step 2: Verify your Zip Code</h4>
  <div class="zip-code-verification-container">
    <input id="zip-code-input" type="text" placeholder="Enter Delivery Zip Code">
    <div id="zip-validation-message" class="validation-message"></div>
    <button id="zip-code-verification-trigger" class="zip-code-verification-button">
      Verify Zip Code
    </button>
  </div>
</div>
<div id="pickup-selection" class="hidden-section">
  <h4>Step 2: Select a Pickup Location</h4>
  <h5 class="separator">Retail Locations</h5>
  <div class="pickup-radio-group">
    <div class="label-input-container">
      <input type="radio" id="pickup-beaverton" name="pickup" value="My Fit Foods Beaverton">
      <label for="pickup-beaverton"> <span style="font-weight:600">My Fit Foods Beaverton</span>
        <label class="collapse" for="_1">hours</label>
        <input id="_1" type="checkbox">
        <div class="extra-info">
          <p>Progress Ridge Townsquare, 14985 SW Barrows Rd. #121, Beaverton, OR 97007</p>
          <p>Store hours
            <br>Monday - Thursday: 8am - 8pm
            <br>Friday: 8am - 6pm
            <br>Saturday: 9am - 5pm
            <br>Sunday: 10am - 8pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-denver" name="pickup" value="My Fit Foods Denver">
      <label for="pickup-denver"> <span style="font-weight:600">My Fit Foods Denver</span>
        <label class="collapse" for="_2">hours</label>
        <input id="_2" type="checkbox">
        <div class="extra-info">
          <p>8101 Belleview Ave #w-2, Denver, CO 80237</p>
          <p>Store hours
            <br>Monday - Thursday: 7am - 8pm
            <br>Friday: 7am - 7pm
            <br>Saturday: 8am - 6pm
            <br>Sunday: 10am - 8pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-oswego" name="pickup" value="My Fit Foods Lake Oswego">
      <label for="pickup-oswego"> <span style="font-weight:600">My Fit Foods Lake Oswego</span>
        <label class="collapse" for="_3">hours</label>
        <input id="_3" type="checkbox">
        <div class="extra-info">
          <p>Kruse Village, 4835 SW Meadows DR #137, Lake Oswego, Oregon</p>
          <p>Store hours
            <br>Monday - Thursday: 8am - 8pm
            <br>Friday: 8am - 6pm
            <br>Saturday: 9am - 5pm
            <br>Sunday: 10am - 8pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-southwaterfront" name="pickup" value="My Fit Foods South Waterfront">
      <label for="pickup-southwaterfront"> <span style="font-weight:600">My Fit Foods South Waterfront</span>
        <label class="collapse" for="_4">hours</label>
        <input id="_4" type="checkbox">
        <div class="extra-info">
          <p>South Waterfront, 3134 SW Moody Ave. Portland, OR 97239</p>
          <p>Store hours
            <br>Monday - Thursday: 8am - 8pm
            <br>Friday: 8am - 6pm
            <br>Saturday: 9am - 6pm
            <br>Sunday: 10am - 8pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <h5 class="separator">Satellite Locations</h5>
    <h4>Colorado Locations</h4> 
    <div class="label-input-container">
      <input type="radio" id="pickup-aurora-d1" name="pickup" value="Aurora District 1">
      <label for="pickup-aurora-d1"> <span style="font-weight:600">Aurora District 1</span>
        <label class="collapse" for="_77">hours</label>
        <input id="_77" type="checkbox">
        <div class="extra-info">
          <p>13347 E. Montview Blvd Aurora, CO 80045</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-aurora-d2" name="pickup" value="Aurora District 2">
      <label for="pickup-aurora-d2"> <span style="font-weight:600">Aurora District 2</span>
        <label class="collapse" for="_78">hours</label>
        <input id="_78" type="checkbox">
        <div class="extra-info">
          <p>6 Abilene St Aurora, CO 80011</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-aurora-d3" name="pickup" value="Aurora District 3">
      <label for="pickup-aurora-d3"> <span style="font-weight:600">Aurora District 3</span>
        <label class="collapse" for="_79">hours</label>
        <input id="_79" type="checkbox">
        <div class="extra-info">
          <p>23911 E. Arapahoe Rd. Aurora, CO 80016</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-aurora-hq" name="pickup" value="Aurora HQ">
      <label for="pickup-aurora-hq"> <span style="font-weight:600">Aurora HQ</span>
        <label class="collapse" for="_76">hours</label>
        <input id="_76" type="checkbox">
        <div class="extra-info">
          <p>15001 E. Alameda Pkwy, Aurora, CO 80012</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-blacklist" name="pickup" value="Blacklist Athletics">
      <label for="pickup-blacklist"> <span style="font-weight:600">Blacklist Athletics</span>
        <label class="collapse" for="_87">hours</label>
        <input id="_87" type="checkbox">
        <div class="extra-info">
          <p>7328 South Revere Parkway, Unit 204B, Centennial, CO 80112</p>
          <p>Store hours
            <br>Tuesday: 2:00pm - 8:00pm
            <br>Friday: 2:00pm - 8:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-cl" name="pickup" value="C&L Water Solutions">
      <label for="pickup-cl"> <span style="font-weight:600">C&L Water Solutions</span>
        <label class="collapse" for="_84">hours</label>
        <input id="_84" type="checkbox">
        <div class="extra-info">
          <p>112249 Mead Way, Littleton, CO 80125</p>
          <p>Store hours
            <br>Sunday: 12:00pm - 4:00pm
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-castle" name="pickup" value="Castle Rock Fitness">
      <label for="pickup-castle"> <span style="font-weight:600">Castle Rock Fitness</span>
        <label class="collapse" for="_75">hours</label>
        <input id="_75" type="checkbox">
        <div class="extra-info">
          <p>3196 Industrial Way J, Castle Rock, CO 80109</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-core-progression" name="pickup" value="Core Progression Northglenn">
      <label for="pickup-core-progression"> <span style="font-weight:600">Core Progression Northglenn</span>
        <label class="collapse" for="_7">hours</label>
        <input id="_7" type="checkbox">
        <div class="extra-info">
          <p>10693 Melody Dr, Northglenn, CO 80234</p>
          <p>Store hours
            <br>Monday: 3:30pm - 6:30pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-cp-arvada" name="pickup" value="Core Progression Arvada">
      <label for="pickup-cp-arvada"> <span style="font-weight:600">Core Progression Arvada</span>
        <label class="collapse" for="_91">hours</label>
        <input id="_91" type="checkbox">
        <div class="extra-info">
          <p>5790 Yukon St, Arvada, Colorado 80002</p>
          <p>Store hours
            <br>Monday: 10:00am - 2:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-denver-jail" name="pickup" value="Denver County Jail">
      <label for="pickup-denver-jail"> <span style="font-weight:600">Denver County Jail</span>
        <label class="collapse" for="_12">hours</label>
        <input id="_12" type="checkbox">
        <div class="extra-info">
          <p>10500 E Smith Rd, Denver, CO 80239</p>
          <p>Store hours
            <br>Tuesday: 12:00pm - 3:00pm
            <br>Friday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-denver-impound" name="pickup" value="Denver Sheriff Impound">
      <label for="pickup-denver-impound"> <span style="font-weight:600">Denver Sheriff Impound</span>
        <label class="collapse" for="_14">hours</label>
        <input id="_14" type="checkbox">
        <div class="extra-info">
          <p>5160 York St, Denver, CO 80216</p>
          <p>Store hours
            <br>Tuesday: 12:00pm - 3:00pm
            <br>Friday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-denver-academy" name="pickup" value="Denver Sheriff Dept. Academy">
      <label for="pickup-denver-academy"> <span style="font-weight:600">Denver Sheriff Department Academy</span>
        <label class="collapse" for="_15">hours</label>
        <input id="_15" type="checkbox">
        <div class="extra-info">
          <p>5440 Roslyn St, Denver, CO 80216</p>
          <p>Store hours
            <br>Tuesday: 12:00pm - 3:00pm
            <br>Friday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-denver-sheriff" name="pickup" value="Denver Sheriff Detention">
      <label for="pickup-denver-sheriff"> <span style="font-weight:600">Denver Sheriff Detention</span>
        <label class="collapse" for="_16">hours</label>
        <input id="_16" type="checkbox">
        <div class="extra-info">
          <p>490 W Colfax Ave, Denver, CO 80204</p>
          <p>Store hours
            <br>Tuesday: 12:00pm - 3:00pm
            <br>Friday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-douglas-sheriff" name="pickup" value="Douglas County Sheriff’s Dept.">
      <label for="pickup-douglas-sheriff"> <span style="font-weight:600">Douglas County Sheriff’s Department</span>
        <label class="collapse" for="_17">hours</label>
        <input id="_17" type="checkbox">
        <div class="extra-info">
          <p>4000 Justice Way, Castle Rock, CO 80109</p>
          <p>Store hours
            <br>Tuesday: 6:00pm - 9:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-kula" name="pickup" value="Kula Sports Performance">
      <label for="kula"> <span style="font-weight:600">Kula Sports Performance</span>
        <label class="collapse" for="_85">hours</label>
        <input id="_85" type="checkbox">
        <div class="extra-info">
          <p>333 Dad Clark Dr, Littleton, CO 80126</p>
          <p>Store hours
            <br>Monday: 10:00am - 2:00pm</p>
            <br>Wednesday: 10:00am - 2:00pm</p>
            <br>Friday: 10:00am - 2:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-highland-r" name="pickup" value="Highland Ranch">
      <label for="pickup-highland-r"> <span style="font-weight:600"> Spenga - Highlands Ranch</span>
        <label class="collapse" for="_83">hours</label>
        <input id="_83" type="checkbox">
        <div class="extra-info">
          <p> 9567 University Blvd, Highlands Ranch, CO 80126</p>
          <p>Store hours
            <br>Monday: 10:00am - 2:00pm
            <br>Thursday: 10:00am - 2:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-otf-thornton" name="pickup" value="OrangeTheory Thornton">
      <label for="pickup-otf-thornton"> <span style="font-weight:600">OrangeTheory Thornton</span>
        <label class="collapse" for="_29">hours</label>
        <input id="_29" type="checkbox">
        <div class="extra-info">
          <p>4243 E 136th Ave, Thornton, CO 80602</p>
          <p>Store hours
            <br>Monday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-thornton-po" name="pickup" value="Thornton Police Department">
      <label for="pickup-thornton-po"> <span style="font-weight:600">Thornton Police Department</span>
        <label class="collapse" for="_82">hours</label>
        <input id="_82" type="checkbox">
        <div class="extra-info">
          <p>9551 Civic Center Dr. Thornton, CO 80229</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-thornton-po-sub" name="pickup" value="Thornton Police Dept. Substation">
      <label for="pickup-thornton-po-sub"> <span style="font-weight:600">Thornton Police Department Substation</span>
        <label class="collapse" for="_81">hours</label>
        <input id="_81" type="checkbox">
        <div class="extra-info">
          <p>13150 Quebec St. Thornton, CO 80602</p>
          <p>Store hours
            <br>Monday: 12:00pm - 4:00pm
            <br>Friday: 12:00pm - 4:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-vitesse" name="pickup" value="Vitesse Oil">
      <label for="pickup-vitesse"> <span style="font-weight:600">Vitesse Oil</span>
        <label class="collapse" for="_28">hours</label>
        <input id="_28" type="checkbox">
        <div class="extra-info">
          <p>9200 E Mineral Ave Ste 200, Centennial, CO 80112</p>
          <p>Store hours
            <br>Monday: 8:00am - 12:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-wrpd" name="pickup" value="Wheat Ridge PD">
      <label for="pickup-wrpd"> <span style="font-weight:600">Wheat Ridge PD</span>
        <label class="collapse" for="_88">hours</label>
        <input id="_88" type="checkbox">
        <div class="extra-info">
          <p>7500 W 29th Ave, Wheat Ridge, CO 80033</p>
          <p>Store hours
            <br>Tuesday: 10:00am - 4:00pm
            <br>Fridays: 10:00am - 4:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <h4>Oregon Locations</h4>
    <div class="label-input-container">
      <input type="radio" id="pickup-banks" name="pickup" value="Banks Crossfit">
      <label for="pickup-banks"> <span style="font-weight:600">Banks Crossfit</span>
        <label class="collapse" for="_6">hours</label>
        <input id="_6" type="checkbox">
        <div class="extra-info">
          <p>41745 NW Wilkesboro Rd, Banks, OR 97106</p>
          <p>Store hours
            <br>Monday: 3:30pm - 6:30pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-dragonfire" name="pickup" value="Crossfit Dragonfire">
      <label for="pickup-dragonfire"> <span style="font-weight:600">Crossfit Dragonfire</span>
        <label class="collapse" for="_9">hours</label>
        <input id="_9" type="checkbox">
        <div class="extra-info">
          <p>18412 NE Halsey St, Portland, OR 97230</p>
          <p>Store hours
            <br>Monday: 3:30pm - 6:30pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-salem" name="pickup" value="Crossfit Salem">
      <label for="pickup-salem"> <span style="font-weight:600">Crossfit Salem</span>
        <label class="collapse" for="_11">hours</label>
        <input id="_11" type="checkbox">
        <div class="extra-info">
          <p>3589 Fairview Industrial Dr SE #100, Salem, OR 97302</p>
          <p>Store hours
            <br>Tuesday: 3:30pm - 6:30pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-wilsonville" name="pickup" value="Crossfit Wilsonville">
      <label for="pickup-wilsonville"> <span style="font-weight:600">Crossfit Wilsonville</span>
        <label class="collapse" for="_92">hours</label>
        <input id="_92" type="checkbox">
        <div class="extra-info">
          <p>25589 SW Canyon Creek Rd STE 100, Wilsonville, OR 97070</p>
          <p>Store hours
            <br>Tuesday: 12:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-hazel" name="pickup" value="OrangeTheory Hazel Dell">
      <label for="pickup-hazel"> <span style="font-weight:600">OrangeTheory Hazel Dell</span>
        <label class="collapse" for="_89">hours</label>
        <input id="_89" type="checkbox">
        <div class="extra-info">
          <p>7902 NE 6th Ave, Unit 104, Vancouver, WA 98665</p>
          <p>Store hours
            <br>Wednesday: 1:00pm - 3:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <div class="label-input-container">
      <input type="radio" id="pickup-pfb" name="pickup" value="PFB CrossFit">
      <label for="pickup-pfb"> <span style="font-weight:600">PFB CrossFit</span>
        <label class="collapse" for="_80">hours</label>
        <input id="_80" type="checkbox">
        <div class="extra-info">
          <p>13536 362nd Ave, Sandy, OR 97055</p>
          <p>Store hours
            <br>Sunday: 1:00pm - 2:00pm </p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    <!---
    <div class="label-input-container">
      <input type="radio" id="pickup-forge" name="pickup" value="The Forge Fitness">
      <label for="pickup-forge"> <span style="font-weight:600">The Forge Fitness</span>
        <label class="collapse" for="_25">hours</label>
        <input id="_25" type="checkbox">
        <div class="extra-info">
          <p>1459 E Baseline St, Cornelius, OR 97113</p>
          <p>Store hours
            <br>Monday: 4:00pm - 6:00pm</p>
          <p>Please place orders before 2:15pm for next-day pickup</p>
        </div>
      </label>
    </div>
    --->
    </div>
  </div>
  <div id="calendar-section" class="hidden-section">
    <h4> Step 3: Select Date </h4>
    <input type="date" id="flatpickr-instance">
    <div id="delivery-time-group" class="hidden-section" >
      <button class="time-picker-button" value="10AM-4PM">
        10AM-4PM
      </button>
      <button class="time-picker-button" value="2PM-8PM">
        2PM-8PM
      </button>
          </div>
    <div id="checkout-validation-message"></div>
    <button id="confirm-shipping">
      Confirm Checkout Details
    </button>
  </div>
</div>
`;

const defaultZipCodes = [ 80002, 80003, 80004, 80005, 80010, 80011, 80012, 80013, 80014, 80015, 80016, 80017, 80018, 80019, 80020, 80021, 80022, 80023, 80030, 80031, 80033, 80045, 80104, 80108, 80109, 80110, 80111, 80112, 80113, 80116, 80120, 80121, 80122, 80123, 80124, 80125, 80126, 80127, 80128, 80129, 80130, 80134, 80138, 80202, 80203, 80204, 80205, 80207, 80209, 80210, 80211, 80212, 80214, 80215, 80216, 80218, 80219, 80220, 80221, 80222, 80223, 80224, 80226, 80227, 80228, 80229, 80230, 80231, 80232, 80233, 80234, 80235, 80236, 80237, 80238, 80239, 80241, 80246, 80247, 80249, 80260, 80401, 80419, 80601, 80602, 80603, 80640, 97002, 97003, 97005, 97006, 97007, 97008, 97009, 97011, 97013, 97015, 97017, 97022, 97024, 97027, 97028, 97030, 97034, 97035, 97036, 97045, 97049, 97053, 97056, 97060, 97062, 97067, 97068, 97070, 97075, 97076, 97077, 97078, 97079, 97080, 97086, 97089, 97111, 97113, 97114, 97124, 97125, 97128, 97129, 97133, 97137, 97140, 97148, 97201, 97202, 97203, 97204, 97205, 97206, 97207, 97208, 97209, 97210, 97211, 97212, 97213, 97214, 97215, 97216, 97217, 97218, 97219, 97220, 97221, 97222, 97223, 97224, 97225, 97227, 97228, 97229, 97230, 97231, 97232, 97233, 97236, 97238, 97239, 97240, 97242, 97256, 97258, 97266, 97267, 97268, 97269, 97280, 97281, 97282, 97283, 97286, 97290, 97291, 97292, 97293, 97294, 97296, 97298, 97301, 97302, 97304, 97305, 97306, 97308, 97309, 97310, 97311, 97312, 97314, 97317, 97362, 98607, 98660, 98661, 98662, 98663, 98664, 98665, 98666, 98668, 98682, 98683, 98684, 98685, 98686, 98687];

let shippingZipCodes = window.shippingZipCodes ? window.shippingZipCodes : defaultZipCodes;

const zipCodeValidationMessages = {
  noZip: "Please enter a valid zip code.",
  noDelivery: "Sorry, we do not deliver to this Zip Code!",
  success: "Zip Code Verified, please select a date!"
}

function getCurrentMomentMountain() {
  return moment().tz('America/Denver')
}

function getCurrentMomentPacific() {
  return moment().tz('America/Los_Angeles');
}

function checkCutoffDaily(currentMoment) {
  const hours = Number(currentMoment.format("HH"));
  const minutes = Number(currentMoment.format('mm'));

  if (hours > hourCutOff) {
    return tomorrowISO;
  } else if (hours < hourCutOff) {
    return todayISO;
  } else if (hours == hourCutOff) {
    if (minutes < minuteCutOff || minutes == minuteCutOff) {
      return todayISO;
    } else if (minutes > minuteCutOff) {
      return tomorrowISO;
    }
  }
}
function disableSundays(date) {
  return date.getDay() === 0;
}
function disableMondays(date) {
  return date.getDay() === 1;
}
function disableTuesdays(date) {
  return date.getDay() === 2;
}
function disableWednesdays(date) {
  return date.getDay() === 3;
}
function disableThursdays(date) {
  return date.getDay() === 4;
}
function disableFridays(date) {
  return date.getDay() === 5;
}
function disableSaturdays(date) {
  return date.getDay() === 6;
}

function disableBlockedDates(date) {
  const formattedFlatpickrDateToDisable = moment(date).format(momentDateFormat);
  return blockedDates.includes(formattedFlatpickrDateToDisable);
}

const calendarConfig = {
  ["Colorado,"]: {
    disable: [
      disableSaturdays,
      disableThursdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
   ["Oregon,"]: {
    // Disable Oregon Delivery on Saturdays.
    disable: [
      disableSaturdays,
      disableThursdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-beaverton"]: {
    disable: [
      disableSaturdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-denver"]: {
    disable: [
    disableSaturdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-oswego"]: {
    disable: [
    disableSaturdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-southwaterfront"]: {
    disable: [
    disableSaturdays,
      disableBlockedDates
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
    ["pickup-aspire"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-banks"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
    ["pickup-castle"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },  
  ["pickup-core-progression"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-dragonfire"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-salem"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-denver-jail"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-denver-impound"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-denver-academy"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-denver-sheriff"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-douglas-sheriff"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-pfb"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-happy-valley"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-otf-oregon-city"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-otf-salem"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-otf-tualatin"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-otf-west-linn"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },  
  ["pickup-forge"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentPacific()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-otf-thornton"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-aurora-hq"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-aurora-d1"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-aurora-d2"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-aurora-d3"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-thornton-po"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-thornton-po-sub"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-vitesse"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-highland-r"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-kula"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-cl"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-blacklist"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-wrpd"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-hazel"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableTuesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-cp-arvada"]: {
    disable: [
      disableBlockedDates,
      disableTuesdays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
  ["pickup-wilsonville"]: {
    disable: [
      disableBlockedDates,
      disableMondays,
      disableWednesdays,
      disableThursdays,
      disableFridays,
      disableSaturdays,
      disableSundays
    ],
    minDate: checkCutoffDaily(getCurrentMomentMountain()),
    altInput: true,
    altFormat: "F j, Y",
  },
}

const shippingPluginSelectors = {
  shippingMethodButtonSelector: '.shipping-method-choice-button',
  pickupSectionSelector: '#pickup-selection',
  deliverySectionSelector: '#delivery-selection',
  calendarSectionSelector: '#calendar-section',
  pickupRadioInputSelector: '.pickup-radio-group input[type="radio"][name="pickup"]',
  flatpickrInstanceSelector: '#flatpickr-instance',
  zipCodeInputSelector: '#zip-code-input',
  zipCodeValidationMessageSelector: '#zip-validation-message',
  zipCodeButtonSelector: '#zip-code-verification-trigger',
  deliveryTimeGroupSelector: '#delivery-time-group', 
  deliveryTimePickerButtonsSelector: '#delivery-time-group .time-picker-button',
  confirmDetailsSelector: '#confirm-shipping',
  checkoutValidationMessageSelector: '#checkout-validation-message',
}

export { 
  shippingModalHTML,
  shippingZipCodes,
  zipCodeValidationMessages,
  shippingPluginSelectors,
  calendarConfig
}
