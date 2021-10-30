console.log("hello world")
$(function () {
    // $('#fact').keyup(function () {
    //     $('#check').text('Check for ' + $('#fact').val())
    // });
    console.log("here")
    $('#action').click(function () {
        var data = document.getElementById("fact").value;

       // chrome.notifications.create('limitNotify', data);
       console.log("data")
       console.log(data)
          $('#fact').val('');
          $('#check').text('text received: ' + data);
    });
});
