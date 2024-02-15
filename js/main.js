let slideTimer = window.setTimeout("slideRight()", 5000);

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
