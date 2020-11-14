<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:POST,GET");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Content-Type,Authorization,X-Requested-With,Access-Control-Allow-Origin");
    $data = json_decode(file_get_contents("php://input"),true);
    if(empty($data['tripId']))
    {
        echo json_encode(array("flg"=>-1));
    }
    else
    {
        $tripObj = new trip();
        $flg = $tripObj->deleteTrip($data['tripId']);
        if($flg == 1)
        {
            echo json_encode(array("flg"=>1));
        }
        else if($flg == 0)
        {
            echo json_encode(array("flg"=>-2));
        }
        else if($flg == -1)
        {
            echo json_encode(array("flg"=>-3));
        }
    }
?>