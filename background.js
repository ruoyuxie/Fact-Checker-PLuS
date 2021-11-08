var contextMenu = {
    "id": "test",
    "title": "Check for fact",
    "contexts": ["selection"]
};

chrome.storage.local.set({"Query": "Nothin yet"}, function() {
    console.log('Value is set to: ');
    console.log("nothin yet")
});

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
            chrome.storage.local.set({"Input": processed_sentences[0]}, function() {
                console.log('Input Value is set to: ')
                console.log(queryResults)
            });
            // API call
            queryResults = makeAPIRequest(processed_sentences[0])
            queryResults.then(function (data) {
                if(data.claims) {
                    chrome.storage.local.set({"Data": data}, function() {
                        console.log('Value is set to: ')
                        console.log(queryResults)
                        chrome.tabs.create({ 'url': chrome.extension.getURL('results.html') }, function (tab) {
                            // Tab opened.
                        });
                    });
                }
                else {
                    console.log("No results from API")
                }
            });
        }
    }
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if(tab.url.indexOf('results.html') != -1 && changeInfo.status == 'complete') {
        chrome.storage.local.get(['Data','Input'], function(query) {
            var inputText = query.Input
            document.getElementById("inputText").innerHTML = inputText

            var data = query.Data
            console.log("(inside tab listener) Value is now: ")
            console.log(data.Data)
            var dataClaim1Text = data.claims[0].text
            var dataClaim1Claimant = data.claims[0].claimant
            var dataClaim1Publisher = data.claims[0].claimReview[0].publisher.name
            var dataClaim1TextualRating = data.claims[0].claimReview[0].textualRating
            var dataClaim1Title = data.claims[0].claimReview[0].title
            var dataClaim1URL = data.claims[0].claimReview[0].url

            document.getElementById("dataClaim1Text").innerHTML = dataClaim1Text
            document.getElementById("dataClaim1Claimant").innerHTML = dataClaim1Claimant
            document.getElementById("dataClaim1Publisher").innerHTML = dataClaim1Publisher
            document.getElementById("dataClaim1TextualRating").innerHTML = dataClaim1TextualRating
            document.getElementById("dataClaim1Title").innerHTML = dataClaim1Title
            document.getElementById("dataClaim1URL").href = dataClaim1URL

            var dataClaim2Text = data.claims[1].text
            var dataClaim2Claimant = data.claims[1].claimant
            var dataClaim2Publisher = data.claims[1].claimReview[0].publisher.name
            var dataClaim2TextualRating = data.claims[1].claimReview[0].textualRating
            var dataClaim2Title = data.claims[1].claimReview[0].title
            var dataClaim2URL = data.claims[1].claimReview[0].url

            document.getElementById("dataClaim2Text").innerHTML = dataClaim2Text
            document.getElementById("dataClaim2Claimant").innerHTML = dataClaim2Claimant
            document.getElementById("dataClaim2Publisher").innerHTML = dataClaim2Publisher
            document.getElementById("dataClaim2TextualRating").innerHTML = dataClaim2TextualRating
            document.getElementById("dataClaim2Title").innerHTML = dataClaim2Title
            document.getElementById("dataClaim2URL").href=dataClaim2URL

            var dataClaim3Text = data.claims[2].text
            var dataClaim3Claimant = data.claims[2].claimant
            var dataClaim3Publisher = data.claims[2].claimReview[0].publisher.name
            var dataClaim3TextualRating = data.claims[2].claimReview[0].textualRating
            var dataClaim3Title = data.claims[2].claimReview[0].title
            var dataClaim3URL = data.claims[2].claimReview[0].url

            document.getElementById("dataClaim3Text").innerHTML = dataClaim3Text
            document.getElementById("dataClaim3Claimant").innerHTML = dataClaim3Claimant
            document.getElementById("dataClaim3Publisher").innerHTML = dataClaim3Publisher
            document.getElementById("dataClaim3TextualRating").innerHTML = dataClaim3TextualRating
            document.getElementById("dataClaim3Title").innerHTML = dataClaim3Title
            document.getElementById("dataClaim3URL").href=dataClaim3URL

            var emailSubject = "Fact Check: " + inputText
            var emailBody = "Top 3 Results:\n\nClaim1: "+dataClaim1Text 
            var mailTo = "mailto:?subject=" + emailSubject + "&body=" + emailBody
            document.getElementByID("mailTo").innerHTML = mailTo
            console.log("MAIL TOOOOOO")
            console.log(mailTo)
        });
    }
})

