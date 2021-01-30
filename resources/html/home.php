        <title>Code sharing platform</title>
        <meta name="description" content="Code sharing platform where users can share their own code">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="stylesheet" type="text/css" href="../css/style.css">
        <link rel="stylesheet" type="text/css" href="../css/home.css">
        <link rel="stylesheet" type="text/css" href="../css/form.css">
        <link rel="stylesheet" type="text/css" href="../css/alerts.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script type="module" src="../js/home.js"></script>
        <link rel="icon" type="image/png" href="../img/favicon.ico"/>
    </head>
    <body lang="en">
    <div id="wrapper">
        <?php include "top.html";
              require_once "../php/common.php";
        ?>
        <main>
            <div id="content">
                <span>CodeSharing</span>
                <span>Share it easy!</span>
                <?php
                    if(isLogged()){
                ?>
                <a href="bin.php?mode=edit"><button class="signupbtn">Go to my personal page</button></a>
                <?php } ?>
            </div>
        </main>
    </div>
    