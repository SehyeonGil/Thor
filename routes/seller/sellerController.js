/**
 * Created by Sehyeon on 2018-06-03.
 */
var passport = require('passport');
var crypto = require('crypto-browserify');
var randomstring = require("randomstring");
var moment = require('moment');
var bodyParser = require('body-parser');
var fs = require('fs');
var gm = require('gm');

var Member = require('../../models/member');
var MemberSeller = require('../../models/member_seller');
var Menu = require('../../models/menu');
var cert = require('../../models/certificate');
var Promise=require('promise');

exports.seller_check_yes=function(req,res,next) {         //판매자 등록페이지 들어갈 때 검사
    if(!req.session.passport)
    {
        res.redirect('/member/Login');
    }
    else if(req.session.passport.user.seller_check)
    {
        res.redirect('/seller');
    }
    else
    {
        return next();
    }
};
exports.seller_check_no=function(req,res,next) {         //판매자 등록페이지 들어갈 때 검사
    if(!req.session.passport)
    {
        res.redirect('/member/Login');
    }
    else if(!req.session.passport.user.seller_check)
    {
        res.redirect('/seller/register_chef');
    }
    else
    {
        return next();
    }
};
exports.sellerMain= function(req, res, next) {            //판매자 메인 get
    MemberSeller.findOne({email:req.session.passport.user.email},function(err,seller){
        Member.findOne({email:req.session.passport.user.email}, function(err,member) {
            res.render("seller_profile",{member:member,passport:req.session.passport,seller:seller});
        });
    });
};

exports.sellerRegister= function(req, res, next) {            //판매자 등록 get
    res.render("register_chef",{passport:req.session.passport});
};

exports.menuRegister= function(req, res, next) {            //메뉴 등록 get
    MemberSeller.findOne({email:req.session.passport.user.email},function(err,seller){
        Member.findOne({email:req.session.passport.user.email}, function(err,member) {
            res.render("register_menu",{member:member,passport:req.session.passport,seller:seller});
        });
    });
};
exports.menuManagement= function(req, res, next) {            //메뉴 등록 get
    Menu.find({email:req.session.passport.user.email},function (err,menu) {
        MemberSeller.findOne({email:req.session.passport.user.email},function(err,seller){
            Member.findOne({email:req.session.passport.user.email}, function(err,member) {
                res.render("menu_management",{member:member,passport:req.session.passport,seller:seller,menu:menu});
            });
        });
    });
};
exports.menuManagementChangeOnOff= function(req, res, next) {            //메뉴 등록 get
    var id=req.body.id;
    Menu.findOne({_id:id},function (err,menu) {
        menu.onoff=req.body.checked;
        menu.save(function (err) {
            if(err)
            {
                res.send(err);
                throw err;
            }
            else
                res.send("clear");
        })
    })
};
exports.sellerRegisterAttemp= function(req, res, next) {      //판매자 등록 post
    var age = req.body.age;
    var gender = req.body.gender;
    var cellphone = req.body.mobile1+req.body.mobile2+req.body.mobile3;
    var text= req.body.text;
    var shopName=req.body.shopName;
    var address=req.body.address;
    var location={type:'Point',coordinates:[req.body.x,req.body.y]};
    var shopText=req.body.shopText;
    var optionDelivery=req.body.optionDelivery;
    var optionPacking=req.body.optionPacking;
    var optionVisit=req.body.optionVisit;
    var optionMon=req.body.optionMon;
    var optionTues=req.body.optionTues;
    var optionWen=req.body.optionWen;
    var optionThur=req.body.optionThur;
    var optionFri=req.body.optionFri;
    var optionSat=req.body.optionSat;
    var optionSun=req.body.optionSun;
    var optionTime1=req.body.optionTime1;
    var optionTime2=req.body.optionTime2;
    var upFile = req.files;
    var imageIden = "./img/sellerImg/imageIdenReszie/" + upFile['imageIden'][0].filename;
    var imageIden_name = upFile['imageIden'][0].filename;
    var imageIden_size = upFile['imageIden'][0].size;
    gm("public/img/sellerImg/imageIden/" + upFile['imageIden'][0].filename)
        .resize(400, 200,"!")
        .write("public/img/sellerImg/imageIdenResize/" + upFile['imageIden'][0].filename, function (err) {
            if (err) console.error(err);
            else console.log('done')
        });

    var imageFace = "./img/sellerImg/imageFaceResize/" + upFile['imageFace'][0].filename;
    var imageFace_name = upFile['imageFace'][0].filename;
    var imageFace_size = upFile['imageFace'][0].size;
    gm("public/img/sellerImg/imageFace/" + upFile['imageFace'][0].filename)
        .resize(300, 300,"!")
        .write("public/img/sellerImg/imageFaceResize/" + upFile['imageFace'][0].filename, function (err) {
            if (err) console.error(err);
            else console.log('done')
        });

    var imageStore = [];
    var imageStore_name = [];
    var imageStore_size = [];
    for(var i=0;i<upFile['imageStore'].length; i++){
        imageStore.push("./img/sellerImg/imageStoreResize/" + upFile['imageStore'][i].filename);
        imageStore_name.push(upFile['imageStore'][i].filename);
        imageStore_size.push(upFile['imageStore'][i].size);
        gm("public/img/sellerImg/imageStore/" + upFile['imageStore'][i].filename)
            .resize(400, 200,"!")
            .write("public/img/sellerImg/imageStoreResize/" + upFile['imageStore'][i].filename, function (err) {
                if (err) console.error(err);
                else console.log('done')
            });
    }
    if(!req.session.passport)
    {
        res.redirect('/');
    }
    else{
        Member.findOne({email:req.session.passport.user.email},function (err,member) {
            member.seller_check=true;
            member.save(function (err) {
                if (err)
                    throw err;
                var newMemberSeller=new MemberSeller();
                newMemberSeller.email=req.session.passport.user.email;
                newMemberSeller.age=age;
                newMemberSeller.gender=gender;
                newMemberSeller.cellphone=cellphone;
                newMemberSeller.text=text;
                newMemberSeller.shopName=shopName;
                newMemberSeller.address=address;
                newMemberSeller.shopText=shopText;
                newMemberSeller.optionDelivery=optionDelivery;
                newMemberSeller.optionPacking=optionPacking;
                newMemberSeller.optionVisit=optionVisit;
                newMemberSeller.optionMon=optionMon;
                newMemberSeller.optionTues=optionTues;
                newMemberSeller.optionWen=optionWen;
                newMemberSeller.optionThur=optionThur;
                newMemberSeller.optionFri=optionFri;
                newMemberSeller.optionSat=optionSat;
                newMemberSeller.optionSun=optionSun;
                newMemberSeller.optionTime1=optionTime1;
                newMemberSeller.optionTime2=optionTime2;
                newMemberSeller.imageIden.image_name=imageIden_name;
                newMemberSeller.imageIden.image_size=imageIden_size;
                newMemberSeller.imageIden.image_url=imageIden;
                newMemberSeller.imageFace.image_name=imageFace_name;
                newMemberSeller.imageFace.image_size=imageFace_size;
                newMemberSeller.imageFace.image_url=imageFace;
                newMemberSeller.location=location;
                for(i=0;i<imageStore.length;i++) {
                    newMemberSeller.imageStore.push({image_url:imageStore[i],image_size:imageStore_size[i], image_name:imageStore_name[i]});
                }
                newMemberSeller.save(function (err) {
                    if (err)
                        throw err;
                    res.redirect('/');
                });
            });
        });
    }
    //res.send("clear");
};

