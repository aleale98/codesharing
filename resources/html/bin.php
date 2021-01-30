<?php session_start(); ?>
<title>Code sharing platform</title>
<meta name="description" content="Code sharing platform where users can share their own code">
<link rel="stylesheet" type="text/css" href="../css/style.css">
<link rel="stylesheet" type="text/css" href="../css/home.css">
<link rel="stylesheet" type="text/css" href="../css/form.css">
<link rel="stylesheet" type="text/css" href="../css/alerts.css">
<link rel="stylesheet" type="text/css" href="../css/bin.css">
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/default.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1" name="viewport"/>
<link rel="icon" type="image/png" href="../img/favicon.ico"/>
</head>
<body lang="en">
<?php require "../php/common.php" ?>
<div id="wrapper">
    <?php include_once "top.html";
    if (isLogged() || (isset($_GET["mode"]) && $_GET["mode"] == "view")){ ?>
    <script type="module" src="../js/insertBin.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js"
            integrity="sha512-GZ1RIgZaSc8rnco/8CXfRdCpDxRCphenIiZ2ztLy3XQfCbQUSCuk8IudvNHxkRA3oUg6q0qejgN/qqyG1duv5Q=="
            crossorigin="anonymous"></script>
    <main>
        <div id="util">
            <div id="profile">
                <img id="prof-pic" src="../img/m3.png">
                <div id="username"><?= htmlspecialchars($_SESSION["name"]) ?></div>
                <button id="logout">Logout</button>
            </div>
            <hr>
            <div id="content-list">
                <ul id="bins">

                </ul>
            </div>
        </div>
        <span class="instruction"> Press the + button to create a new bin <br>
        Click on one of the items in the list on the left to start browsing your content</span>
        <div id="lang-sel">
            <select class="lang">
                <option value="" selected disabled hidden>Choose a language</option>
                <option value="java">Java</option>
                <option value="c_cpp">C/C++</option>
                <option value="csharp">C#</option>
                <option value="python">Python</option>
                <option value="php">PHP</option>
                <option value="javascript">Javascript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="ruby">Ruby</option>
                <option value="other">Other</option>
            </select>
            <button id="confirm-lang" disabled>Confirm language</button>
        </div>
        <form id="insert-code">
            <div id="editor">
                <div id="x-close"></div>
            </div>
            <button type="submit" class="signupbtn" id="insert">Insert code</button>
            <button class="cancelbtn" id="abort">Cancel</button>
        </form>
    </main>
</div>
<?php
} else {
    header("location: home.php");
} ?>
</body>