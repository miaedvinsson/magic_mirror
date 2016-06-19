<?php
setlocale(LC_TIME, "sv_SE");
date_default_timezone_set('Europe/Berlin');
?><!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="300">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="script.js"></script>
  
</head>
<body>

        <p id="clock"></p></br>
        <p id="date">
            <?php echo strftime("%A %F vecka %V"); ?>
        </p>

        <div id="busstidtabell" class="timetable">
            <h3><img class="img" src="images/bus.gif" alt="Bus"> Minneberg-Alvik</h3>
            <div class="times"></div>
        </div>

        <div id="tunnelbanatidtabell" class="timetable">
            <h3><img class="img" src="images/metro.gif" alt="Metro"> Alvik-Centralen</h3>
            <div class="times"></div>
        </div>        

        <div id="tvarbanatidtabell" class="timetable">
            <h3><img class="img" src="images/tram.gif" alt="Tram"> Alvik-Solna</h3>
            <div class="times"></div>
        </div>

  </body>
</html>