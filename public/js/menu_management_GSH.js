function onoffChange(item,item2){
    var sendData={id:item, checked:item2};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/menu_management",
        data: sendData,
        success: function (data) {
            if (data === "clear") {
            }
            else {
                alert(data);
                return false;
            }
        }
    });
}