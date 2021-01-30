import * as customAlert from "./customAlerts.js";
import * as commons from "./common.js";

function manageLink(id, request) {
    if (request === 'put') {
        let data = {
            id: id,
            link: generateUrl(id)
        };
        data = JSON.stringify(data);
        $.ajax({
            url: "../php/binManager.php",
            type: "POST",
            dataType: "json",
            data: {action: 'insertlink', data: data},
            error: function () {
                customAlert.showMessage("Could not complete the action");
                customAlert.redBorder();
                customAlert.addRemoveButton("Oh, I understand", true);
                //if link insert causes error, remove also the bin since it won't be shared
                commons.deleteOnlyBin();
            }
        });
    } else {
        customAlert.showMessage("Sorry, invalid request");
        customAlert.redBorder();
        customAlert.addRemoveButton("I understand...", true);
    }
}

function generateUrl(idBin) {
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    search_params.set('mode', 'view');
    search_params.set('id', idBin)
    url.search = search_params.toString();
    return url.toString();
}

function appendUrl(url) {
    let text = "Congrats, new bin created! \n To share your code send this link: \n" + url;
    let urlDiv = "<div class='instruction' id='url'></div>"
    $("main").append(urlDiv);
    $("#url").text(commons.escapeHtml(text));
    $("form").hide();
    $("#url").show();
}

function getParam(param) {
    let url = new URL(window.location.href);
    let search_params = url.searchParams;
    return search_params.get(param);
}

export {manageLink, appendUrl, getParam, generateUrl}