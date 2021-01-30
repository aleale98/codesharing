import * as customAlert from './customAlerts.js'

function manage() {
    $("#username").text("Not logged in");
    $("#logout").text("Sign up");
    $("#logout").click(function (){
        window.location.replace("../html/signup-form.php");
    });
    $(".instruction").hide();
    $("#insert-code").show();
    $("#insert-code button").hide();
}

function getBinFromId(id, username, callback) {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'getbin', id: id, username: username},
        success: function (result){
            callback(result);
        },
        error: function () {
            customAlert.showMessage("Something went wrong");
            customAlert.redBorder();
            setTimeout(function (){
                window.location.replace("../html/home.php");
            }, 3000);
        }
    });
}

function setEditor(result, editor) {
    editor.getSession().setValue(result.bin);
}


export {manage, getBinFromId, setEditor}