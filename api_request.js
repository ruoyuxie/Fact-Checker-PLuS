// Reads API key from local text file
async function readAPIkey(file) {
    try {
        let resp = await fetch(file)
            .then(response => response.text())
            .then(textString => {
                return textString;
            });
        return resp
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
    return resp
}


// Send Google API request
async function getAPIRequest(apiKey) {
    try {
        let response = await fetch('https://factchecktools.googleapis.com/v1alpha1/claims:search?' + new URLSearchParams({
            'key': apiKey,
            'query': 'Kim Kardashian is married.'
        }),
            {
                method: 'GET',
                mode: 'no-cors'
            });
        console.log(response.url);
        return await response.json();
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

// Get the api key from text file
var apiKey = readAPIkey("api_key.txt");
apiKey.then(resp => console.log(resp));

// Query the result
apiKey.then(resp => console.log(getAPIRequest(resp)))
