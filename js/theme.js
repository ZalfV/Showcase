$(document).ready(function() {
    initDarkMode();
    initAccentTheme();

    // bind event to dark mode button
    $('.body').on('click', ".button-darkmode", function() {
        toggleDarkMode();
    });
    // bind event to theme button
    $('.body').on('click', ".button-theme", function() {
        changeAccentTheme();
    });
    // slideTimer;
})

let themeIndex = 1;
// r,g,b,orange,purple
let colors = ["#FF3333","#88e524","#33BFFF","#FF5733","#B533FF"];

function initDarkMode() {
    // if no local theme saved create new one
    if (localStorage.getItem("theme") != null) {
        $(document.body).attr("data-theme", localStorage.getItem("theme"));
    } else {
        $(document.body).attr("data-theme", "light");

        setLocalTheme("light");
    }
}

function toggleDarkMode() {
    ($(document.body).attr("data-theme") == "light") ? $(document.body).attr("data-theme", "dark") : $(document.body).attr("data-theme", "light");
    ($(document.body).attr("data-theme") == "light") ? $(".button-darkmode").class = "button-darkmode fa fa-toggle-on"  : $(".button-darkmode").class = "button-darkmode fa fa-toggle-off";

    setLocalTheme($(document.body).attr("data-theme"));
}

function initAccentTheme() {
    if (localStorage.getItem("accentTheme") != null) {
        document.documentElement.style.setProperty("--accent", colors[localStorage.getItem("accentTheme")]);
    } else {
        // set to second color
        setLocalAccentTheme(1);
    }
}

function changeAccentTheme() {
    // themeIndex overflow handling
    (themeIndex < 4) ? themeIndex += 1 : themeIndex = 0;

    document.documentElement.style.setProperty("--accent", colors[themeIndex]);

    setLocalAccentTheme(themeIndex);
}

function setLocalTheme(value) {
    localStorage.setItem("theme", value);
}

function setLocalAccentTheme(accentIndex) {
    localStorage.setItem("accentTheme", accentIndex);
}
