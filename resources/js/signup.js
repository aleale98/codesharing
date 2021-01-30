import * as customAlert from './customAlerts.js'

function check() {
    $('#psw, #psw-repeat').on('keyup', function () {
        if ($("#psw").val() == $('#psw-repeat').val()) {
            $("#matches").html('Matching').css('color', 'green');
        } else
            $('#matches').html('Not Matching').css('color', 'red');
    });
}

$(document).ready(function () {
        customAlert.setOpacityAndRemoveListener();
        $("#psw").on("keypress", check);
        $("#username").on("focusout", function () {
            let data = {"username": $("#username").val()};
            data = JSON.stringify(data);
            $.ajax({
                url: "../php/signup.php",
                type: 'POST',
                dataType: 'json',
                data: {action: 'checkuser', 'username': data},
                success: function (result) {
                    try {
                        const myObj = result;
                        $('#valid-username').show();
                        if (myObj.result == 0 && $("#username").val().length != 0) {
                            $('#valid-username').html('Valid username').css('color', 'green');
                        } else if (myObj.result > 0) {
                            $('#valid-username').html('Invalid username').css('color', 'red');
                        } else {
                            $('#valid-username').hide();
                        }
                    } catch (err) {
                        console.log(result);
                        customAlert.showMessage("Sorry, there was an error");
                        customAlert.redBorder();
                        customAlert.addRemoveButton("I understand...", true);
                    }
                },
                error: function (result){
                    console.log(result);
                }
            });
        });
        let btn = $(".signupbtn");
        btn.click(
            function (ev) {
                if($("#username").val().length != 0 && $("#psw").val().length != 0 ){
                    let userData = {
                        "username": $("#username").val(),
                        "password": $("#psw").val()
                    };
                    userData = JSON.stringify(userData);
                    $.ajax({
                        url: "../php/signup.php",
                        type: "POST",
                        dataType: 'json',
                        data: {action: 'insertuser', 'data': userData},
                        success: function (result) {
                            const myObj = result;
                            if (myObj.result == 1) {
                                $("form").fadeOut(1000);
                                setTimeout(function () {
                                    customAlert.showMessage("Succesfully registered, redirecting to home page. Login from the home page");
                                }, 1100);
                                setTimeout(function () {
                                    window.location.replace("../html/home.php");
                                }, 3000);
                            } else {
                                customAlert.showMessage("Sorry, something went wrong!");
                                customAlert.redBorder();
                                customAlert.addRemoveButton("I understand", true);
                            }
                        },
                        error: function () {
                            customAlert.showMessage("An error occurred. Try again later");
                            customAlert.redBorder();
                            customAlert.addRemoveButton("I understand", true);
                        }
                    });
                }else{
                    customAlert.showMessage("Sorry, you cannot signup with this data");
                    customAlert.redBorder();
                    customAlert.addRemoveButton("I understand", true);
                }
                ev.preventDefault();
            });
        $("#create").hide();
    }
);


  
