$("#subject").on("input", function() {
    updateWordCount("subject", 200);
});
$("#body").on("input", function() {
    updateWordCount("body", 600);
});

function updateWordCount(target, maxWords) {
    const inputLength = $("#"+target)[0].value.length;
    $("#"+target+"-amount")[0].innerHTML = maxWords - inputLength + "/" + maxWords;
}