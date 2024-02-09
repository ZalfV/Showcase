$(".chart-bar").click(dropdown);

function dropdown() {
    if (this.childElementCount > 1 && this.clientHeight <= 30) {
        this.classList.add("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "-"
    } else if (this.clientHeight > 30) {
        this.classList.remove("extended");
        $(this).find(".dropdown-icon")[0].innerHTML = "+"
    }
}