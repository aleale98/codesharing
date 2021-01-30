import * as customAlert from './customAlerts.js'
import {login} from './common.js'


$(document).ready(function() {
    customAlert.setOpacityAndRemoveListener();
    $(".signupbtn").click(
        function (ev) {
            let userData = {
                "username": $("#username").val(),
                "password": $("#psw").val()
            };
            if(userData.username.length != 0 && userData.password.length != 0){
                userData = JSON.stringify(userData);
                login(userData);
            }else{
                customAlert.showMessage("Please, do not leave any empty field");
                customAlert.redBorder();
                customAlert.addRemoveButton("Ok", true);
            }

            ev.preventDefault();
        });
    });