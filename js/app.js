$(document).ready(function() {
    prepareFields();

    $(".contact-form .form-submit").on('click', function() {
        (formFieldsCheck)? safegaurdFields() : flashIncorrect(3000, $(".flash-message"));
    });
});

let incorrectFields = [];

function getFields() {
    const form = $(".contact-form")[0];

    const formContent = {
        firstName: $(form).find("#firstName")[0].value,
        lastName: $(form).find("#lastName")[0].value,
        phone: $(form).find("#phone")[0].value,
        senderEmail: $(form).find("#senderEmail")[0].value,
        subject: $(form).find("#subject")[0].value,
        body: $(form).find("#body")[0].value
    };

    return formContent
}

function prepareFields() {
    const fields = getFields();

    for (let field in fields) {
        let currentField = $(".contact-form").find("#"+field)[0];
        currentField.value = "";
        currentField.disabled = false;
    }
}

function disableFields() {
    const fields = getFields();

    for (let field in fields) {
        $(".contact-form").find("#"+field)[0].disabled = true;
    }
}

function formFieldsCheck() {
    const formContent = getFields();
    let allFieldCorrect = true;

    for(let field in formContent) {
        formContent[field] = sanitizeInput(formContent[field]);

        if (!checkField(formContent[field]) || !formatCorrect(field, formContent[field])) {
            allFieldCorrect = false
            
            // Insert field value into array
            incorrectFields.push($("#"+field)[0]);

            $("#"+field)[0].style = "border-color: firebrick;";
        } else {
            $("#"+field)[0].style = "border-color: var(--text);";
        }
    }

    return (allFieldCorrect)? true : false;
}

// Is field correctly formatted
function checkField(fieldValue) {
    if (fieldValue.length < 1) {
        return false;
    }

    return true;
}

function formatCorrect(fieldName, fieldValue) {
    if (fieldName.includes("phone")) {
        return !isNaN(parseInt(fieldValue));
    } else if (fieldName.includes("mail")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (fieldValue.length < 5 && !emailRegex.test(fieldValue)) {
            return false;
        }
    }

    return true;
}

function flashIncorrect() {
    let errorMessage = "";

    // If captcha is not correct don't input fields into error message
    if (captchaCheck() && incorrectFields.length > 0) {
        for (let incorrectField in incorrectFields) {
            errorMessage += "<li>" + incorrectFields[incorrectField].getAttribute("placeholder") + " is niet goed ingevuld </li>";
        }
    
        // Reset incorrect fields
        incorrectFields = [];
    } else {
        errorMessage = "Captcha is incorrect";
    }

    // Fill error message
    $(".flash-message")[0].innerHTML = errorMessage;
    $(".flash-message").show();
    // Timer for hiding flash message
    startFlashTimer(3000, $(".flash-message"))
}

function flashMailError() {
    // Fill error message
    $(".flash-message")[0].innerHTML = "Onverwachte error ontstaan, mail niet verstuurd. Probeer later opnieuw";
    $(".flash-message").show();
    // Timer for hiding flash message
    startFlashTimer(3000, $(".flash-message"))
}

// Asynchronous function to create a timer
async function startFlashTimer(timeInMs, element) {
    await new Promise(resolve => setTimeout(resolve, timeInMs));
    element.hide();
}

function sanitizeInput(input) {
    // Implement proper escaping logic
    return input.replace(/"/g, '""');
}

function flashMessage(statusCode, statusMessage) {
    let message;
    
    switch(statusCode) {
        case 200:
            message = statusCode + ": Bericht is succesvol verstuurd.";
            break;
        case 404:
            message = statusCode + ": Bericht kon niet verstuurd worden, probeer later opnieuw.";
            break;
        default:
            message = statusCode + ": " + statusMessage;
            break;
    }

    $(".flash-message")[0].innerHTML = message;
    $(".flash-message").show();
    startFlashTimer(3000, $(".flash-message"));
}

async function safegaurdFields() {
    if (formFieldsCheck()) {
        disableFields();

        // Show spinner while performing API call
        $(".spinner-wrapper").show();

        await sendMail();

        $(".spinner-wrapper").hide();

        prepareFields();

        unlockSubmit();
    }
}

async function sendMail() {
    const mailContent = getFields();

    try {
        // API call to send mail
        let response = await fetch('http://localhost:5136/Mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mailContent)
        });

        flashMessage(response.status, response.statusText);
    }
    catch(error) {
        flashMailError();
    }
}

// when removing submit disable, disable inputs to disqourage changing inputs on submit