var baseurl = "https://www.carboninterface.com/api/v1/estimates";
let response; 


//profiles 
let profileName = document.getElementById("profileName");
let transportationMethodProfile = document.getElementById("transportationMethodProfile");
let profileSubmit = document.getElementById("profileSubmit"); 
let dietHabit = document.getElementById("dietHabit");
profileSubmit.addEventListener("click", createCard); 
let transportationMethodProfileValue; 
let dietHabitValue; 
let dataGetText = document.getElementById("dataGetText");

let profileGet = document.getElementById("profileGet"); 
let profileNameGet = document.getElementById("profileNameGet");
profileGet.addEventListener("click", getCard);



//electricity 
let electricityButton = document.getElementById("electricitySubmit"); 
electricityButton.addEventListener("click", submitElectricityRequest); 
let electricityCountry = document.getElementById("electricityCountry"); 
let electricityValue = document.getElementById("electricityValue");  
let electricityCountryCode = ""; 
let electricityText = document.getElementById("electricityError"); 
let electricityUnits = document.getElementById("electricityUnits");
let electricityUnitsValue = "";

//shipping 
let shippingButton = document.getElementById("shippingSubmit");
shippingButton.addEventListener("click", submitShippingRequest);
let weightUnits = document.getElementById("weightUnits"); 
let weightValue = document.getElementById("weightValue"); 
let distanceUnits = document.getElementById("distanceUnits");
let distanceValue = document.getElementById("distanceValue"); 
let transportationMethod = document.getElementById("transportationMethod");
let weightUnitValue = "";
let shippingText = document.getElementById("shippingError"); 
let transportationMethodValue = "";
let distanceUnitValue = ""; 
let displayWeightValueError; 
let displayDistanceValueError; 

//flight 
let legSubmit = document.getElementById("legSubmit"); 
let departureAirport = document.getElementById("departureAirport");
let destinationAirport = document.getElementById("destinationAirport"); 
let passengerCount = document.getElementById("numPassengers");
let legDisplay = document.getElementById("legDisplay");
legSubmit.addEventListener("click", displayLeg);
let flightErrorText = document.getElementById("flightError");
let departureAirportEntered; 
let destinationAirportEntered; 
let flightButton = document.getElementById("flightSubmit");
flightButton.addEventListener("click", submitFlightRequest); 
let passengerCountEntered; 
let legs = []; 
let legClear = document.getElementById("legClear"); 
legClear.addEventListener("click", clearLeg); 

//results
let resultBody = document.getElementById("resultbody"); 
let resultDiv = document.getElementById("results"); 
let resultHeader = document.getElementById("resultHeader"); 


function getCard() {
  var xhr = new XMLHttpRequest();
   xhr.open("GET", 'https://www.carboninterface.com/api/v1/carbon_ledger/programs/2e303e36-08c0-4d14-8e0f-d277fb6864b0/card_profiles');

  //set request headers 
   xhr.setRequestHeader("Authorization", "Bearer dzhagX1MrPg0CEP8VmvtBQ");
   xhr.setRequestHeader("Content-Type", "application/json");

  //when state changes
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        //if the request is good, parse it and display output 
        if(profileNameGet.value == null || profileNameGet.value.replace(/\s/g, "") == "") {
          profileNameGet.style.border = "1px solid red";
        } else {
         if(xhr.status == 200) {
           response = JSON.parse(xhr.responseText);
           console.log(response[0]["data"]["attributes"]["diet_habit"]);
          for (let i = 0; i < response.length; i++) {
            let value = profileNameGet.value.toLowerCase(); 
            if(value == response[i]["data"]["attributes"]["external_id"].toLowerCase()) {
            dataGetText.innerHTML = "<h4> Data for "+ profileNameGet.value + "</h4> <br> <p> Habit: " + response[i]["data"]["attributes"]["diet_habit"] + "<br> Transportation: " + response[i]["data"]["attributes"]["transportation_method"] + "</p> <br> ID: " + response[i]["data"]["id"];
            profileNameGet.style.border = "1px solid";
            break; 
          } else {
          profileNameGet.style.border = "1px solid red"; 
          dataGetText.innerHTML = "There was a problem with your request - ensure you entered the same name you used to create your profile."; 
        }
         }
        } 
        }
      }};

  //send the request with the appropriate values 
   xhr.send();
}

