import * as customAlert from './customAlerts.js'

function escapeHtml(text) {
    var map = {
        '<': '&lt;',
        '>': '&gt;',
    };

    return text.replace(/[<>]/g, function (m) {
        return map[m];
    });
}

function removePopUp(timer) {
    setTimeout(function () {
        customAlert.removeAll();
    }, timer);
}

function updateBin(data) {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'update', data: data},
        success: function (result) {
            if (result.res) {
                customAlert.showMessage("Succesfully updated bin");
                customAlert.addRemoveButton("Ok, I got it", true);
            } else {
                customAlert.showMessage(showMessage("Sorry, something went wrong while updating"));
                customAlert.addRemoveButton("Ok, I got it", true);
                customAlert.redBorder();
            }
            /*
                * if the user does not do anything in 10 seconds
                * the popup disappears
                * */
            removePopUp(10000);
        }
    });
}

function deleteBin(id, successCallback) {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'delete', data: id},
        success: function (result) {
            successCallback(result);
        },
        error: function (result){
            customAlert.showMessage("Sorry, something went wrong");
            customAlert.redBorder();
            customAlert.addRemoveButton("Ok", true);
        }
    });
}

export function logout() {
    $.ajax({
        url: "../php/logout.php",
        type: "POST",
        success: function () {
            window.location.replace("../html/home.php");
        }
    });
}

function login(userData) {
    $.ajax({
        url: "../php/login.php",
        type: "POST",
        dataType: "json",
        data: {action: 'log', 'data': userData},
        success: function (result) {
            if (result.logged) {
                customAlert.showMessage("Logged succesfully, redirecting to your personal page");
                setTimeout(function () {
                    window.location.replace("../html/bin.php?mode=edit");
                }, 2000);
            } else {
                customAlert.showMessage("Invalid username or password");
                customAlert.redBorder();
                $("form").hide();
                customAlert.addRemoveButton("Ok, I got it", true);
            }
        },
        error: function () {
            customAlert.showMessage("Sorry, something went wrong");
            customAlert.redBorder();
            setTimeout(function () {
                logout();
            })
        }
    });
}

function checkIfLogged(successCallback) {
    $.ajax({
        url: "../php/login.php",
        type: "POST",
        dataType: "json",
        data: {action: 'check'},
        success: function (result) {
            successCallback(result);
        }
    });
}

function insertBin(code, successCallback, errorCallback) {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'insert', 'data': code},
        success: function (result) {
            successCallback(result);
        },
        error: function (result) {
            errorCallback(result);
        }
    });
}

function deleteOnlyBin() {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'deleteonlybin', data: id}
    });
}


export {removePopUp, deleteBin, updateBin, login, insertBin, escapeHtml, checkIfLogged, deleteOnlyBin}