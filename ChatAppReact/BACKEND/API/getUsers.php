<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Authorization,X-Requested-With,Content-Type");
    $data = json_decode(file_get_contents("php://input"),true);
    if(empty($data['id']))
    {
        http_response_code(400);
        echo json_encode(array("flg" => -1));
    }
    else
    {
        $obj = new User();
        $result = $obj->getUsers();
        if(is_array($result))
        {
            for($i = 0; $i < count($result); $i++)
            {
                $flg = $obj->checkFriendshipStatus($data['id'],$result[$i]['user_id']);
                $flg1 = $obj->checkRequestStatus($data['id'],$result[$i]['user_id']);
                $flg2 = $obj->checkRequestStatus($result[$i]['user_id'],$data['id']);
                if($flg == 0)
                {
                    if($flg1['flg'] == 0 && $flg2['flg'] == 0)
                        $result[$i]['status'] = 0;
                    else
                        $result[$i]['status'] = 1;
                }
                else if($flg == 1)
                {
                    $result[$i]['status'] = 1;
                }
                else
                {
                    http_response_code(500);
                    echo json_encode(array("flg" => 0));
                    exit(); 
                }
            }
            http_response_code(200);
            echo json_encode(array("flg" => 1, "users" => $result));
        }
        else
        {
            http_response_code(500);
            echo json_encode(array("flg" => 0));
        }
    }
?>