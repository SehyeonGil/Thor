/**
 * Created by Sehyeon on 2018-06-03.
 */
var express = require('express');
var router = express.Router();
var controller=require('./sellerController');

/* GET users listing. */
/*router.get('/Register_Seller',controller.sellerRegister);
router.get('/Register_Menu',controller.menuRegister);
router.get('/Manage_Order',controller.orderManage);
router.get('/Seller',controller.seller);
router.get('/Manage_Order/:id',controller.orderDetailManage);
router.get('/Manage_Statistics',controller.statisticsManage);
router.get('/Manage_Menu',controller.menuManage);
router.get('/Manage_Menu/:id',controller.menuDetailManage);
router.get('/Manage_Store',controller.storeManage);
router.get('/Message',controller.message);*/
router.get('/', function(req, res, next) {
    res.render('seller_profile_KSW');
});
router.get('/register_seller', function(req, res, next) {
    res.render('register_chef_HNH');
});
// router.get('/aaa', function(req, res, next) {
//     res.render('seller_profile_KSW');
// });

module.exports = router;