function createCard() {
  if(dietHabit.value == "Vegan") {
      dietHabitValue = "vegan";
   } else if (dietHabit.value == "Vegetarian") {
      dietHabitValue = "vegetarian";
   } else if (dietHabit.value == "Plant Based") {
      dietHabitValue = "plant_based";
   } else if (dietHabit.value == "Omnivore") {
      dietHabitValue = "omnivore";
   }

   if(transportationMethodProfile.value == "Public Transportation") {
      transportationMethodProfileValue = "public_transportation";
   } else if (transportationMethodProfile.value == "Compact Vehicle") {
      transportationMethodProfileValue = "compact_vehicle";
   } else if (transportationMethodProfile.value == "Midsized Vehicle") {
      transportationMethodProfileValue = "midsized_vehicle";
   } else if (transportationMethodProfile.value == "Large Vehicle") {
      transportationMethodProfileValue = "large_vehicle";
   }

  if(profileName.value == null || profileName.value.replace(/\s/g, "") == "") {
    profileName.style.border = "1px solid red";
  } else {
    profileName.style.border = "1px solid";
    //generate request 
   var xhr = new XMLHttpRequest();
   xhr.open("POST", "https://www.carboninterface.com/api/v1/carbon_ledger/programs/2e303e36-08c0-4d14-8e0f-d277fb6864b0/card_profiles");

  //set request headers 
   xhr.setRequestHeader("Authorization", "Bearer dzhagX1MrPg0CEP8VmvtBQ");
   xhr.setRequestHeader("Content-Type", "application/json");

  //when state changes
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //if the request is good, parse it and display output 
         if(xhr.status == 201) {
           response = JSON.parse(xhr.responseText);
           console.log("Success");
         } 
      }};

  //send the request with the appropriate values 
   xhr.send(JSON.stringify({
        "external_id": profileName.value,
        "diet_habit": dietHabitValue,
        "transportation_method": transportationMethodProfileValue
      }));
  }
}

//function that clears all legs for flight calculations 
function clearLeg() {
  legDisplay.innerHTML = ""; 
  legs = []; 
}

//function that adds legs to the list and shows them on screen 
function displayLeg() {
  //validate that departure airport is entered
  if(departureAirport.value == null || departureAirport.value.replace(/\s/g, "") == "") {
    departureAirport.style.border = "1px solid red";
    departureAirportEntered = false; 
  } else {
    departureAirport.style.border = "1px solid";
    departureAirportEntered = true;
    flightErrorText.innerHTML = "";
  } 

  //validate that destination airport is entered. 
  if(destinationAirport.value == null || destinationAirport.value.replace(/\s/g, "") == "") {
    destinationAirport.style.border = "1px solid red";
    destinationAirportEntered = false; 
  } else {
    destinationAirport.style.border = "1px solid";
    destinationAirportEntered = true; 
    flightErrorText.innerHTML = "";
  } 

  //if both destination and departure airports are entered, then we can add it to the list and the screen 
  if(destinationAirportEntered && departureAirportEntered) {
    //show display 
  legDisplay.innerHTML = legDisplay.innerHTML + "<br> " + departureAirport.value + " to " + destinationAirport.value; 

  //add to legs list 
  legs.push({"departure_airport": departureAirport.value.toLowerCase(), "destination_airport": destinationAirport.value.toLowerCase()});


  //clear the fields for input of a new leg 
  departureAirport.value = "";
  destinationAirport.value = "";
  
  //check to make sure fields are filled and display appropriate error text if not 
  } else if(destinationAirportEntered && !departureAirportEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Departure Airport";
  } else if(!destinationAirportEntered && departureAirportEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Destination Airport";
  } else {
    flightErrorText.innerHTML = "Please enter an IATA code for both the Departure and Destination Airport";
  }
}


