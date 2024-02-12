$(".chart-bar").click(dropdown);
$(".chart-header").click(dropdown2);


function dropdown() {
    // if dorpdown content contains an element and is not extended
    if (this.childElementCount > 1 && !this.classList.contains("extended")) {
        this.classList.add("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "-"
        //if dropdown is extended
    } else if (this.classList.contains("extended")) {
        this.classList.remove("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "+"
    }
}

function dropdown2() {
    let targetElement = $(this).next()[0];

    if (!targetElement.classList.contains("extended")) {
        targetElement.classList.add("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "-"
    } else if (targetElement.classList.contains("extended")) {
        targetElement.classList.remove("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "+"
    }
}