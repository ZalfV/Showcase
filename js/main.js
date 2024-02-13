var slideTimer = window.setTimeout("slideRight()", 5000);

// $(document).ready(function() {
//     slideTimer;
// })

/*active sub-catagorie*/
$('.catagories').click(changeCategory);

function changeCategory() {
    var catagorie = $(this).children().text();
    if ($('.content#' + catagorie).is(":hidden"))
        $('.catagories').removeClass('active');
        $(this).addClass('active');
        $('.content#' + catagorie).click();
}

/*active sub-catagorie content*/
$('.content').click(expandCategoryContent);

function expandCategoryContent() {
    if ($(this).is(":hidden")) {
        $('.content').hide();
        var clicked_id = $(this).attr('id');
        $('.content#' + clicked_id).animate({
            left: '+=50',
            height: 'toggle'
        }, 500, function () {}).show();
    };
    var catagories = $('div.catagories');
    for(i = 0; i > catagories.length; i++) {
        if (catagories[i].hasClass('active')) {
            catagories[i].removeClass('active')
        }
    }
}

/*zoom*/
$('.container').find('img').click(function() {
    var clicked_img = $(this).attr('src');
    $('#zoom img').attr('src', clicked_img);
    $('#zoom').show();
});
$('#zoom').click(function() {
    $('#zoom').hide();
    $('#zoom img').attr('src', '');
});

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
