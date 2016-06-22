# magic_mirror
Site to display on a "magic mirror" that shows current time, bus arrivals, metro arrivals and tram arrivals.
See instructions on how to build the mirror displaying the site here: http://edvinsson.nu/magic_mirror/

Except from the files "index.php", "script.js" and "style.css" you'll need two files "buss.php" and "alvik.php" which only collects a json file from Trafiklab with the bus, metro and tram arrivals. They looks something like this:

```
<?php 
/*Collects json file from SL API, goes to the array of the buses and prints every current bus leave*/
$json = file_get_contents('api.sl.se/api2/realtimedepartures.<FORMAT>?key=<YOUR API KEY>&siteid=<SITE ID>&timewindow=<TIMEWINDOW>');
header('Content-Type: application/json');
echo $json;
?>
````
