document.getElementById('mobile2').onchange = function () {
    var mobile2Exp=/^[0-9]+$/;
    if(!document.myform.mobile2.value.match(mobile2Exp)){
        document.myform.mobile2Check.value="false";
    }
    else
    {
        document.myform.mobile2Check.value="true";
    }

};
document.getElementById('mobile3').onchange = function () {
    var mobile3Exp=/^[0-9]+$/;
    if(!document.myform.mobile3.value.match(mobile3Exp)){
        document.myform.mobile3Check.value="false";
    }
    else
    {
        document.myform.mobile3Check.value="true";
    }

};
document.getElementById('shopName').onchange = function () {
    var shopNameExp=/\s/g;
    if(!document.myform.shopName.value.match(shopNameExp)){
        document.myform.shopNameCheck.value="false";
    }
    else
    {
        document.myform.shopNameCheck.value="true";
    }

};
document.getElementById('address').onchange = function () {
    var addressExp=/\s/g;
    if(!document.myform.address.value.match(addressExp)){
        document.myform.addressCheck.value="false";
    }
    else
    {
        document.myform.addressCheck.value="true";
    }

};

document.getElementById('shopText').onchange = function () {
    var shopTextExp=/\s/g;
    if(!document.myform.shopText.value.match(shopTextExp)){
        document.myform.shopTextCheck.value="false";
    }
    else
    {
        document.myform.shopTextCheck.value="true";
    }

};
document.getElementById('oper_time').onchange = function () {
    var oper_timeExp=/\s/g;
    if(!document.myform.oper_time.value.match(oper_timeExp)){
        document.myform.oper_timeCheck.value="false";
    }
    else
    {
        document.myform.oper_timeCheck.value="true";
    }

};
function register_chef_value(){
    var form = $('#frm')[0];
    var formData = new FormData(form);


    formData.append("fileObj", $("#image1")[0].files[0]);

    console.log(document.frm.img_store[0].value);
    console.log(formData);
    return false;
    var sendData={};
    if(!document.myform.mobile2Check.value.match("true")||!document.myform.mobile3Check.value.match("true")
        ||!document.myform.shopNameCheck.value.match("true")||!document.myform.addressCheck.value.match("true")
        ||!document.myform.shopTextCheck.value.match("true")||!document.myform.oper_timeCheck.value.match("true")){alert("양식채워주세요");return false;}
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