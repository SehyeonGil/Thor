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

router.post('/SignUp',controller.normalSignup);
router.post('/Login', controller.loginAttemp);
router.post('/reconfirm',controller.reconfirm);

module.exports = router;