exports.menuRegisterAttemp= function(req, res, next) {      //메뉴 등록 post
    var title = req.body.title;
    var price = req.body.price;
    var text= req.body.text;
    var optionDelivery=req.body.optionDelivery;
    var optionPacking=req.body.optionPacking;
    var optionVisit=req.body.optionVisit;
    var optionMon=req.body.optionMon;
    var optionTues=req.body.optionTues;
    var optionWen=req.body.optionWen;
    var optionThur=req.body.optionThur;
    var optionFri=req.body.optionFri;
    var optionSat=req.body.optionSat;
    var optionSun=req.body.optionSun;
    var optionTime1=req.body.optionTime1;
    var optionTime2=req.body.optionTime2;
    var hashtag=req.body.hashtag;
    var hashtagCheck=hashtag.split(',');
    for(i=0;i<hashtagCheck.length;i++) {
        hashtagCheck[i].trim();
    }
    var upFile = req.files;
    var imageMenu = [];
    var imageMenu_name = [];
    var imageMenu_size = [];
    for(var i=0;i<upFile['imageMenu'].length; i++){
        imageMenu.push("./img/sellerImg/imageMenuResize/" + upFile['imageMenu'][i].filename);
        imageMenu_name.push(upFile['imageMenu'][i].filename);
        imageMenu_size.push(upFile['imageMenu'][i].size);
        gm("public/img/sellerImg/imageMenu/" + upFile['imageMenu'][i].filename)
            .resize(800, 400,"!")
            .write("public/img/sellerImg/imageMenuResize/" + upFile['imageMenu'][i].filename, function (err) {
                if (err) console.error(err);
                else console.log('done')
            });
    }
    if(!req.session.passport)
    {
        res.redirect('/');
    }
    else{
        var newMenu=new Menu();
        newMenu.email=req.session.passport.user.email;
        newMenu.title=title;
        newMenu.price=price;
        newMenu.text=text;
        newMenu.optionDelivery=optionDelivery;
        newMenu.optionPacking=optionPacking;
        newMenu.optionVisit=optionVisit;
        newMenu.optionMon=optionMon;
        newMenu.optionTues=optionTues;
        newMenu.optionWen=optionWen;
        newMenu.optionThur=optionThur;
        newMenu.optionFri=optionFri;
        newMenu.optionSat=optionSat;
        newMenu.optionSun=optionSun;
        newMenu.optionTime1=optionTime1;
        newMenu.optionTime2=optionTime2;
        for(i=0;i<imageMenu.length;i++) {
            newMenu.imageMenu.push({image_url:imageMenu[i],image_size:imageMenu_size[i], image_name:imageMenu_name[i]});
        }
        for(i=0;i<hashtagCheck.length;i++) {
            newMenu.hashtag.push(hashtagCheck[i]);
        }
        MemberSeller.findOne({email:req.session.passport.user.email},function (err,seller) {
            newMenu.address=seller.address;
            newMenu.location=seller.location;
            newMenu.save(function (err) {
                if (err)
                    throw err;
                res.redirect('/seller');
            });
        });

    }
    //res.send("clear");
};