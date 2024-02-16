
$(document).ready(function() {
    $(".contact-form .captcha-confirm").on('click', function() {
        (captchaCheck())? formFieldsCheck() : flashIncorrect();
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

function formFieldsCheck() {
    const formContent = getFields();
    let allFieldCorrect = true;

    for(let field in formContent) {
        formContent[field] = sanitizeInput(formContent[field]);
        
        if (!checkField(formContent[field])) {
            allFieldCorrect = false
            // Insert field value into array
            incorrectFields.push($("#"+field)[0].getAttribute("placeholder"));
        };
    }

    if (allFieldCorrect) {
        return true
    } else {
        flashIncorrect();
    };
}

function flashIncorrect() {
    let errorMessage = "";

    // If captcha is not correct don't input fields into error message
    if (incorrectFields.length > 0) {
        for (let incorrectField in incorrectFields) {
            errorMessage += incorrectFields[incorrectField] + " is niet goed ingevuld, ";
        }
    
        // Reset incorrect fields
        incorrectFields = [];
    } else {
        errorMessage = "Captcha is incorrect";
    }

    // Fill error message
    $(".error-contact-message")[0].innerHTML = errorMessage;
    $(".error-contact-message").show();
    // Timer for hiding flash message
    startTimer(3000)
}

// Asynchronous function to create a timer
async function startTimer(timeInMs) {
    await new Promise(resolve => setTimeout(resolve, timeInMs));
    $(".error-contact-message").hide();
}

// Is field correctly formatted
function checkField(fieldValue) {
    if (fieldValue.length > 1) {
        return true;
    }
    return false;
}

function sanitizeInput(input) {
    // Implement proper escaping logic
    return input.replace(/"/g, '""');
  }

async function sendMail() {
    const fields = getFields();

    try {
        let response = await fetch('http://localhost:5136/Mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fields)
        });
    }
    catch(error) {

    }
}

// when removing submit disable, disable inputs to disqourage changing inputs on submit