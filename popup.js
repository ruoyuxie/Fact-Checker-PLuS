$(function () {
    // $('#fact').keyup(function () {
    //     $('#check').text('Check for ' + $('#fact').val())
    // });

    $('#action').click(function () {
        var data = document.getElementById("fact").value;

       // chrome.notifications.create('limitNotify', data);

          $('#fact').val('');
          $('#check').text('text received: ' + data);
    });


});