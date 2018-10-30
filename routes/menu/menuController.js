var passport = require('passport');
var crypto = require('crypto-browserify');
var randomstring = require("randomstring");
var moment = require('moment');
var bodyParser = require('body-parser');

var Member = require('../../models/member');
var MemberSeller = require('../../models/member_seller');
var Menu = require('../../models/menu');
var cert = require('../../models/certificate');
var Promise=require('promise');

exports.menuMain= function(req, res, next) {
    Menu.find({},function (err,menu) {
        res.render('menuList',{passport:req.session.passport,menu:menu,seller:seller});
    });
};