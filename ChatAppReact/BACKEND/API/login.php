<?php
    require_once("./includes/autoload.php");
    header("Content-Type:application/json");
    header("Access-Control-Allow-Methods:POST");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Authorization,Content-Type,X-Requested-With");
    $data = json_decode(file_get_contents("php://input"),true);

    if(empty($data['username']) || empty($data['password']))
    {
        http_response_code(400);
        echo json_encode(array("flg" => -1));
    }
    else
    {
        $userObj = new User();
        $result = $userObj->getUserByUsername($data['username']);
        if($result['flg'] == 0)
        {
            http_response_code(200);
            echo json_encode(array("flg" => 2));
        }
        else if($result['flg'] == 1)
        {
            if($result['user']['password'] == sha1($data['password']))
            {
                $val = $userObj->changeLogStatus($result['user']['user_id']);
                if($val['flg'] == 1)
                {
                    $result['user']['log_status'] = 1;
                    http_response_code(200);
                    echo json_encode(array("flg" => 1, "user" => $result['user']));
                }
                else
                {
                    http_response_code(500);
                    echo json_encode(array("flg" => 0, "val" => $val));
                }
            }
            else
            {
                http_response_code(200);
                echo json_encode(array("flg" => 3));
            }
        }
        else
        {
            http_response_code(500);
            echo json_encode(array("flg" => 0));
        }
    }
?>