function register_chef_value(){
    var form = $('#frm')[0];
    var formData = new FormData(form);
    formData.append("fileObj", $("#image1")[0].files[0]);

    console.log(document.frm.img_store[0].value);
    console.log(formData);
    return false;
    var sendData={};
    /*$.ajax({
        method: "POST",
        type: "POST",
        url: "/member/Logout",
        data: sendData,
        enctype: "multipart/form-data",
        success: function (data) {
            if (data === "clear") {
                location.reload();
            }
            else {
                alert("logout fail");
                /*$("#reconfirmtext").html("미 인증된 메일입니다. 인증 확인 후 로그인 해 주세요.");
                $("#reconfirmbutton").show();
                email=item.email;
                $('#mail_confirm').modal('toggle');
                $('#pop-up-login').modal('toggle');
            }
        }
    });*/
}