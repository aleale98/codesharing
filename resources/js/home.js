import {setInactivityTimeout} from './inactivity.js'
import {checkIfLogged} from "./common.js";

$(document).ready(function (){
    /*set timer for inactivity. If the user is not logged in, it has no effect. */
    checkIfLogged(function (result){
        if(result.logged){
            setInactivityTimeout(300000);
        }
    });

});