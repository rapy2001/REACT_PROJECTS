<?php
    require_once("./partials/header.php");
    require_once("./partials/nav.php");
?>
<div>
    <h4 id = "msg" class = "msg"></h4>
    <div class = "add_trip box">
        <div class = "box_1">
            <form id = "addTrip_form" class = "form">
                <h3>Add a Trip</h3>
                <input type = "text" name = "trip_name" placeholder = "Trip Name" autocomplete = "off" id = "trip_name"/>
                <input type = "number" name = "trip_price" placeholder = "Trip Price" autocomplete = "off" id = "trip_price"/>
                <textarea name = "trip_description" id = "trip_description" autocmplete = "off">
                </textarea>
                <input type = "file" name = "image" name = "image"/>
                <input type = "submit" name = "submit" />
            </form>
        </div>
        <div class = "box_2">
            <h3>Trips App</h3>
        </div>
    </div>
    
</div>
        <footer class = "footer">
            <h4>2020. Rajarshi Saha</h4>
        </footer>
        <script type = "text/javascript" src = "../public/JS/jquery.js"></script>
        <script type = "text/javascript" src = "../public/JS/addTrip.js"></script>
    </body>
</html>