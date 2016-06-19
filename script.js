$(document).ready(function(){

	var buses = [];
  var metros = [];
  var trams = [];

    function formatTimeLeft(date) {
      var currentTime = new Date();

      if (date == null || currentTime.getTime() > date.getTime()) {
        return null;
      }

      var secondsLeft = (date.getTime() - currentTime.getTime()) / 1000;

      if (secondsLeft < 30) {
        return 'Nu';
      }
      else if (secondsLeft < 3600) {
        return (Math.round(secondsLeft / 60)).toString() + ' min';
      }

      return date.getHours() + ':' + date.getMinutes();
    };

    function updateClock ( ){
      var currentTime = new Date();
      var currentHours = currentTime.getHours();
      var currentMinutes = currentTime.getMinutes();

      // Pad the minutes with leading zeros, if required
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes;

      // Update the time display
      document.getElementById("clock").innerHTML = currentTimeString;

      /*----------------------------------------
                        BUS
      -----------------------------------------*/

      // Reset timetable for buses
      $('#busstidtabell .times').empty();

      // Load all new bus times and add them to the display
      for (var i in buses) {
      	var bus = buses[i];

        var time = formatTimeLeft(bus);
        if (time != null) {
          if(i==0){
            $('#busstidtabell .times').append('<p class="firstlistitem">' + time + '</p>'); //this is for making the first item in the list bigger but when counting down the list items will be erased one by one so it doesn't work very well...
          }else
             $('#busstidtabell .times').append('<p>' + time + '</p>');
        }
      }

      /*----------------------------------------
                        METRO
      -----------------------------------------*/

      $('#tunnelbanatidtabell .times').empty();

      for(var i in metros){
        var metro = metros[i];

        var time = formatTimeLeft(metro);
        if(time != null){
          if(i==0){
            $('#tunnelbanatidtabell .times').append('<p class="firstlistitem">' + time + '</p>'); //this is for making the first item in the list bigger
          }else
            $('#tunnelbanatidtabell .times').append('<p>' + time + '</p>');
        }
      }

       /*----------------------------------------
                        TRAM
      -----------------------------------------*/

      $('#tvarbanatidtabell .times').empty();

      for(var i in trams){
        var tram = trams[i];

        var time = formatTimeLeft(tram);
        if(time != null){
          if(i==0){
             $('#tvarbanatidtabell .times').append('<p class="firstlistitem">' + time + '</p>'); //this is for making the first item in the list bigger
          }else
            $('#tvarbanatidtabell .times').append('<p>' + time + '</p>');
        }
      }
    };//end of function updateClock()


    function getBusTime(){
        //saves a variable with the json file data in buss.php
        var slAPI = "http://localhost/buss.php";

        //gets the above variable information in json format
        $.getJSON( slAPI, {
            format: "json"
        })
        // when above request is done this function runs which will give the uotput from the expected bus arrival
        .done(function(data) {
            buses = [];
            for (var i in data.ResponseData.Buses) {
          	    buses.push(new Date(data.ResponseData.Buses[i].TimeTabledDateTime + '+02:00'));
            }

            updateClock();
        });
    };

    function convertRelativeTimeToDate(relativeTime) {
      if (relativeTime.indexOf('min') !== -1) {
        var secondsLeft = parseInt(relativeTime.replace(' min', '')) * 60;
        return new Date((new Date()).getTime() + (secondsLeft * 1000));
      }
      else if (relativeTime.match(/\d+\:\d+/)) {
        var now = new Date();
        return new Date(now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + 'T' + relativeTime);
      }

      return null;
    };

    function getMetroAndTramTime(){
        //saves a variable with the json file data in alvik.php
        var slAPI = "http://localhost/alvik.php";

        //gets the above variable information in json format
        $.getJSON( slAPI, {
            format: "json"
        })
        // when above request is done this function runs which will give the uotput from the expected metro arrival
        .done(function(data) {
          metros = [];
          for (var i in data.ResponseData.Metros){
            metros.push(convertRelativeTimeToDate(data.ResponseData.Metros[i].DisplayTime));
          }

          trams = [];
          for (var i in data.ResponseData.Trams){
            trams.push(new Date(data.ResponseData.Trams[i].TimeTabledDateTime + '+02:00'));
          }

          updateClock();
        });
    };

    updateClock();
    setInterval(updateClock, 60000);

    getBusTime();
    setInterval(getBusTime, 360000);

    getMetroAndTramTime();
    setInterval(getMetroAndTramTime, 360000);

});
