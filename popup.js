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
    var data = document.getElementById("fact").value;
    $('#fact').val('');
    $('#check').text('text received: ' + data);
    alert(data)
}

//displaying the results
fetch("./example.json")
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data){
        console.log(data.title);
    });
