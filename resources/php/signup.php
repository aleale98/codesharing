<?php
require("common.php");

if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 400 Invalid Request");
    die("ERROR 400: Invalid request - This service accepts only POST requests.");
}
header("Content-type: application/json");

if ((isset($_POST['action']) && !empty($_POST['action']))) {
    $action = $_POST['action'];
    switch ($action) {
        case 'checkuser' :
            if (isset($_POST['username'])) {
                $uname = $_POST['username'];
                $arr = array("result" => checkUsername($uname));
                echo json_encode($arr);
            }
            break;
        case 'insertuser':
            if (isset($_POST['data'])) {
                $dataToInsert = $_POST['data'];
                $decoded = json_decode($dataToInsert, true);
                $arr = array("result" => 0);
                //to avoid inconsistent data
                if($decoded['username'] != null && $decoded['password'] != null && !empty($decoded['username']) && !empty($decoded['password']))
                    $arr = array("result" => insertUser($decoded['username'], $decoded['password']));
                echo json_encode($arr);
            }
            break;
        default:
            die("ERROR: Invalid request");
    }
}

?>