fetch("./query-results.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (data) {
        console.log(document)
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

    });