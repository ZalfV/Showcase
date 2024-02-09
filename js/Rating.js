$(document).ready(function() {
    fillRatings();
})

function fillRatings() {
    var ratings = $(".rating");

    for (const rating of ratings) {
        addRating(rating, rating.getAttribute("data-value"));
    }
}

function addRating(currentRating, amount) {
    if (amount > 5) {amount = 5};

    for (var i = 0; i < amount; i++) {
        currentRating.append("★");
    }
    for (var i = amount; i < 5; i++) {
        currentRating.append("☆");
    }
}