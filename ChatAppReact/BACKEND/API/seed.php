<?php
    require_once("./includes/autoload.php");
    header('Content-Type:application/json');
    header('Access-Control-Allow-Origin:*');
    header('Access-Control-Allow-Methods:POST');
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Authorization,X-Requested-With,Content-Type');
    $userObj = new User();

    $flg = $userObj->seed();
    if($flg['flg'] == 1)
    {
        http_response_code(200);
        echo json_encode(array("flg" => 1));
    }
    else
    {
        http_response_code(500);
        echo json_encode(array("flg" => 1));
    }

?>