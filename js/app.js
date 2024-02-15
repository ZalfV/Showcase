
$(document).ready(function() {
    $(".contact-form .captcha-confirm").on('click', function() {
        SendMail();
    });
});
$(".captcha-confirm").click();

function chaptchaCheck() {
    // if captcha correct flash good && waardes goed
    if (true) {
        formContent = getFields();
    }
        // check all inputs
        //if correct call method for enabling submit button
    // if incorrect flash incorrect
}

function formFieldsCheck(fomrContent) {
    const formContent = GetFields();

    fomrContent.FirstName
}

function checkField(field) {
    field
}

function GetFields() {
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

async function SendMail() {
    const fields = GetFields();

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