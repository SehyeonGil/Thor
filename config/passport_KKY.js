var express = require('express');
var app=express();
var LocalStrategy = require('passport-local').Strategy;
var KakaoStrategy = require('passport-kakao').Strategy;
var NaverStrategy = require('passport-naver').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var cert = require('../models/certificate');
var mailer=require('./mailing');
var moment = require('moment');
var bcrypt = require('crypto-browserify');
var randomstring = require("randomstring");
var config=require('./passport_config.json');

module.exports = function(passport,nev) {
    passport.serializeUser(function (user, done) {
        done(null, {email: user.email, seller_check: user.seller_check, mid: user._id});
    });
    passport.deserializeUser(function (user, done) {

        done(null, user);
    });

    passport.use('signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            Member.findOne({email: email}, function (err, member) {
                if (err) return done(err);
                if (member) {
                    return done(null, false, {error: '존재하는 이메일입니다.'});
                } else {
                    var user = new Member();
                    user.first_name = req.body.firstname;
                    user.last_name = req.body.lastname;
                    user.email = email;
                    user.provider = 'local';
                    user.pw = user.generateHash(password);
                    var usercheck = new cert();
                    usercheck.email = email;
                    var key = randomstring.generate(10);
                    var cipher = bcrypt.createCipher('aes192', key);    // Cipher 객체 생성
                    cipher.update(email, 'utf8', 'hex');             // 인코딩 방식에 따라 암호화
                    usercheck.token = cipher.final('hex');
                    //usercheck.timer = moment().add(10,'m').format();
                    usercheck.timer = moment().add(9,'h').format();
                    user.save(function (err) {
                        if (err)
                            throw err;
                    });
                    usercheck.save(function (err) {
                        if (err)
                            throw err;
                        mailer(email, usercheck.token, req.body.firstname);
                        return done(null, false, {error: 'clear'});
                        // return done(null, user);
                    });
                }
            });
        }
    ));

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true, // 세션에 저장 여부
            passReqToCallback: true
        },
        function (req, email, password, done) {
            Member.findOne({email: email}, function (err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, {error: '이메일 에러'});
                if (!(user.provider === 'local'))
                    return done(null, false, {error: '타사연동으로 가입된 회원입니다. 아래 버튼을 이용해서 로그인해주세요'});
                if (!(user.validPassword(password)))
                    return done(null, false, {error: '패스워드 에러'});
                if (!user.mail_certificate)
                    return done(null, false, {error: user.email});
                return done(null, user);
            });
        })
    );

    passport.use('LoginKakao',new KakaoStrategy({
            clientID : config.kakao.clientID,
            callbackURL : config.kakao.callbackURL
        },
        function(accessToken, refreshToken, profile, done){
            var email = JSON.parse(profile._raw);
            console.log(email)
            console.log(typeof(email))
            Member.findOne({'email': email.kaccount_email}, function (err, member) {
                if (err)
                    return done(err);
                else if (!member){
                    var user = new Member();
                    // console.log(profile);
                    // console.log(profile._raw);
                    // console.log(typeof(profile._raw));
                    // console.log(profile._raw['account_email']);
                    user.last_name = profile.username;
                    user.email = email.kaccount_email;
                    user.kakao.id=profile.id;
                    user.provider = "kakao";


                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null,user);
                    });
                }
                else{
                    if (member.provider === "kakao")
                        return done(null, member);
                    if (member.provider === "local")
                        return done(null, false, {error: '저희 사이트를 통해 가입하신분입니다. 정보를 입력하여 로그인해주세요.'});
                    if (member.provider === "google")
                        return done(null, false, {error: '구글로그인서비스를 통하여 가입된 회원입니다. 옆의 구글로그인 버튼으로 로그인해주세요.'});
                    if (member.provider === "naver")
                        return done(null, false, {error: '네이버로그인서비스를 통하여 가입된 회원입니다. 옆의 네이버로그인 버튼으로 로그인해주세요.'});
                }
            });
        }
    ));

    passport.use('LoginNaver',new NaverStrategy({
            clientID: config.naver.clientID,
            clientSecret: config.naver.clientSecret,
            callbackURL: config.naver.callbackURL
        },
        function(accessToken, refreshToken, profile, done){
            console.log(profile);
            Member.findOne({'email': profile.emails[0].value}, function (err, member) {
                if (err)
                    return done(err);
                else if (!member){

                    var user = new Member();
                    user.last_name = profile.displayName;
                    user.email=profile.emails[0].value;
                    user.naver.id=profile.id
                    user.provider = "naver";


                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null,user);
                    });
                }
                else{
                    if (member.provider === "naver")
                        return done(null, member);
                    if (member.provider === "local")
                        return done(null, false, {error: '저희 사이트를 통해 가입하신분입니다. 정보를 입력하여 로그인해주세요.'});
                    if (member.provider === "google")
                        return done(null, false, {error: '구글로그인서비스를 통하여 가입된 회원입니다. 옆의 구글로그인 버튼으로 로그인해주세요.'});
                    if (member.provider === "kakao")
                        return done(null, false, {error: '카카오로그인서비스를 통하여 가입된 회원입니다. 옆의 카카오로그인 버튼으로 로그인해주세요.'});
                }
            });
            console.log(profile);
        }
    ));


    passport.use('LoginGoogle', new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
        console.log(profile);
            // asynchronous verification, for effect...
            Member.findOne({'email': profile.emails[0].value}, function (err, member) {
                if (err)
                    return done(err);
                else if (!member){

                    var user = new Member();
                    user.first_name = profile.name.familyName;
                    user.last_name = profile.name.givenName;
                    user.email=profile.emails[0].value;
                    user.google.id=profile.id;
                    user.provider = "google";


                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null,user);
                    });
                }
                else{
                    if (member.provider === "google")
                        return done(null, member);
                    if (member.provider === "local")
                        return done(null, false, {error: '저희 사이트를 통해 가입하신분입니다. 정보를 입력하여 로그인해주세요.'});
                    if (member.provider === "naver")
                        return done(null, false, {error: '네이버로그인서비스를 통하여 가입된 회원입니다. 옆의 네이버로그인 버튼으로 로그인해주세요.'});
                    if (member.provider === "kakao")
                        return done(null, false, {error: '카카오로그인서비스를 통하여 가입된 회원입니다. 옆의 카카오로그인 버튼으로 로그인해주세요.'});
                }
            });
            console.log(profile);


        }
    ));

};