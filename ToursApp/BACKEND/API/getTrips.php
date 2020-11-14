<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:POST,GET");
    header("Access-Control-Allow-Credentials:true");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Content-Type,Authorization,X-Requested-With,Access-Control-Allow-Origin");
    $data = json_decode(file_get_contents("php://input"),true);
    if(empty($data['page_num']))
    {
        echo json_encode(array("flg"=>-1));
    }
    else
    {
        $pageNum = $data['page_num'];
        $limit = 2;
        $skip = ($data['page_num'] - 1) * $limit;
        $trip = new trip();
        $trips = $trip->getTrips($skip,$limit);
        if($trips == -1)
        {
            echo json_encode(array("flg"=>-2));
        }
        else if($trips == 0)
        {
            echo json_encode(array("flg"=>-3));
        }
        else
        {
            echo json_encode(array("flg"=>1,"trips"=>$trips,"pageNum"=>$pageNum + 1));
        }
    }
?>