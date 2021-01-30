<?php
    session_start();
    if (isset($_SESSION)) {
        session_unset();
        session_destroy();
    }
    session_start();
    $_SESSION["msg"] = "Logout successful.";
?>
