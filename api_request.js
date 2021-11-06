// Reads API key from local text file
async function readAPIkey(file) {
    try {
        let text = await fetch(file)
            .then(response => {
                return response.text();
            });
        console.log(text);
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}


// Send Google API request
async function getAPIRequest(apiKey) {
    try {
        // Set up URL
        var url = new URL('https://factchecktools.googleapis.com/v1alpha1/claims:search?');
        url.searchParams.append('key', apiKey);
        url.searchParams.append('query', "The covid vaccine does not work.");

        // Send query
        console.log(url);
        let result = await fetch(url,
            {
                method: 'GET',
                mode: 'cors'
            })
            .then(response => {
                return response.json();
            });
        console.log(result);
    } catch (err) {
        console.error(err);
        // Handle errors here
    }
}

// Get the api key from text file
// var apiKey = readAPIkey('api_key.txt');

// Query the result
var result = getAPIRequest('AIzaSyA7FGpJIKd1p0lleUbwmm_9v7yic031pBk');
