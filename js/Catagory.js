function changeTab() {
    var tabItem = $(".tabItem");

    //remove selected from all tabs
    for (var i = 0; i < tabItem.length; i++) {
        tabItem[i].className = "slideshow tabItem";
    }

    //get tab name
    var targetTab = this.innerText;

    //add selected class to clicked header
    $(".tabs").find("#" + targetTab)[0].className = "slideshow tabItem selected";
}

$(".tabHeaders ul li").click(changeTab);