<?php

if (!isset($_SESSION)) {
    session_start();
}

function isLogged()
{
    if (!isset($_SESSION["name"])) {
        return false;
    } else {
        return true;
    }
}

function pwdVerify($username, $pwd)
{
    try {
        $db = getConnection();
        $sql = "SELECT password FROM users WHERE username = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$username]);
        $pass = $stmt->fetchColumn();
        $pwd = md5($pwd);
        closeConnection($db);
        return $stmt->rowCount() > 0 && $pass === $pwd;
    } catch (PDOException $p) {
        echo $p->getMessage();
    }
}

function getConnection()
{
    try {
        $connstr = "mysql:dbname=codesharing;host=localhost:3306";
        $db = new PDO($connstr, "root", "");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $db;
    } catch (PDOException $ex) {
        echo $ex->getMessage();
    }
}

function closeConnection(&$connection)
{
    $connection = null;
}

function checkUsername($username)
{
    try {
        $db = getConnection();
        $decoded = json_decode($username, true);
        $uname = $db->quote($decoded["username"]);
        $rows = $db -> query("SELECT username FROM users WHERE username = $uname");
        closeConnection($db);
        return $rows->rowCount();
    } catch (PDOException $p) {
        echo $p->getMessage();
    }

}

function insertUser($username, $password)
{
    try {
        $db = getConnection();
        $sql = "INSERT INTO users VALUES (?,MD5(?))";
        $stmt = $db->prepare($sql);
        $stmt->execute([$username, $password]);
        closeConnection($db);
        return 1;
    } catch (PDOException $ex) {
        return 0;
    }
}

function insertBin($code, $language, $creator)
{
    try {
        $db = getConnection();
        $sql = "INSERT INTO code (bin, language, creator) VALUES (?, ?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->execute([$code, $language, $creator]);
        closeConnection($db);
        return true;
    } catch (PDOException $ex) {
        return false;
    }
}

function getBin($id)
{
    try {
        $db = getConnection();
        $sql = "SELECT c.idCode, c.language, c.bin, l.link FROM code c, links l WHERE c.idCode = ? AND c.idCode = l.idCode";
        $stmt = $db->prepare($sql);
        $stmt->execute([$id]);
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        closeConnection($db);
        return $res;
    } catch (PDOException $ex) {
        return null;
    }
}

function updateBin($id, $code, $creator)
{
    try {
        $db = getConnection();
        $sql = "UPDATE code SET bin=? WHERE idCode = ? AND creator = ?";
        $stmt = $db->prepare($sql);
        closeConnection($db);
        return $stmt->execute([$code, $id, $creator]);
    } catch (PDOException $ex) {
        return false;
    }
}

function deleteLink($id)
{
    try {
        $db = getConnection();
        $sql = "DELETE FROM links WHERE idCode = ?";
        $stmt = $db->prepare($sql);
        closeConnection($db);
        return $stmt->execute([$id]);
    } catch (PDOException $ex) {
        return false;
    }
}

function deleteBin($id, $creator)
{
    try {
        $db = getConnection();
        $sql = "DELETE FROM code WHERE idCode = ? AND creator = ?";
        $stmt = $db->prepare($sql);
        closeConnection($db);
        return $stmt->execute([$id, $creator]);
    } catch (PDOException $ex) {
        return false;
    }
}

function getUserBins($creator)
{
    try {
        $db = getConnection();
        $sql = "SELECT idCode, bin FROM code WHERE creator = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$creator]);
        closeConnection($db);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $ex) {
        return null;
    }
}

function getLastInserted($creator)
{
    try {
        $db = getConnection();
        $sql = "SELECT bin, MAX(idCode) AS last FROM code WHERE creator = ? AND idCode = (SELECT MAX(idCode) FROM code WHERE creator = ?)";
        $stmt = $db->prepare($sql);
        //second creator needed for the subquery
        $stmt->execute([$creator, $creator]);
        closeConnection($db);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $ex) {
        return $ex.getMessage();
    }
}

function insertLink($link, $id)
{
    try {
        $db = getConnection();
        $sql = "INSERT INTO links VALUES (?, ?)";
        $stmt = $db->prepare($sql);
        $stmt->execute([$link, $id]);
        closeConnection($db);
        return true;
    } catch (PDOException $ex) {
        echo $ex->getMessage();
    }
}

?>