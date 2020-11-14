<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:POST,GET");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Methods,Access-Control-Allow-Headers,Content-Type,Authorization,X-Requested-With,Access-Control-Allow-Origin");
    $data = json_decode(file_get_contents("php://input"),true);

    if(empty($data['tripName']) || empty($data['tripPrice']) || empty($data['tripDescription']) || empty($data['tripId']) || empty($data['tripImage']))
    {
        http_response_code(400);
        echo json_encode(array("flg"=>-1));
    }
    else
    {
        $tripObj = new trip();
        $ary = $tripObj->updateReactTrip($data['tripId'],$data['tripName'],$data['tripDescription'],$data['tripPrice'],$data['tripImage']);
        if($ary['flg'] == 1)
        {
            http_response_code(200);
            echo json_encode(array("flg"=>1));
        }
        else
        {
            http_response_code(500);
            echo json_encode(array("flg" => 0 , "msg" => $ary['msg']));
        }
    }

?>