//function that submits a GET request to the API for calculating the amount of carbon produced in generation of a certain amount of electricity 
function submitElectricityRequest() {

  //validate/encode the select (dropdown) input 
  if(electricityUnits.value == "Megawatt Hours (mwh)") {
    electricityUnitsValue = "mwh";
  } else if (electricityUnits.value == "Kilowatt Hours (kwh)"){
    electricityUnitsValue = "kwh";
  } else {
    electricityText.innerHTML = "Encountered an unknown error, please try again.";
  }

   //validate that the number of units selected is a number and that the user input a number. 
   if(isNaN(electricityValue.value) || electricityValue.value == null || electricityValue.value.replace(/\s/g, "") == "") {
     electricityValue.style.border = "1px solid red"; 
     electricityText.innerHTML = "Please enter a number for field: MWH.";
   } else {
     electricityValue.style.border = "1px solid grey";
   }

  //encode country of origin
   if(electricityCountry.value == "United States of America") {
      electricityCountryCode = "US";
   } else if (electricityCountry.value == "Canada") {
      electricityCountryCode = "CA"; 
   } else if (electricityCountry.value == "Austria") {
      electricityCountryCode = "AT"; 
   } else if (electricityCountry.value == "Belgium") {
      electricityCountryCode = "BE"; 
   } else if (electricityCountry.value == "Bulgaria") {
      electricityCountryCode = "BG"; 
   } else if (electricityCountry.value == "Croatia") {
      electricityCountryCode = "HR";  
   } else if (electricityCountry.value == "Cyprus") {
      electricityCountryCode = "CY"; 
   } else if (electricityCountry.value == "Czechia") {
      electricityCountryCode = "CZ"; 
   } else if (electricityCountry.value == "Denmark") {
      electricityCountryCode = "DK"; 
   } else if (electricityCountry.value == "EU-27") {
      electricityCountryCode = "EU-27"; 
   } else if (electricityCountry.value == "Estonia") {
      electricityCountryCode = "EE"; 
   } else if (electricityCountry.value == "Finland") {
      electricityCountryCode = "FI"; 
   } else if (electricityCountry.value == "France") {
      electricityCountryCode = "FR"; 
   } else if (electricityCountry.value == "Germany") {
      electricityCountryCode = "DE"; 
   } else if (electricityCountry.value == "Greece") {
      electricityCountryCode = "GR"; 
   } else if (electricityCountry.value == "Hungary") {
      electricityCountryCode = "GU"; 
   } else if (electricityCountry.value == "Ireland") {
      electricityCountryCode = "IE"; 
   } else if (electricityCountry.value == "Italy") {
      electricityCountryCode = "IT"; 
   } else if (electricityCountry.value == "Latvia") {
      electricityCountryCode = "LV"; 
   } else if (electricityCountry.value == "Lithuania") {
      electricityCountryCode = "LT"; 
   } else if (electricityCountry.value == "Luxembourg") {
      electricityCountryCode = "LU"; 
   } else if (electricityCountry.value == "Malta") {
      electricityCountryCode = "MT"; 
   } else if (electricityCountry.value == "Netherlands") {
      electricityCountryCode = "NL"; 
   } else if (electricityCountry.value == "Poland") {
      electricityCountryCode = "PL"; 
   } else if (electricityCountry.value == "Portgual") {
      electricityCountryCode = "PT"; 
   } else if (electricityCountry.value == "Romania") {
      electricityCountryCode = "RO"; 
   } else if (electricityCountry.value == "Slovakia") {
      electricityCountryCode = "SK"; 
   } else if (electricityCountry.value == "Slovenia") {
      electricityCountryCode = "SI"; 
   } else if (electricityCountry.value == "Spain") {
      electricityCountryCode = "ES"; 
   } else if (electricityCountry.value == "Sweden") {
      electricityCountryCode = "SE"; 
   } else if (electricityCountry.value == "United Kingdom") {
      electricityCountryCode = "GB"; 
   } 

   //generate request 
   var xhr = new XMLHttpRequest();
   xhr.open("POST", baseurl);

  //set request headers 
   xhr.setRequestHeader("Authorization", "Bearer dzhagX1MrPg0CEP8VmvtBQ");
   xhr.setRequestHeader("Content-Type", "application/json");

  //when state changes
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //if the request is good, parse it and display output 
         if(xhr.status == 201) {
           response = JSON.parse(xhr.responseText);
           electricityText.innerHTML = "<h4><strong>Results : Electricity</strong></h4><br> Carbon (in pounds): " + response["data"]["attributes"]["carbon_lb"];  
         } 
      }};

  //send the request with the appropriate values 
   xhr.send(JSON.stringify({
        "type": "electricity",
        "electricity_unit": electricityUnitsValue,
        "electricity_value": electricityValue
      .value,
        "country": electricityCountryCode,
      }));
}


