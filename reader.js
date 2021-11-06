    function readResults(results){
        var dataClaims = data.claims
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
        document.getElementById("dataClaim1URL").innerHTML = dataClaim1URL



        console.log("data claim");
        console.log(dataClaims);
        console.log(dataClaim1Text);
        console.log(dataClaim1Claimant);
        console.log(dataClaim1Publisher);
        console.log(dataClaim1TextualRating);
        console.log(dataClaim1Title);
        console.log(dataClaim1URL);


    };