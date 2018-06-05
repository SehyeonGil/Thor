/**
 * Created by Sehyeon on 2018-06-02.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var Member_SellerSchema = new Schema({
    submit_date:{type: Date, default: moment().format()},
    address:{
        post:String,
        add1:String,
        add2:String,
        x:Number,
        y:Number
    },
    shopName:{type:String},
    explain:{type:String},
    openTime:{type:String},
    closeTime:{type:String},
    capacity:{type:Number},
    option_visit:{type:Boolean, default:false},
    option_takeout:{type:Boolean, default:false},
    option_delivery:{type:Boolean, default:false},
    shop_image:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }],
    min_order_date:{type:Number},
    min_order_value:{type:Number}
});

module.exports = mongoose.model('member_seller', Member_SellerSchema);