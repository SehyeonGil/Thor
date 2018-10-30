/**
 * Created by Sehyeon on 2018-06-03.
 */
var express = require('express');
var router = express.Router();
var controller=require('./memberController');

/* GET users listing. */
router.get('/Mail_Confirm_Complete/:id',controller.mailConfirmComplete);

/*router.get('/Join',controller.join);
router.get('/Join_Confirm',controller.joinConfirm);
router.get('/Login',controller.login);
router.get('/Mail_Confirm',controller.mailConfirm);
router.get('/Find_Password',controller.findPassword);
router.get('/Identify_Certificate',controller.idnetifyCertificate);
router.get('/Manage',controller.manage);
router.get('/Address_Delivery',controller.addressDelivery);
router.get('/Mypage',controller.myPage);
router.get('/Manage_Order',controller.manageOrder);
router.get('/Manage_Review',controller.manageReview);
router.get('/Favorite',controller.favorite);
router.get('/Payment_List',controller.paymentList);
router.get('/Message',controller.message);*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET join page. */
router.get('/Join', function(req, res, next) {
    res.render('join');
});

/* GET login page. */
router.get('/Login', function(req, res, next) {
    res.render('login');
});
router.get('/Login', function(req, res, next) {
    res.render('login');
});
/*GET Oauth Login */
router.get('/LoginKakao', passport.authenticate('LoginKakao'));
router.get('/OauthKakao', passport.authenticate('login-kakao', {
    successRedirect: '/',
    failureRedirect: '/'
}));
/* GET find_password page. */
router.get('/Find_Password', function(req, res, next) {
    res.render('find_pw_KSW');
});

/* GET email_complete page. */
router.get('/email_complete', function(req, res, next) {
    res.render('email_complete');
});

/* GET menu_list page */
router.get('/menu_list', function(req, res, next) {
    res.render('menuList');
});

/* GET menu_list page */
router.get('/menu_info', function(req, res, next) {
    res.render('menu_info_KSW');
});
router.get('/manage_review',function (req,res,next) {
    res.render('manage_review_HNH');
});
router.get('/manage_order',function (req,res,next) {
    res.render('manage_order_HNH');
});
router.post('/Join',controller.normalSignup);
router.post('/Login', controller.loginAttemp);
router.post('/Logout', controller.logoutAttemp);
router.post('/reConfirm',controller.reconfirm);

module.exports = router;