import {escapeHtml} from "./common.js";

var blockZindex = 1000;

function blockPage() {
    // create a block page: a div with high z-index, so the user cannot interact to
    // any elements below it
    let blockdiv = $("<div id='blockpage'></div>");
    blockdiv.css(
        {
            "height": "100%",
            "width": "100%",
            "position": "absolute",
            "top": "0",
            "left": "0",
            "background-color": "rgba(0,0,0,0.6)",
            "z-index": `${blockZindex}`
        }
    );
    return blockdiv;
}

function showMessage(msg) {
    // this create a modal window that behaves like a pop-up, but it is not a pop-up
    // create a blocking layer. This will make modal the new window
    var blockdiv = blockPage();
    let div = $("<div class='customAlert'>" +
        "<div id='message'></div>" +

        "</div>");
    blockdiv.appendTo("body");
    // create a new div
    $("#blockpage").append(div);
    div.css({
        "z-index": `${blockZindex + 1}`,
    });
    // put some animation and special effect before showing the message
    div.animate({opacity: '1'}, 300, function () {
        // at the end of the animation append a button and show the message
        $("#message").text(escapeHtml(msg) + "\n");
    });
    div.animate({height: '15%', opacity: '0.6'}, "slow");
    div.animate({width: '50%', opacity: '0.8'}, "slow");
    div.animate({opacity: '1'}, "slow");
}

function redBorder() {
    $(".customAlert").css("border", "3px solid #FF0000");
    $(this).closest('form').find("input[type=text], input[type=password]").val("");
    $('input').val('');
}

function removeAll() {
    $(".customAlert").remove();
    $("#blockpage").remove();
}

function addRemoveButton(msg, showForm) {
    let btn = $("<button id='rmv'></button>");
    btn.html(msg);
    btn.on("click", function () {
        // when the button is pressed, the 'fake' alert window is removed
        removeAll();
        if(showForm){
            $("form").show();
        }
    });
    //just to make the animation smoother
    setTimeout(function (){
        $(".customAlert").append(btn);
    }, 600);
    return btn;
}

function setOpacityAndRemoveListener() {
    $(".customAlert").css({'opacity': 1});
    $(".customAlert button").on("click", function () {
        window.location.replace("../html/bin.php?mode=edit")
    });
}

export {showMessage, removeAll, redBorder, addRemoveButton, setOpacityAndRemoveListener}

