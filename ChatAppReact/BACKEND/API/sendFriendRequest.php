<?php
    require_once("./includes/autoload.php");
    header('Content-Type:application/json');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Methods,Access-Control-Allow-Headers,Origin,Authorization,X-Requested-With,Content-Type");
    $data = json_decode(file_get_contents("php://input"),true);
    if(empty($data['userId']) || empty($data['friendId']))
    {
        http_response_code(400);
        echo json_encode(array('flg' => -1));
    }
    else
    {
        $userObj = new User();
        $flg1 = $userObj->checkRequestStatus($data['userId'],$data['friendId']);
        $flg2 = $userObj->checkRequestStatus($data['friendId'],$data['userId']);
        if($flg1['flg'] == 0 && $flg2['flg'] == 0)
        {
            $result = $userObj->sendFriendRequest($data['userId'],$data['friendId']);
            if($result['flg'] == 1)
            {
                http_response_code(200);
                echo json_encode(array("flg" => 1));
            }
            else
            {
                http_response_code(200);
                echo json_encode(array("flg" => -3));
            }
            
        }
        else if($flg1['flg'] == 1 || $flg2['flg'] == 1)
        {
            http_response_code(200);
            echo json_encode(array("flg" => 0));
        }
        else
        {
            http_response_code(500);
            echo json_encode(array("flg" => -2));
        }
    }
?>