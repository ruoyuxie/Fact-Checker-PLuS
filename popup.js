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
    //alert(data)
    chrome.tabs.create({'url': chrome.extension.getURL('results.html')}, function(tab) {});

}