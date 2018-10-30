function loginKakao(){

    $.ajax({
        method: "GET",
        type: "GET",
        url: "/member/LoginKakao",
        success: function (data) {
            if (data === "clear") {
                location.replace('/');
            }
            else
            {
                alert(data);

            }

        }
    });
}
function loginNaver(){

    $.ajax({
        method: "GET",
        type: "GET",
        url: "/member/LoginNaver",
        success: function (data) {
            if (data === "clear") {
                location.replace('/');
            }
            else
            {
                alert(data);
            }

        }
    });
}
function loginGoogle(){

    $.ajax({
        method: "GET",
        type: "GET",
        url: "/member/LoginGoogle",
        success: function (data) {
            if (data === "clear") {
                location.replace('/');
            }
            else
            {
                alert(data);
            }

        }
    });
}