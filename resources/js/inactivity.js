import * as customAlert from "./customAlerts.js";
import {logout} from './common.js'

let timer = -1;
let logoutTimer = -1;

function createTimer(msec) {
    timer = setTimeout(function () {
        customAlert.showMessage("Logging out");
        customAlert.redBorder();
        customAlert.addRemoveButton("I'm here", false);
        logoutTimer = setTimeout(function () {
            alert("logging out");
            logout();
        }, 10000);
    }, msec);
    $("#remove").click(function () {
        clearTimeout(logoutTimer);
        logoutTimer = null;
        customAlert.removeAll();
    });
}

function setInactivityTimeout(msec) {
    createTimer(msec);
    $(window).on("click keypress", function () {
        clearTimeout(timer);
        clearTimeout(logoutTimer);
        createTimer(msec);
    });
}

export {setInactivityTimeout}