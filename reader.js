fetch("./query-results.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        console.log("data");
        console.log(data);
        console.log("data claim");
        console.log(data.claims[0].text);
    });