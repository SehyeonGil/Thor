$(document).ready(function(){
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/message/newCheck",
        success: function (data) {
            if(data.message){
                $('#newMessage').text(data.message);
                $('#tabNewMessage').text(data.message);
            }
        }
    });
});