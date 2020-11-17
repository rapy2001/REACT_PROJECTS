<?php
    require_once('./includes/autoload.php');
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods:POST');
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:Access-Control-Allow-Methods,Access-Control-Allow-Methods,Origin,X-Requested-With,Authorization,Content-Type");
    $data = json_decode(file_get_contents("php://input"),true);

    if(empty($data['userId']) || empty($data['friendId']))
    {
        http_response_code(400);
        echo json_encode(array("flg" => -1));
    }
    else
    {
        $requestObj = new Request();
        $friendObj = new Friend();
        $result1 = $friendObj->addFriend($data['userId'],$data['friendId']);
        $result2 = $friendObj->addFriend($data['friendId'],$data['userId']);
        if($result1['flg'] == 1 && $result2['flg'] == 1)
        {
            $result = $requestObj->deleteRequest($data['friendId'],$data['userId']);
            if($result['flg'] == 1)
            {
                http_response_code(200);
                echo json_encode(array("flg" => 1));
            }
            else
            {
                http_response_code(200);
                echo json_encode(array("flg" => -2));
            }
        }
        else
        {
            http_response_code(200);
            echo json_encode(array("flg" => -3, "result1" => $result1, "result2" => $result2,"data" => $data));
        }
    }
?>