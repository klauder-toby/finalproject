var url = "https://www.carboninterface.com/api/v1/estimates";

var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Authorization", "Bearer 7ZnGZ14gHXFw9RnZG4E1jA");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Length", "0");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send(JSON.stringify({
        "type": "electricity",
        "electricity_unit": "mwh",
        "electricity_value": 42,
        "country": "us",
        "state": "fl"
      }));