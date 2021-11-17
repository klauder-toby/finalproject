var url = "https://www.carboninterface.com/api/v1/estimates";
var token = config.API_KEY; 


var xhr = new XMLHttpRequest();
xhr.open("POST", url);

xhr.setRequestHeader("Authorization", "Bearer " + token);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Content-Length", "0");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send(JSON.stringify({}));