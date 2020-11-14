<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Content-Type,X-Requested-With,Authorization");

    $data = json_decode(file_get_contents("php://input"),true);
    if(empty($data['name']) || empty($data['price']) || empty($data['image']) || empty($data['description']))
    {
    	http_response_code(400);
    	echo json_encode(array("flg" => -1));
    }
    else
    {
    	$tripObj = new Trip();
    	$result = $tripObj->insertTrip($data['name'],$data['description'],$data['price'],$data['image']);
    	if($result['flg'] == 1)
    	{
    		http_response_code(200);
    		echo json_encode(array("flg" => 1));
    	}
    	else
    	{
    		http_response_code(500);
    		echo json_encode(array("flg" => -1, "msg" =>$result['msg']));
    	}
    }

?>