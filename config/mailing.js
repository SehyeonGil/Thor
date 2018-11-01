module.exports = function (id,token,name) {
    var nodemailer = require('nodemailer');
    var sender = 'Ezcoook < gil9084@gmail.com >';
    var receiver = id;
    var mailTitle = '[Ezcoook]계정 인증 메일';
    var html = '<a href="http://www.ezcoook.com/member/Mail_Confirm_Complete/'+ token +'" target="_blank">http://www.ezcoook.com/member/Mail_Confirm_Complete/'+token+'</a><br>'+
        '<br>'+name+' 님, 안녕하세요!<br>' +
        '<br>Ezcoook 계정 본인 확인 메일입니다. 위의 링크를 클릭하고, 본인 인증을 완료하여 주십시오.' +
        '<br>중요: 인증링크는 10분후에 만료됩니다. 10분 내로 클릭하여 주시기 바랍니다.' +
        '<br>맛있는 요리를 찾아서!' +
        '<br>Ezcoook';
    var mailOptions = {
        from: sender,
        to: receiver,
        subject: mailTitle,
        html: html
    };
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: "465",
        auth: {
            user: "gil9084@gmail.com",
            pass: "pp9084pp!@"
        },
        tls: {
            rejectUnauthorize: false
        },
        maxConnections: 5,
        maxMessages: 10
    });
    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            console.log('failed... => ' + err);
        } else {
            console.log('succeed... => ' + res);
        }
    });
};