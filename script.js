$(document).ready(function() {
        var api = "https://api.openweathermap.org/data/2.5/weather?q=";
        var city = "Hartford"
        var units = "&units=imperial"
        var apiKey = "&appid=c98bd9468877fad333e4e79067a90ed9"
        var queryURL = api + city + apiKey + units
        var apiForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" ;
        var queryURLForecast = apiForecast + city + apiKey + units;
        
     
        //////Search button/////////////////////////////////////
       $('#search-button').on("click", function(e) { 
        e.preventDefault();
        var currentWeather = $("#city-data").val()
        if($("#city-data").val() === '') {
            alert("Enter a city in the Search Bar!"); 
            return;
          
         }
           ///Information to retrieve the current Weather///////////////////
        

          $.ajax({ 
            url:queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response)

           
            //Transfer content to HTML///////////////////////////////
          $("#current-weather-image").attr({ 
            'src': 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '.png',
            'alt': response.weather[0].description
            
        })
        $("#city").html("<h3>" + response.name);
        $("#temp").text("Temperature (F): " + response.main.temp);
        $("#humidity").text("Humidity :" + response.main.humidity);
        $("#wind-speed").text("Wind-Speed :" + response.wind.speed);

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        $.ajax({
          url:"https://api.openweathermap.org/data/2.5/uvi?q=",
          method: "GET"

        }).then(function(response) {
          console.log(response);
          $("#uv-index").text("UV-Index :" + url + "&lat" + "&lon")
        })

        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function(response) {
            console.log(response) 
            populateForecast(response);
           })
          
          /// 5 Day forecast information//  ///////////////////////////////////////////

           function populateForecast(response) {
           console.log("populateForecast")
         $("#forecast").empty();
         var futureDays = 1;
          for (var i = 0;  i < 5; i++) {
         let newCard = $("<div>", {"class":"card-text"});
         let cardBody = $("<div>", {"class":"card-body-forecast"});
         cardBody.append($("<h3>", {"class":"card-title"}).text(moment().add(futureDays, 'days').format('MMMM Do YYYY, h:mm:ss a')));
         futureDays++;console.log("populateForecast")
         var img = $("<img>").attr( {
         'src': 'http://openweathermap.org/img/wn/04d/' + response.list[i] + '.png',
         'alt': response.list[0].description
           });
           console.log(response.list[i])
         cardBody.append(img); 
          cardBody.append($("<p>", {"class" : "card-text"}).text('Temp: ' + response.list[i].main.temp));
          cardBody.append($("<p>", {"class" : "card-text"}).text('Humidity: ' + response.list[i].main.humidity + '%'));
          cardBody.append($("<p>", { "class": "card-text"}).text('Wind-Speed: ' + response.list[i].wind.speed));
          newCard.append(cardBody);
          $('#forecast').append(newCard);
          document.getElementById("city-list").innerHTML += city + "<br /"; 
          
        
            }
          }
          
        }
            
          )})


          ////////////////////////////Add New List to the searched icons////////////////////////
          // Retrieve data from local Storage
          if (localStorage.getItem('cityList') !== "") {
          cityList = JSON.parse(localStorage.getItem('#cityList'));
          }
          function generateCity(city) {
            let newCity = $('<li class="list-group-item">').text(city)
            $("#city-List").prepend(newCity);
            }

        });
        


        

       





