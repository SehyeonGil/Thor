/**
 * Created by Sehyeon on 2018-06-03.
 */
var passport = require('passport');
var crypto = require('crypto-browserify');
var randomstring = require("randomstring");
var moment = require('moment');
var bodyParser = require('body-parser');

var Member = require('../../models/member');
var MemberSeller = require('../../models/member_seller');
var cert = require('../../models/certificate');

exports.sellerRegister= function(req, res, next) {
    res.render("register_chef",{passport:req.session.passport});
};

exports.sellerRegisterAttemp= function(req, res, next) {
    var age = req.body.age;
    var gender = req.body.gender;
    var cellphone = req.body.mobile1+req.body.mobile2+req.body.mobile3;
    var text= req.body.text;
    var shopName=req.body.shopName;
    var address=req.body.address;
    var shopText=req.body.shopText;
    var optionDelivery=req.body.optionDelivery;
    var optionPacking=req.body.optionPacking;
    var optionMon=req.body.optionMon;
    var optionTues=req.body.optionTues;
    var optionWen=req.body.optionWen;
    var optionThur=req.body.optionThur;
    var optionFri=req.body.optionFri;
    var optionSat=req.body.optionSat;
    var optionSun=req.body.optionSun;
    var optionTime=req.body.optionTime1+":"+req.body.optionTime2;
    var upFile = req.files;
    var imageIden = "./img/sellerImg/imageIden" + upFile['imageIden'].filename;
    var imageIden_name = upFile['imageIden'].filename;
    var imageIden_size = upFile['imageIden'].size;
    var imageFace = "./img/sellerImg/imageFace" + upFile['imageFace'].filename;
    var imageFace_name = upFile['imageFace'].filename;
    var imageFace_size = upFile['imageFace'].size;
    var imageStore = [];
    var imageStore_name = [];
    var imageStore_size = [];
    for(var i=0;i<upFile['imageStore'].length; i++){
        imageStore.push("./img/sellerImg/imageStore" + upFile['imageStore'][i].filename);
        imageStore_name.push(upFile['imageStore'][i].filename);
        imageStore_size.push(upFile['imageStore'][i].size);
    }
    //res.send("clear");
};