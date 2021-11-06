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
async function makeAPIRequest(query) {
    try {
        let queryResults = await readAPIkey('./api_key.txt')
            .then(key => getAPIRequest(key, query))
            .then(result => {
                return result;
            });
        return queryResults
    }
    catch (err) {
        console.error(err);
    }
}
