<title>Code sharing platform</title>
<meta name="description" content="Code sharing platform where users can share their own code">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<link rel="stylesheet" type="text/css" href="../css/style.css">
<link rel="stylesheet" type="text/css" href="../css/home.css">
<link rel="stylesheet" type="text/css" href="../css/form.css">
<link rel="stylesheet" type="text/css" href="../css/alerts.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="module" src="../js/signup.js"></script>
<link rel="icon" type="image/png" href="../img/favicon.ico"/>

</head>
<body lang="en">
<?php
require "../php/common.php";
?>
<div id="wrapper">
    <?php include_once "top.html";
    if (!isLogged()){
    ?>
    <form class="form">
        <div id="heading">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
        </div>
        <label for="username"><b>Email</b></label>
        <input type="text" placeholder="Choose a username" name="username" required minlength="4" maxlength="8" id="username">
        <span id="valid-username"></span>
        <label for="psw"><b>Password</b></label>
        <input type="password" maxlength="32" minlength="4" placeholder="Enter Password" name="psw" id="psw" required>
        <label for="psw-repeat"><b>Repeat Password</b></label>
        <input type="password" maxlength="32" minlength="4" placeholder="Repeat Password" name="psw-repeat"
               id="psw-repeat" required>
        <span id='matches'></span>
        <div class="clearfix">
            <button type="submit" class="signupbtn">Sign Up</button>
            <a href="home.php">
                <button type="button" class="cancelbtn">Cancel</button>
            </a>
        </div>
    </form>
    <div id="success" class="form">Success</div>
</div>
<?php
}else{
?>
<div class="customAlert">Sorry, you are already logged in.<br>
    Redirecting to your personal page<br>
    <button>Ok</button>
</div>
<?php
} ?>