//function that submits a GET request to the API for calculating the amount of carbon produced in the process of sending a package any distance. 
function submitShippingRequest() {

  //validate weight value 
  if(weightUnits.value == "Grams (g)") {
      weightUnitValue = "g"; 
  } else if(weightUnits.value == "Pounds (lb)") {
      weightUnitValue = "lb";
  } else if(weightUnits.value == "Kilograms (kg)") {
      weightUnitValue = "kg"; 
  } else if(weightUnits.value == "Tonnes (mt)") {
      weightUnitValue = "mt";
  } else {
      shippingText.innerHTML = "Encountered a unknown error, please try again."
  }

  //validate transportation method 
  if(transportationMethod.value == "Truck") {
      transportationMethodValue = "truck";
  } else if(transportationMethod.value == "Ship") {
      weightUnitValue = "ship";
  } else if(transportationMethod.value == "Plane") {
      weightUnitValue = "plane"; 
  } else if(transportationMethod.value == "Train") {
      weightUnitValue = "train";
  } else {
      shippingText.innerHTML = "Encountered an unknown error, please try again."
  }

  //validate distance units 
  if(distanceUnits.value == "Miles (mi)") {
    distanceUnitValue = "mi";
  } else if(distanceUnits.value == "Kilometers (km)") {
    distanceUnitValue = "km";
  } else {
    shippingText.innerHTML = "Encountered an unknown error, please try again.";
  }

  //validate that the user entered a numeric value for the weight of the package, in selected units. 
  if(isNaN(weightValue.value) || weightValue.value == null || weightValue.value.replace(/\s/g, "") == "") {
    weightValue.style.border = "1px solid red";
    displayWeightValueError = true; 
  } else {
    weightValue.style.border = "1px solid";
    displayWeightValueError = false; 
  }

  //validate that the user entered a number value for the distance they would like to send their package, in selected units. 
  if(isNaN(distanceValue.value) || distanceValue.value == null || distanceValue.value.replace(/\s/g, "") == "") {
    distanceValue.style.border = "1px solid red";
    displayDistanceValueError = true;
  } else {
    distanceValue.style.border = "1px solid";
    displayDistanceValueError = false; 
  }

  //if distance value and weight value both are not entered, display appropriate error message
  if(displayDistanceValueError && displayWeightValueError) {
    shippingText.innerHTML = "Please enter a number for field(s): <br> Weight Value <br> Distance Value";
    //if just weight value is not entered, display appropriate error message
  } else if (!displayDistanceValueError && displayWeightValueError) {
    shippingText.innerHTML = "Please enter a number for field(s): <br> Weight Value";
    //if just 
  } else if (!displayWeightValueError && displayDistanceValueError) {
    shippingText.innerHTML = "Please enter a number for field(s): <br> Distance Value";

  }

  var xhr = new XMLHttpRequest();
   xhr.open("POST", baseurl
  );

   xhr.setRequestHeader("Authorization", "Bearer dzhagX1MrPg0CEP8VmvtBQ");
   xhr.setRequestHeader("Content-Type", "application/json");


   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status); 
         if(xhr.status == 201) {
           response = JSON.parse(xhr.responseText);
           shippingText.innerHTML = "<h4><strong>Results : Shipping</strong></h4> <br> Carbon (in pounds): " + response["data"]["attributes"]["carbon_lb"];  
         } 
      }};

   xhr.send(JSON.stringify({
      "type": "shipping",
      "weight_value": weightValue.value,
      "weight_unit": weightUnitValue,
      "distance_value": distanceValue.value,
      "distance_unit": distanceUnitValue,
      "transport_method": transportationMethodValue
    }));
}

