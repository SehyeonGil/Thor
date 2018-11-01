/**
 * Created by Sehyeon on 2018-08-06.
 */
var passport = require('passport');
var crypto = require('crypto-browserify');
var randomstring = require("randomstring");
var moment = require('moment');
var bodyParser = require('body-parser');

var Member = require('../../models/member');
var MemberSeller = require('../../models/member_seller');

var cert = require('../../models/certificate');
var gm = require('gm');

require('../../config/passport')(passport);

exports.login_check_yes=function(req,res,next) {         //구매자 등록페이지 들어갈 때 검사
    if(!req.session.passport)
    {
        res.redirect('/member/Login');
    }
    else if(req.session.passport.user.is_certificate)
    {
        res.redirect('/member');
    }
    else
    {
        return next();
    }
};
exports.login_check_no=function(req,res,next) {         //구매자 등록페이지 들어갈 때 검사
    if(!req.session.passport)
    {
        res.redirect('/member/Login');
    }
    else if(!req.session.passport.user.is_certificate)
    {
        res.redirect('/member/register_member');
    }
    else
    {
        return next();
    }
};
exports.normalSignup= function(req, res, next) {
    passport.authenticate('signup', function(err, user, info) {
        if (err) { console.log(err); return next(err); }
        if (!user) {res.send(info.error); }
        else{
            res.send("clear");
        }
    })(req, res, next);
};

exports.mailConfirmComplete= function (req,res,next) {
    var token = req.params.id;
    cert.findOne({token: token}, function (err, member) {
        if(err){ return next(err);}
        if(!member)
        {
            res.redirect('/member/Login');
        }
        else
        {
            if(member.timer<moment().format())
            {
                /*cert.remove({email:member.email},function(err,output){
                    if(err){ return next(err);}
                });*/
                res.render('email_complete_GSH',{safe:false,passport:req.session.passport,email:member.email});
            }
            else{
                cert.remove({email:member.email},function(err,output){
                    if(err){ return next(err);}
                });
                Member.findOne({email:member.email},function(err,user){
                    user.mail_certificate=true;
                    user.save(function (err) {
                        if (err)
                            throw err;
                        res.render('email_complete_GSH',{safe:true,passport:req.session.passport});
                    });
                })
            }
        }
    });
};

exports.loginAttemp= function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.send(info.error); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            // req.session.email=user.email;
            // req.session.seller=user.sellercheck;
            return res.send("clear");
        });
    })(req, res, next);
};

exports.logoutAttemp= function(req, res, next) {
    if(req.session.passport) {
        req.logOut();
        req.session.destroy();
    }
    res.send("clear");
};

exports.reconfirm=function (req,res,next) {
    var email=req.body.email;
    Member.findOne({email:email},function (err,member) {
        cert.remove({email:email},function(err,result){
            var usercheck=new cert();
            usercheck.email=email;
            var key=randomstring.generate(10);
            var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
            cipher.update(email, 'utf8', 'hex');             // 인코딩 방식에 따라 암호화
            usercheck.token = cipher.final('hex');
            usercheck.timer=moment().add(10,'m').format();
            usercheck.save(function (err) {
                if (err)
                    throw err;
                mailer(email,usercheck.token,member.first_name);
                render('reConfirm',{safe:true,passport:req.session.passport});
                //res.send('clear');
            });
        })
    });
};

exports.LoginKakao=passport.authenticate('LoginKakao');
exports.OauthKakao=function(req, res, next) {
    passport.authenticate('LoginKakao', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.render('login',{error:info.error}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            // req.session.email=user.email;
            // req.session.seller=user.sellercheck;
            // res.send("clear");
            res.redirect("/");
        });
    })(req, res, next);
};

exports.LoginNaver=passport.authenticate('LoginNaver');
exports.OauthNaver=function(req, res, next) {
    passport.authenticate('LoginNaver', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.render('login',{error:info.error}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            // req.session.email=user.email;
            // req.session.seller=user.sellercheck;
            // res.send("clear");
            res.redirect("/");
        });
    })(req, res, next);
};

exports.LoginGoogle=passport.authenticate('LoginGoogle',{ scope: ['profile', 'email'] });
exports.OauthGoogle=function(req, res, next) {
    passport.authenticate('LoginGoogle', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {res.render('login',{error:info.error}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            // req.session.email=user.email;
            // req.session.seller=user.sellercheck;
            // res.send("clear");
            res.redirect("/");
        });
    })(req, res, next);
};
exports.MemberMain= function(req, res, next) {            //판매자 메인 get
    Member.findOne({email:req.session.passport.user.email}, function(err,member) {
        res.render("member_profile",{member:member,passport:req.session.passport});
    });
};

exports.registerMember= function(req, res, next) {            //판매자 메인 get
    res.render("register_member",{passport:req.session.passport});
};

exports.registerMemberAttemp= function(req, res, next) {            //판매자 메인 get
    var age = req.body.age;
    var gender = req.body.gender;
    var cellphone = req.body.mobile1+req.body.mobile2+req.body.mobile3;
    var text= req.body.text;
    var address=req.body.address;
    var location={type:'Point',coordinates:[req.body.x,req.body.y]};
    var upFile = req.files;
    var imageIden = "./img/memberImg/imageIdenResize/" + upFile['imageIden'][0].filename;
    var imageIden_name = upFile['imageIden'][0].filename;
    var imageIden_size = upFile['imageIden'][0].size;
    gm("./img/memberImg/imageIden/" + upFile['imageIden'][0].filename)
        .resize(400, 200)
        .write(imageIden, function (err) {
            if (err) console.error(err);
            else console.log('done')
        });

    var imageFace = "./img/memberImg/imageFaceResize/" + upFile['imageFace'][0].filename;
    var imageFace_name = upFile['imageFace'][0].filename;
    var imageFace_size = upFile['imageFace'][0].size;
    gm("./img/memberImg/imageFace/" + upFile['imageFace'][0].filename)
        .resize(300, 300)
        .write(imageFace, function (err) {
            if (err) console.error(err);
            else console.log('done')
        });

    if(!req.session.passport)
    {
        res.redirect('/');
    }
    else{
        Member.findOne({email:req.session.passport.user.email},function (err,member) {
            member.is_certificate=true;
            member.age=age;
            member.gender=gender;
            member.cellphone=cellphone;
            member.text=text;
            member.address=address;
            member.location=location;
            member.imageIden.image_name=imageIden_name;
            member.imageIden.image_size=imageIden_size;
            member.imageIden.image_url=imageIden;
            member.imageFace.image_name=imageFace_name;
            member.imageFace.image_size=imageFace_size;
            member.imageFace.image_url=imageFace;
            member.save(function (err) {
                if (err)
                    throw err;
                res.redirect('/member');
            });
        });
    }
};