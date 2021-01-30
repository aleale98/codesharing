<title>Code sharing platform</title>
<meta name="description" content="Code sharing platform where users can share their own code">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<link rel="stylesheet" type="text/css" href="../css/style.css">
<link rel="stylesheet" type="text/css" href="../css/home.css">
<link rel="stylesheet" type="text/css" href="../css/form.css">
<link rel="stylesheet" type="text/css" href="../css/alerts.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="module" src="../js/login.js"></script>
<link rel="icon" type="image/png" href="../img/favicon.ico"/>
</head>
<body lang="en">
<?php
    require "../php/common.php";
?>
<div id="wrapper">
    <?php include_once "top.html"; ?>
    <?php if(!isLogged()){ ?>
    <form class="form">
        <div id="heading">
            <h1>Login</h1>
            <p>Please fill in this form to log in.</p>
        </div>
        <label for="username"><b>Username</b></label>
        <input type="text" placeholder="Choose a username" name="username" required id="username">
        <span id="valid-username"></span>
        <label for="psw"><b>Password</b></label>
        <input type="password" maxlength="32" minlength="4" placeholder="Enter Password" name="psw" id="psw" required>
        <div class="clearfix">
            <button type="submit" class="signupbtn">Login</button>
            <a href="home.php"><button type="button" class="cancelbtn">Back to home</button></a>
        </div>
    </form>
    </div>
<?php
}else{
?>
<div class="customAlert">Sorry, you are already logged in. <br>Log out before trying to attempt another login<br>
                            Redirecting to your personal page<br>
                            <button>Ok</button>
</div>
<?php
    }?>
</body>



