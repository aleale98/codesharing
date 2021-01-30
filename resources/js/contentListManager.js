import * as commons from "./common.js";
import * as urlManager from "./urlManager.js";
import * as customAlert from "./customAlerts.js"

function appendLi(text, id) {
    const li = "<li value='"+id+"'>" + commons.escapeHtml(text) + "</li>";
    $(li).attr("value", id);
    $("#bins").append(li);
}

function updateContentList() {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'retrieve', username: $("#username").text()},
        success: function (result) {
            $("#bins").empty();
            if(result != null){
                result = Object.values(result);
                for (let i = 0; i < result.length; i++) {
                    appendLi(result[i].bin.split("\n")[0].substring(0, 19), result[i].idCode);
                }
            }else{
                customAlert.showMessage("Sorry, something went wrong");
                customAlert.redBorder();
                customAlert.addRemoveButton("Ok", false);
            }
        }
    });
}

function appendLast() {
    $.ajax({
        url: "../php/binManager.php",
        type: "POST",
        dataType: "json",
        data: {action: 'getlast', username: $("#username").text()},
        success: function (result) {
            appendLi(result.code.split("\n")[0].substring(0, 19), result.id);
            urlManager.appendUrl(urlManager.generateUrl(result.id));
            urlManager.manageLink(result.id, 'put');
            $("form").hide();
        },
        error: function (){
            customAlert.showMessage("Sorry, something went wrong");
            customAlert.redBorder();
            customAlert.addRemoveButton("Ok", false);
        }

    });
}

export {updateContentList, appendLast}