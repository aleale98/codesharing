<?php
require "common.php";
if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "POST") {
    header("HTTP/1.1 400 Invalid Request");
    die("ERROR 400: Invalid request - This service accepts only POST requests.");
}
header("Content-type: application/json");
if ((isset($_POST['action']) && !empty($_POST['action']))) {
    $action = $_POST['action'];
    switch ($action) {
        case 'insert':
            if (isset($_POST['data'])) {
                $dataToInsert = $_POST['data'];
                $decoded = json_decode($dataToInsert, true);
                $languages = array("java", "c_cpp", "csharp", "python", "php", "javascript", "css", "html", "ruby", "other");
                $result = 0;
                if(in_array($decoded['lang'], $languages) && !empty($decoded['code']) && $decoded['code'] != null && !empty($decoded['code'])){
                    $result = insertBin($decoded['code'], $decoded['lang'], $_SESSION["name"]);
                }
                $arr = array("res" => $result);
                echo json_encode($arr);
            }
            break;
        case 'insertlink':
            if (isset($_POST['data'])) {
                $dataToInsert = $_POST['data'];
                $decoded = json_decode($dataToInsert, true);
                $arr = array("res" => 0);
                if(!empty($decoded['link'])){
                    $arr = array("res" => insertLink($decoded['link'], $decoded['id']));
                }
                echo json_encode($arr);
            }
            break;
        case 'retrieve':
            if (isset($_POST['username'])) {
                $creator = $_POST['username'];
                if($creator == $_SESSION['name'])
                    $result = getUserBins($_SESSION["name"]);
                else
                    $result = array(null);
                echo json_encode($result);
            }
            break;
        case 'getbin':
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                if($_POST["username"] == null || $_POST['username'] == $_SESSION['name'] ){
                    $temp = getBin($id);
                    $result = array("idCode" => $temp[0]["idCode"], "bin" => $temp[0]["bin"], "language" => $temp[0]["language"], "link" => $temp[0]["link"]);
                }else{
                    $result = array("bin" => null);
                }
                echo json_encode($result);
            }
            break;
        case 'getlast':
            if (isset($_POST['username'])) {
                $res = getLastInserted($_SESSION["name"]);
                $result = array("code" => $res[0]["bin"], "id" => $res[0]["last"]);
                echo json_encode($result);
            }
            break;
        case 'update':
            if (isset($_POST['data'])) {
                $dataToInsert = $_POST['data'];
                $decoded = json_decode($dataToInsert, true);
                $arr = array("res" => updateBin($decoded['id'], $decoded['code'], $_SESSION['name']));
                echo json_encode($arr);
            }
            break;
        case 'delete':
            if (isset($_POST['data'])) {
                $dataToDelete = $_POST['data'];
                $decoded = json_decode($dataToDelete, true);
                //both of the operations must be completed successfully.
                $arr = array("res" => deleteBin($decoded['id'], $_SESSION['name']) && deleteLink($decoded['id']));
                echo json_encode($arr);
            }
            break;
        case 'deleteonlybin':
            if (isset($_POST['data'])) {
                $arr = array("res" => deleteBin(getLastInserted($_SESSION['name']), $_SESSION['name']));
                echo json_encode($arr);
            }
            break;
        default:
            die("ERROR: Invalid request");
    }
}
?>
