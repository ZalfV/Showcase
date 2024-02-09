function ChangeTab(targetTab) {
    var tabItems = $(".tabItem");

    //remove selected from all tabs
    for (const tabItem of tabItems) {
        tabItem.classList.remove("selected");
    }

    //add selected class to clicked header
    $(".tabs").find("#" + targetTab)[0].classList.add("selected");
}

function ChangeTabHeader() {
    //get tab name
    var targetTab = this.innerText;

    var tabHeaders = $(".tabHeaders ul li");

    //reset styling
    for (const tabHeader of tabHeaders) {
        tabHeader.style = "border-color: var(--accent);";
    }    

    //mark selected tabHeader
    this.style = "border-color: var(--text);";

    ChangeTab(targetTab);
}

//onclick for tabHeaders
$(".tabHeaders ul li").click(ChangeTabHeader);