var contextMenu={
    "id":"test ",
    "title": "Check for fact",
    "contexts":["selection"]
};

// here is the test code for adding options on contextMenu.
chrome.contextMenus.create(contextMenu);

chrome.contextMenus.onclicked.addListener(function (clickData){
    if (clickData.menuItemId == "test" && clickData.slectionText){
        if (typeof clickData.slectionText === 'string' || clickData.slectionText instanceof String) {
            print("this is text")
        }
    }
})