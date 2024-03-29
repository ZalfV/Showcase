$(document).ready(function() {
    generateCaptcha();

    // $(".captcha-input").on("input", function() {captchaVisual();});
    $(".captcha-confirm").on("click", function() {
        if (captchaCheck() && formFieldsCheck()) {
            unlockSubmit();
        } else {
            flashIncorrect(3000, $(".flash-message"));
            generateCaptcha();
        }
    });
});

let captcha;

function generateCaptcha() {
 
    // Clear old input
    $(".captcha-input")[0].value = "";
 
    // Access the element to store
    // the generated captcha
    captcha = $(".captcha")[0];
    let uniquechar = "";
 
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
    // Generate captcha for length of
    // 5 with random character
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(
            Math.random() * randomchar.length)
    }
 
    // Store generated input
    captcha.innerHTML = uniquechar;    

    // Reset submit on generating new captcha
    checkSubmit();
}

function captchaCheck() {
    return ($(".captcha")[0].innerHTML == $(".captcha-input")[0].value)? true : false;
}

// Runs every input, disabled to protect against bots
// function captchaVisual() {
//     (captchaCheck())? $(".captcha").css({"border-color": "green"}) : $(".captcha").css({"border-color": "firebrick"});
// }

// Runs only when captcha button is pressed
function unlockSubmit() {
    $(".form-submit")[0].disabled = false;
}
function lockSubmit() {
    $(".form-submit")[0].disabled = true;
}
function checkSubmit() {
    if (captchaCheck() && formFieldsCheck()) {
        unlockSubmit();
    } else {
        lockSubmit();
    }
}

function printmsg() {
    const usr_input = document
        .getElementById("submit").value;
 
    // Check whether the input is equal
    // to generated captcha or not
    if (usr_input == captcha.innerHTML) {
        let s = document.getElementById("key")
            .innerHTML = "Matched";
        generate();
    }
    else {
        let s = document.getElementById("key")
            .innerHTML = "not Matched";
        generate();
    }
}