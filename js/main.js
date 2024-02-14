let slideTimer = window.setTimeout("slideRight()", 5000);
let themeIndex = 1;
// r,g,b,orange,purple
let colors = ["#FF3333","#88e524","#33BFFF","#FF5733","#B533FF"];

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

function initDarkMode() {
    // if no local theme saved create new one
    if (localStorage.getItem("theme") != null) {
        $(document.body).attr("data-theme", localStorage.getItem("theme"));
    } else {
        $(document.body).attr("data-theme", "light");

        setLocalTheme("light");
    }
}

function initAccentTheme() {
    if (localStorage.getItem("accentTheme") != null) {
        document.documentElement.style.setProperty("--accent", colors[localStorage.getItem("accentTheme")]);
    } else {
        // set to second color
        setLocalAccentTheme(1);
    }
}

function toggleDarkMode() {
    ($(document.body).attr("data-theme") == "light") ? $(document.body).attr("data-theme", "dark") : $(document.body).attr("data-theme", "light");

    setLocalTheme($(document.body).attr("data-theme"));
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

/*slideshow*/
function slideRight() {
    var slides = $('.slideshow > .slides').find('img');
    for(i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('ss-active')) {
            var currentSlide = $('.slides').find('img')[i];
            if (i == slides.length - 1) {i = -1} /*if last slide resets to first slide*/
            var nextSlide = $('.slides').find('img')[i + 1];
            $(currentSlide).removeClass('ss-active');
            $(nextSlide).addClass('ss-active');
            slideshowIdle();
            return;
        }
    };
}
$('.slideButton').click(function() {
    var slides = $('.slideshow > .slides').find('img');
    for(i = 0; i < slides.length; i++) {
        if (slides[i].classList.contains('ss-active')) {
            var currentSlide = $('.slides').find('img')[i];
            if ($(this).attr('id') == 'slideL') {
                if (i == 0) {i = slides.length} /*if first slide resets to last*/
                var nextSlide = $('.slides').find('img')[i - 1];
            }
            // if ($(this).attr('id') == 'slideR') {
            else {
                if (i == slides.length - 1) {i = -1} /*if last slide resets to first slide*/
                var nextSlide = $('.slides').find('img')[i + 1];
            }
            $(currentSlide).removeClass('ss-active');
            $(nextSlide).addClass('ss-active');
            slideshowIdle();
            return;
        }
    };
});
/*resets timer when slideshow button is clicked*/
function slideshowIdle() {
    clearTimeout(slideTimer);
    slideTimer = window.setTimeout("slideRight()", 5000);
}