function submitFlightRequest() {
  legs = []; 
  if(isNaN(passengerCount.value) || passengerCount.value == null || passengerCount.value.replace(/\s/g, "") == "") {
    passengerCountEntered = false; 
    passengerCount.style.border = "1px solid red";
  } else {
    passengerCountEntered = true; 
    passengerCount.style.border = "1px solid"; 
  }
  if(departureAirport.value == null || departureAirport.value.replace(/\s/g, "") == "" && legs.length == 0) {
    departureAirport.style.border = "1px solid red";
    departureAirportEntered = false; 
  } else {
    departureAirport.style.border = "1px solid";
    departureAirportEntered = true;
  } 
  if(destinationAirport.value == null || destinationAirport.value.replace(/\s/g, "") == "" && legs.length == 0) {
    destinationAirport.style.border = "1px solid red";
    destinationAirportEntered = false; 
  } else {
    destinationAirport.style.border = "1px solid";
    destinationAirportEntered = true; 
  } 


  if(destinationAirportEntered && !departureAirportEntered && !passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Departure Airport and a numeric value for number of passengers.";
    //just passengers missing 
  } else if(destinationAirportEntered && departureAirportEntered && !passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter a numberic value for number of passengers";
    //destination missing 
  } else if(!destinationAirportEntered && departureAirportEntered && passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Destination Airport";
    //departure airport missing 
  } else if(destinationAirportEntered && !departureAirportEntered && passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Departure Airport";
    //destination and passengers missing 
  } else if(!destinationAirportEntered && departureAirportEntered && !passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Destination Airport and a numeric value for the number of passengers.";
  } else if(!destinationAirportEntered && !departureAirportEntered && !passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Destination Airport and the Departure Airport, as well as a numeric value for the number of passengers.";
  } else if(!destinationAirportEntered && !departureAirportEntered && passengerCountEntered) {
    flightErrorText.innerHTML = "Please enter an IATA code for the Destination Airport and the Departure Airport.";
  }

  if(legs.length > 0 || (passengerCountEntered &&destinationAirportEntered && departureAirportEntered)) {
    if(!(destinationAirport.value == null || destinationAirport.value.replace(/\s/g, "") == "") && !(departureAirport.value == null || departureAirport.value.replace(/\s/g, "") == "")) {
      legs.push({"departure_airport": departureAirport.value.toLowerCase(), "destination_airport": destinationAirport.value.toLowerCase()});
    }

     var xhr = new XMLHttpRequest();
    xhr.open("POST", baseurl);

    xhr.setRequestHeader("Authorization", "Bearer dzhagX1MrPg0CEP8VmvtBQ");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         if(xhr.status == 201) {
           response = JSON.parse(xhr.responseText);
           flightErrorText.innerHTML = "<h4><strong>Results : Flight</strong></h4><br> Carbon (in pounds): " + response["data"]["attributes"]["carbon_lb"]; 
         } 
      }};

   xhr.send(JSON.stringify({
        "type": "flight",
        "passengers": passengerCount.value,
        "legs": legs
      }));
  }
  }