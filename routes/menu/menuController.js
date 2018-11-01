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
        res.render('menuList',{passport:req.session.passport,menu:menu});
    });
};

exports.menuInfo= function(req, res, next) {
    Menu.findOne({_id:req.params.id},function (err,menu) {
        console.log(menu);
        MemberSeller.findOne({email:menu.email},function (err,seller) {
            Member.findOne({email:menu.email},function(err,sellerMember){
                res.render('menu_info',{passport:req.session.passport,menu:menu,seller:seller,sellerMember:sellerMember});
            });
        });
    });
};