var url = "https://www.carboninterface.com/api/v1/estimates";

let electricityButton = document.getElementById("electricitySubmit"); 
electricityButton.addEventListener("click", submitElectricityRequest); 
let electricityCountry = document.getElementById("electricityCountry"); 
let electricityUnits = document.getElementById("electricityUnits");  
let electricityCountryCode = ""; 
let electricityErrorText = document.getElementById("electricityError"); 

let resultBody = document.getElementById("resultbody"); 
let resultDiv = document.getElementById("results"); 
let resultHeader = document.getElementById("resultHeader"); 
resultDiv.style.display = "none"; 

function submitElectricityRequest() {
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
   } else if (electricityCountry.value == "EU-27+1") {
      electricityCountryCode = "EU-27+1"; 
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
   var xhr = new XMLHttpRequest();
   xhr.open("POST", url);

   xhr.setRequestHeader("Authorization", "Bearer 7ZnGZ14gHXFw9RnZG4E1jA");
   xhr.setRequestHeader("Content-Type", "application/json");
   let response; 
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         console.log(xhr.status);
         if(xhr.status == 201) {
           response = JSON.parse(xhr.responseText);
           electricityErrorText.innerHTML = ""; 
           resultDiv.style.display = "block"; 
           resultHeader.innerHTML = "<h3><strong>Results : Electricity</strong></h3>"
           resultbody.innerHTML = "Carbon (in pounds): " + response["data"]["attributes"]["carbon_lb"]; 
         } else {
           electricityErrorText.innerHTML = "Encountered an Error - please try again."; 
         }
      }};

   xhr.send(JSON.stringify({
        "type": "electricity",
        "electricity_unit": "mwh",
        "electricity_value": electricityUnits.value,
        "country": electricityCountryCode,
      }));
}