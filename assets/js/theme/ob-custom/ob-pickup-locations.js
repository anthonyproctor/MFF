const retailLocationDefaults = [
    {
      id: 0,
      input_id: "houston",
      name: "My Fit Foods Houston",
      address: "",
      hours: {
        Monday: "7am - 8pm",
        Tuesday: "7am - 8pm",
        Wednesday: "7am - 8pm",
        Thursday: "7am - 8pm",
        Friday: "7am - 6pm",
        Saturday: "9am - 6pm",
        Sunday: "10am - 8pm"
      }
    },
	 {
    id: 1,
    input_id: "beaverton",
    name: "My Fit Foods Beaverton",
    address: "Progress Ridge Townsquare, 14985 SW Barrows Rd. #121, Beaverton, OR 97007",
    hours: {
      Monday: "8am - 8pm",
      Tuesday: "8am - 8pm",
      Wednesday: "8am - 8pm",
      Thursday: "8am - 8pm",
      Friday: "8am - 6pm",
      Saturday: "9am - 6pm",
      Sunday: "10am - 8pm"
    }
  },
  {
    id: 2,
    input_id: "denver",
    name: "My Fit Foods Denver",
    address: "8101 Belleview Ave #w-2, Denver, CO 80237",
    hours: {
      Monday: "7am - 8pm",
      Tuesday: "7am - 8pm",
      Wednesday: "7am - 8pm",
      Thursday: "7am - 8pm",
      Friday: "7am - 7pm",
      Saturday: "8am - 6pm",
      Sunday: "10am - 8pm"
    }
  },
  {
    id: 3,
    input_id: "oswego",
    name: "My Fit Foods Lake Oswego",
    address: "Kruse Village, 4835 SW Meadows DR #137, Lake Oswego, Oregon",
    hours: {
      Monday: "8am - 8pm",
      Tuesday: "8am - 8pm",
      Wednesday: "8am - 8pm",
      Thursday: "8am - 8pm",
      Friday: "8am - 6pm",
      Saturday: "9am - 5pm",
      Sunday: "10am - 8pm"
    }
  },
  {
    id: 4,
    input_id: "southwaterfront",
    name: "My Fit Foods South Waterfront",
    address: "South Waterfront, 3134 SW Moody Ave. Portland, OR 97239",
    hours: {
      Monday: "8am - 8pm",
      Tuesday: "8am - 8pm",
      Wednesday: "8am - 8pm",
      Thursday: "8am - 8pm",
      Friday: "8am - 6pm",
      Saturday: "9am - 6pm",
      Sunday: "10am - 8pm"
    }
  }
]

const satelliteLocationDefaults = [
  {
    id: 6,
    input_id: "banks",
    name: "Banks Crossfit",
    address: "41745 NW Wilkesboro Rd, Banks, OR 97106",
    hours: {
      Monday: "3:30pm - 6:30pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 7,
    input_id: "core-progression",
    name: "Core Progression Northglenn",
    address: "10693 Melody Dr, Northglenn, CO 80234",
    hours: {
      Monday: "3:30pm - 6:30pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 9,
    input_id: "dragonfire",
    name: "Crossfit Dragonfire",
    address: "18412 NE Halsey St, Portland, OR 97230",
    hours: {
      Monday: "3:30pm - 6:30pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 10,
    input_id: "newberg",
    name: "Crossfit Newberg",
    address: "2401 E Hancock St, Newberg, OR 97132",
    hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "3:30pm - 6:30pm",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 11,
    input_id: "salem",
    name: "Crossfit Salem",
    address: "3589 Fairview Industrial Dr SE #100, Salem, OR 97302",
    hours: {
      Monday: "",
      Tuesday: "3:30pm - 6:30pm",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 12,
    input_id: "denver-jail",
    name: "Denver County Jail",
    address: "10500 E Smith Rd, Denver, CO 80239",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "12:00pm - 3:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 13,
    input_id: "denver-health",
    name: "Denver Health Correctional Care Facility",
    address: "777 Bannock St, Denver, CO 80204",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "12:00pm - 3:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 14,
    input_id: "denver-impound",
    name: "Denver Sheriff's Vehicle Impound",
    address: "5160 York St, Denver, CO 80216",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "12:00pm - 3:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 15,
    input_id: "denver-academy",
    name: "Denver Sheriff’s Dept Academy",
    address: "5440 Roslyn St, Denver, CO 80216",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "12:00pm - 3:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 16,
    input_id: "denver-sheriff",
    name: "Denver Sheriff’s Detention Center",
    address: "490 W Colfax Ave, Denver, CO 80204",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "12:00pm - 3:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 17,
    input_id: "douglas-sheriff",
    name: "Douglas County Sheriff’s Dept",
    address: "4000 Justice Way, Castle Rock, CO 80109",
    hours: {
      Monday: "",
      Tuesday: "6:00pm - 9:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 29,
    input_id: "otf-thornton",
    name: "OrangeTheory Thornton",
    address: "4243 E 136th Ave, Thornton, CO 80602",
    hours: {
      Monday: "12:00pm - 3:00pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 26,
    input_id: "thornton",
    name: "Thornton Police Dept",
    address: "9551 Civic Center Dr, Thornton, CO 80229",
    hours: {
      Monday: "12:00pm - 3:00pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "3:00pm - 6:00pm",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 27,
    input_id: "thornton-sub",
    name: "Thornton Police Dept Substation",
    address: "13150 Quebec St, Thornton, CO. 80602",
    hours: {
      Monday: "12:00pm - 3:00pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "3:00pm - 6:00pm",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 28,
    input_id: "vitesse",
    name: "Vitesse Oil",
    address: "9200 E Mineral Ave Ste 200, Centennial, CO 80112",
    hours: {
      Monday: "8:00am - 12:00pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 91,
    input_id: "cp-arvada",
    name: "CP - Arvada",
    address: "5790 Yukon St, Arvada, Colorado 80002",
    hours: {
      Monday: "10:00am - 2:00pm",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 93,
    input_id: "pickup-wilsonville",
    name: "Crossfit Wilsonville",
    address: "25589 SW Canyon Creek Rd STE 100, Wilsonville, OR 97070",
    hours: {
      Monday: "",
      Tuesday: "12:00pm - 3:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 90,
    input_id: "cp-unleashed",
    name: "Unleashed Fitness NW - Vancouver",
    address: "7509 South 5th Street #101-F, Ridgefield, WA 98642",
    hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "1:00pm - 3:00pm",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 92,
    input_id: "burn",
    name: "Burn Boot Camp",
    address: "3333 S Wadsworth Blvd, Lakewood, CO 80227",
    hours: {
      Monday: "",
      Tuesday: "10:00pm - 4:00pm",
      Wednesday: "",
      Thursday: "",
      Friday: "10:00pm - 4:00pm",
      Saturday: "",
      Sunday: ""
    }
  },
  {
    id: 94,
    input_id: "pickup-cp-broadway",
    name: "Core Progression S. Broadway",
    address: "2565 S Broadway, Denver, CO 80210",
    hours: {
      Monday: "10:00pm - 4:00pm",
      Tuesday: "",
      Wednesday: "10:00pm - 4:00pm",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: ""
    }
  },
]

const retailLocations = window.retailLocations 
  ? window.retailLocations
  : retailLocationDefaults;

const satelliteLocations = window.satelliteLocations 
  ? window.retailLocations
  : satelliteLocationDefaults;
   
module.exports = {
  retailLocations,
  satelliteLocations
}
