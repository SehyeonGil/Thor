var express = require('express');
var app=express();
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
var Member = require('../models/member');
var cert = require('../models/certificate');
var mailer=require('./mailing');
var moment = require('moment');
var bcrypt = require('crypto-browserify');
var randomstring = require("randomstring");

module.exports = function(passport,nev) {
    passport.serializeUser(function (user, done) {
        done(null, {email: user.email, seller: user.sellercheck, mid: user._id});
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
};