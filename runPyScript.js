// Run python scripts
function runPyScript(input) {
    $.ajax({
        type: "POST",
        url: "/api_request.py",
        data: { param: input },
        success: callbackFunc
    });
}


// Callback function
function callbackFunc(response) {
    // do something with the response
    console.log(response);
}