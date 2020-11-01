
const loc = {};

var lat,long;

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
      loc.lat  = position.coords.latitude;
      loc.long = position.coords.longitude;
      lat = position.coords.latitude;
      long = position.coords.longitude;
  }
/*
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", "https://developers.zomato.com/api/v2.1/categories", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
  xhttp.send();

*/
/*

function getCDetailsWithLatAndLong() {
    getLocation();
    var uri = "https://developers.zomato.com/api/v2.1/cities?lat="+loc.lat+"&"+"lon="+loc.long;
    console.log(loc,uri);
    console.log(lat,long);
    
    

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          cyt_det = this.responseText;
        }
      };
      xhttp.open("GET", uri, true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
      xhttp.send();
      console.log(cyt_det.location_suggestions[0].id);
      getResturnatsThruCityDetail(cyt_det.location_suggestions[0].id);

}
*/

function getCityDetailsWithLatAndLong() {
    const cyt_det = {};
    const cid = 0;
    var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }
      
      getPosition()
        .then((position) => {
            console.log(position);
            loc.lat  = position.coords.latitude;
            loc.long = position.coords.longitude;

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    var bj = JSON.parse(this.responseText);
                    console.log(bj.location_suggestions[0].id);
                    getResturnatsThruCityDetail(bj.location_suggestions[0].id);
                }
            };
        xhttp.open("GET", "https://developers.zomato.com/api/v2.1/cities?lat="+loc.lat+"&"+"lon="+loc.long, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
        xhttp.send();
        

        //console.log("cid:"+cyt_det["location_suggestions"][0].id);
        

        })
        .catch((err) => {
          console.error(err.message);
        });
}

function getCityDetailsWithName(){
    var cname = document.getElementById("cityName").value;
    uri = "https://developers.zomato.com/api/v2.1/cities?q="+cname;
    console.log(uri);

    var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    var bj = JSON.parse(this.responseText);
                    console.log(bj.location_suggestions[0].id);
                    getResturnatsThruCityDetail(bj.location_suggestions[0].id);
                }
            };
        xhttp.open("GET", uri, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
        xhttp.send();


}

function getResturnatsThruCityDetail(cid){
    var uri = "https://developers.zomato.com/api/v2.1/search?entity_id="+cid+"&entity_type=city";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          var obg = JSON.parse(this.responseText);

          var dres = document.getElementById("resturants");
          dres.innerHTML ="";
          for(i=0;i<obg.restaurants.length;i++){
              console.log(obg.restaurants[i].restaurant.name);
              var mdiv = document.createElement("div");
              mdiv.classList.add("col-4");

              var div1 = document.createElement("div");
             
              div1.classList.add("card");
              div1.classList.add("text-white");
              div1.classList.add("bg-primary");
              div1.classList.add("mb-3");

              

              var div3 = document.createElement("div");
              div3.classList.add("card-body");
              var ct = document.createElement("h4");
              ct.classList.add("card-title");
              ct.innerHTML = obg.restaurants[i].restaurant.name;
              var cp1 = document.createElement("p");
              cp1.classList.add("card-text");
              cp1.innerHTML = "Address: "+ obg.restaurants[i].restaurant.location.address;
              
              var rid = obg.restaurants[i].restaurant.id;
              console.log(rid);
              
              var btn = document.createElement("button");
              btn.classList.add("btn");
              btn.classList.add("btn-info")
              btn.innerText = "Get Menu";
              btn.onclick = function (){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                  if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                  }
                };
                console.log("https://developers.zomato.com/api/v2.1/dailymenu?res_id="+rid);
                xhttp.open("GET", "https://developers.zomato.com/api/v2.1/dailymenu?res_id="+rid, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
                xhttp.send();
              }
              



              div3.appendChild(ct);
              var br = document.createElement("br");
              div3.appendChild(br);
              div3.appendChild(cp1);
              div3.appendChild(btn);
              var br1 = document.createElement("br");
              div3.appendChild(br1);
              
              div1.appendChild(div3);
              
              mdiv.appendChild(div1);
              dres.appendChild(mdiv);
          }
        }
      };
    xhttp.open("GET", uri, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.setRequestHeader("user-key", "276156ab0a47b735331ced061c878585");
    xhttp.send();


}


function getResturantsWithCityName() {

}

function getResturantsWithLatAndLong() {

}

function getDailyMenuWithResturantId() {

}

function getReviewsWithResturantId() {

}