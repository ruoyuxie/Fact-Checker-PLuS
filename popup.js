$(function () {
    $('#fact').keyup(function () {
        $('#check').text('Check for ' + $('#fact').val())
        temp = document.getElementById("fact").value;
    });
    $('#action').click(function () {
        getInput();
    });
});


function getInput() {
    var dataFromUser = document.getElementById("fact").value;
    $('#fact').val('');

    console.log("Processed Sentences:")
    console.log(dataFromUser)
    chrome.storage.local.set({"Input": dataFromUser}, function () {
        console.log('Input Value is set to: ')
        console.log(queryResults)
    });
    // API call

    queryResults = makeAPIRequest1(dataFromUser)

    queryResults.then(function (dataFromUser) {
        if (dataFromUser.claims) {
            chrome.storage.local.set({"Data": dataFromUser}, function () {
                console.log('Value is set to: ')
                console.log(queryResults)
                chrome.tabs.create({'url': chrome.extension.getURL('results.html')}, function (tab) {
                    // Tab opened.
                });
            });
        } else {
            console.log("No results from API")
            chrome.tabs.create({'url': chrome.extension.getURL('noResults.html')}, function (tab) {
                // Tab opened.
            });
        }
    });


    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (tab.url.indexOf('results.html') != -1 && changeInfo.status == 'complete') {
            chrome.storage.local.get(['Data', 'Input'], function (query) {
                var inputText = dataFromUser
                document.getElementById("inputText").innerHTML = inputText

                var data = query.Data
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
                document.getElementById("dataClaim2URL").href = dataClaim2URL

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
                document.getElementById("dataClaim3URL").href = dataClaim3URL

                var emailSubject = "Fact Check: " + inputText
                var claim1Body = "%0D%0A%0D%0A%0D%0AClaim: " + dataClaim1Text + "%0D%0A%0D%0A%0D%0AClaimant: " + dataClaim1Claimant + "%0D%0A%0D%0A" + dataClaim1Publisher + " Rating: " + dataClaim1TextualRating + "%0D%0A%0D%0AArticle title: " + dataClaim1Title + "%0D%0A%0D%0AURL: " + dataClaim1URL
                var claim2Body = "%0D%0A%0D%0A%0D%0AClaim: " + dataClaim2Text + "%0D%0A%0D%0A%0D%0AClaimant: " + dataClaim2Claimant + "%0D%0A%0D%0A" + dataClaim2Publisher + " Rating: " + dataClaim2TextualRating + "%0D%0A%0D%0AArticle title: " + dataClaim2Title + "%0D%0A%0D%0AURL: " + dataClaim2URL
                var claim3Body = "%0D%0A%0D%0A%0D%0AClaim: " + dataClaim3Text + "%0D%0A%0D%0A%0D%0AClaimant: " + dataClaim3Claimant + "%0D%0A%0D%0A" + dataClaim3Publisher + " Rating: " + dataClaim3TextualRating + "%0D%0A%0D%0AArticle title: " + dataClaim3Title + "%0D%0A%0D%0AURL: " + dataClaim3URL
                var emailBody = "Top 3 Results" + claim1Body + claim2Body + claim3Body
                var mailTo = "mailto:?subject=" + emailSubject + "&body=" + emailBody
                document.getElementById("dataClaimMailTo").href = mailTo
            });
        }
    })

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (tab.url.indexOf('noResults.html') != -1 && changeInfo.status == 'complete') {
            chrome.storage.local.get(['Input'], function (query) {
                var inputText = dataFromUser
                document.getElementById("inputText").innerHTML = inputText
            });
        }
    })


}


// Reads API key from local text file
async function readAPIkey(file) {
    try {
        let text = await fetch(file)
            .then(response => {
                return response.text();
            });
        return text;
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

// Send Google API request
async function getAPIRequest(apiKey, query) {
    try {
        // Set up URL
        var url = new URL('https://factchecktools.googleapis.com/v1alpha1/claims:search?');
        url.searchParams.append('key', apiKey);
        url.searchParams.append('query', query);

        // Send query
        let result = await fetch(url,
            {
                method: 'GET',
                mode: 'cors'
            })
            .then(response => {
                return response.json();
            });
        return result;
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

// Make API request
async function makeAPIRequest1(query) {
    try {
        let queryResults = await readAPIkey('./api_key.txt')
            .then(key => getAPIRequest(key, query))
            .then(result => {
                return result;
            });
        return queryResults
    } catch (err) {
        console.error(err);
    }
}