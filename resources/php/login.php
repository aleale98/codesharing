<?php
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 400 Invalid Request");
    die("ERROR 400: Invalid request - This service accepts only POST requests.");
}
require("common.php");
header("Content-type: application/json");

if ((isset($_POST['action']) && !empty($_POST['action']))) {
    $action = $_POST['action'];
    switch ($action) {
        case 'log':
            check();
            break;
        case 'check':
            $arr = array("logged" => isLogged());
            echo json_encode($arr);
            break;
        default:
            die("ERROR: Invalid request");
    }
}

function check()
{
    if (isset($_POST["data"])) {
        $userData = $_POST["data"];
        $decoded = json_decode($userData, true);
        $username = $decoded["username"];
        $pwd = $decoded["password"];
        if ($decoded["username"] != null && $decoded["password"] != null
            && !empty($decoded["username"]) && !empty($decoded['password']) && pwdVerify($username, $pwd) == true) {
            if (isset($_SESSION)) {
                session_regenerate_id(TRUE);
            }
            $_SESSION["name"] = $username;
        }
    }
    $arr = array( 'logged' => isLogged());
    $tmp = json_encode($arr);
    echo $tmp;
}

?>