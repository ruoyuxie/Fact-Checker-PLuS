var contextMenu={
    "id":"test",
    "title": "Check for fact",
    "contexts":["selection"]
};

// here is the test code for adding options on contextMenu.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(contextMenu);
})

console.log("here1")

chrome.contextMenus.removeAll(function() {
    console.log("here2")
    chrome.contextMenus.onClicked.addListener(function(clickData){
        console.log("here3")
        if (clickData.menuItemId == "test" && clickData.selectionText){
            console.log("here4")
            if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String) {
                console.log("here5")
                var unprocessed_text = clickData.selectionText
                console.log("Unprocessed Text:")
                console.log(unprocessed_text)
                
                var unwanted_char = ["/","\\","(",")","~","`","!","@","#"
                                    ,"$","%","^","&","*","_","-","=","+"
                                    ,"<",">","?","{","}","[","]",'"',"'"
                                    ,"|",";",":",","]
                var processed_text = unprocessed_text
                for(var i = 0; i<unwanted_char.length; i++) {
                    if(unprocessed_text.includes(unwanted_char[i])) {
                        processed_text = processed_text.replaceAll(unwanted_char[i],"")
                    }
                };
                console.log("Processed Text:")
                console.log(processed_text)

                var unprocessed_sentences = processed_text.split(".")
                console.log("Unprocessed Sentences:")
                console.log(unprocessed_sentences)

                var processed_sentences = []
                var new_sentence
                for(var i = 0; i<unprocessed_sentences.length; i++) {
                    if(unprocessed_sentences[i] != "") {
                        var new_sentence = unprocessed_sentences[i].trim()
                        processed_sentences.push(new_sentence)
                    }
                }

                console.log("Processed Sentences:")
                console.log(processed_sentences)
            }
        }
    })
});