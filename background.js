var contextMenu = {
    "id": "test",
    "title": "Check for fact",
    "contexts": ["selection"]
};

// here is the test code for adding options on contextMenu.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create(contextMenu);
})


chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "test" && clickData.selectionText) {
        if (typeof clickData.selectionText === 'string' || clickData.selectionText instanceof String) {
            var unprocessed_text = clickData.selectionText
            console.log("Unprocessed Text:")
            console.log(unprocessed_text)

            var unwanted_char = ["/", "\\", "(", ")", "~", "`", "!", "@", "#"
                , "$", "%", "^", "&", "*", "_", "-", "=", "+"
                , "<", ">", "?", "{", "}", "[", "]", '"', "'"
                , "|", ";", ":", ","]
            var processed_text = unprocessed_text
            for (var i = 0; i < unwanted_char.length; i++) {
                if (unprocessed_text.includes(unwanted_char[i])) {
                    processed_text = processed_text.replaceAll(unwanted_char[i], "")
                }
            };
            console.log("Processed Text:")
            console.log(processed_text)

            var unprocessed_sentences = processed_text.split(".")
            console.log("Unprocessed Sentences:")
            console.log(unprocessed_sentences)

            var processed_sentences = []
            var new_sentence
            for (var i = 0; i < unprocessed_sentences.length; i++) {
                if (unprocessed_sentences[i] != "") {
                    var new_sentence = unprocessed_sentences[i].trim()
                    processed_sentences.push(new_sentence)
                }
            }

            console.log("Processed Sentences:")
            console.log(processed_sentences)
            
            // API call
            queryResults = makeAPIRequest(processed_sentences[0])
            
            readResults(queryResults)
            
        }
    }
});


