import * as commons from "./common.js";
import {updateContentList} from "./contentListManager.js";
import {appendUrl} from "./urlManager.js";
import * as customAlert from "./customAlerts.js";

let mode = "";

function checkAndSetEditor(editor) {
    editor.setTheme("ace/theme/monokai");
    $('select').on('change', function () {
        mode = this.value;
        $("#confirm-lang").prop("disabled", false);
    });
    $("#confirm-lang").on("click", function () {
        removeHideShareUpdateDelete();
        setTimeout(function () {
            $("#insert-code button").hide();
            $("#insert").show();
            $("#abort").show();
            let m = "ace/mode/" + mode;
            editor.setTheme("ace/theme/monokai");
            if (mode != "other" && mode != "") {
                editor.session.setMode(m);
            }
            editor.getSession().setValue("\/\/ name your bin here...");
            $("#insert-code").css("display", "flex")
                .show()
                .hide()
                .fadeIn(2000);
            $("#share, #hide").remove();
        }, 1100);
        $("#lang-sel").fadeOut(1000);
    });
}

function removeHideShareUpdateDelete() {
    $("#update, #delete, #hide, #share").remove();
}

function createUpdateDeleteButtons(li, editor, link) {
    $("#insert-code button").hide();
    let div = "<div id='buttons'></div>";
    $("#insert-code").append(div);
    let row1 = "<div id='row1'></div>";
    $("#buttons").append(row1);
    let row2 = "<div id='row2'></div>";
    $("#buttons").append(row2);
    removeHideShareUpdateDelete();
    $("#insert-code").css("display", "flex");
    let update = "<button id='update' class='signupbtn'>Update</button>";
    createShareButton("Share", link)
    createHideButton("Hide");
    let del = "<button id='delete' class='cancelbtn'>Delete</button>";
    $("#row1").append(update);
    $("#row1").append(del);
    $("#update").on("click", function (ev) {
        let data = {
            id: li,
            code: editor.getSession().getValue()
        };
        data = JSON.stringify(data);
        commons.updateBin(data);
        ev.preventDefault();
    });
    $("#delete").on("click", function (ev) {
        let data = {
            id: li
        };
        data = JSON.stringify(data);
        commons.deleteBin(data, function (result) {
            if (result.res) {
                customAlert.showMessage("Succesfully deleted bin");
                customAlert.addRemoveButton("Ok, I got it", false);
                $(".instruction").show();
                $("#url").hide();
                $("#insert-code").hide();
                updateContentList();
            } else {
                customAlert.showMessage("Sorry, something went wrong while deleting");
                customAlert.addRemoveButton("Ok, I got it", false);
                customAlert.redBorder();
                $(".instruction").show();
            }
        });
        ev.preventDefault();
    });
    $("#share").on("click", function (ev) {
        $("form").hide();
        appendUrl(link);
        ev.preventDefault();
    });
    $("#hide").on("click", function (ev) {
        $("#insert-code").hide();
        $(".instruction").show();
        $("#url").remove();
        ev.preventDefault();
    });
}


function createShareButton(msg) {
    let share = "<button id='share' class='signupbtn'>" + msg + "</button>";
    $("#row2").append(share);
}

function createHideButton(msg) {
    let hide = "<button id='hide' class='signupbtn'>" + msg + "</button>";
    $("#row2").append(hide);
}

export {createHideButton, createShareButton, createUpdateDeleteButtons, checkAndSetEditor, mode}