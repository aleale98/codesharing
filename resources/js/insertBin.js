import * as customAlert from './customAlerts.js'
import * as commons from './common.js'
import * as viewModeManager from './manageView.js'
import * as timer from './inactivity.js'
import {updateContentList, appendLast} from './contentListManager.js'
import {getParam} from "./urlManager.js";
import {createUpdateDeleteButtons, checkAndSetEditor, mode} from './editorManager.js'

let editor = null;

$(document).ready(function () {
    $("#insert-code").hide();
    editor = ace.edit("editor");
    editor.setOptions({
        fontSize: "13pt"
    });
    timer.setInactivityTimeout(10000);
    $("#insert").click(
        function (ev) {
            if (!editor.getReadOnly()) {
                let code = {
                    "code": editor.getSession().getValue(),
                    "lang": mode
                };
                if(editor.getSession().getValue().length === 0){
                    code.code = "\/\/ name your bin here...";
                }
                code = JSON.stringify(code);
                commons.insertBin(code, function (result) {
                    if (result.res == 1) {
                        customAlert.showMessage("Succesfully inserted new Bin");
                        customAlert.addRemoveButton("Ok, I got it", false);
                        appendLast();
                        setTimeout(function () {
                            customAlert.removeAll();
                        }, 5000);
                    }
                }, function (result) {
                    customAlert.showMessage("Something went wrong!");
                    customAlert.redBorder();
                    customAlert.addRemoveButton("I got it", true);
                });
            } else {
                customAlert.showMessage("You cannot perform this action");
                customAlert.redBorder();
                customAlert.addRemoveButton("Ok", false);
            }
            ev.preventDefault();
        });
    $("#abort").on("click", function (ev) {
        $("form").hide();
        $("#lang-sel").show();
        ev.preventDefault();
    });
    if (getParam("mode") == "edit") {
        $("#editor").css("margin", "");
        $("#create").show()
            .on("click", function (ev) {
                $("#url").hide();
                $(".instruction").hide();
                $("#insert-code").hide();
                $("#lang-sel").css("display", "flex");
                $(".lang").show();
                $("#confirm-lang").show();
                ev.preventDefault();
            });
        updateContentList();
        checkAndSetEditor(editor);
        $("#logout").on("click", function () {
            commons.logout();
        });
        /*
        * Listener for the ul elements. When clicked, show corresponding bin*/
        $('#bins').on('click', 'li', function (ev) {
            $(".instruction").hide();
            $("#lang-sel").hide();
            $("#insert-code button").hide();
            viewModeManager.getBinFromId($(this).attr("value"), $("#username").text(), function (result) {
                if (result != null && result.bin != null) {
                    editor.getSession().setMode("ace/mode/" + result.language);
                    $("#insert-code").show();
                    viewModeManager.setEditor(result, editor);
                    createUpdateDeleteButtons(result.idCode, editor, result.link);
                }
            });
            ev.preventDefault();
        });

    } else if ((getParam("mode") == "view" && getParam("id") != null)) {
        $("#insert-code").show();
        $("#insert-code button").hide();
        $(".instruction").hide();
        if (!commons.checkIfLogged(function (result) {
            if (!result.logged) {
                viewModeManager.manage();
            } else {
                updateContentList();
            }
        })) ;
        editor.setReadOnly(true);
        $("#editor").css("margin", "auto");
        viewModeManager.getBinFromId(getParam("id"), null, function (result) {
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/" + result.language);
            viewModeManager.setEditor(result, editor);
        });
    } else {
        $("body").empty()
            .css("background-color", "#08255F");
        customAlert.showMessage("I got you hacker!");
        customAlert.redBorder();
        setTimeout(function () {
            commons.logout();
        }, 4000);

    }


});













