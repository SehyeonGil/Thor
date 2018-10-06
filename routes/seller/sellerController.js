/**
 * Created by Sehyeon on 2018-06-03.
 */
var passport = require('passport');
var crypto = require('crypto-browserify');
var randomstring = require("randomstring");
var moment = require('moment');
var bodyParser = require('body-parser');

var Member = require('../../models/member');
var cert = require('../../models/certificate');

exports.sellerRegister= function(req, res, next) {
    res.render("register_chef_GSH",{passport:req.session.passport});
};

exports.sellerRegisterAttemp= function(req, res, next) {

    res.send("clear");
};