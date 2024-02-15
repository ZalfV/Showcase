
$(document).ready(function() {
    $(".contact-form .captcha-confirm").on('click', function() {
        (formFieldsCheck())? sendMail() : null;
    });
});

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

    for(let field of formContent) {
        if (!checkField(field)) allFieldCorrect = false;
    }

    if (allFieldCorrect) return true;
}

// Is field correctly formatted
function checkField(field) {
    if (field instanceof HTMLElement && field.length > 1) {
        return (field == $("#"+field))? true : false;
    }
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