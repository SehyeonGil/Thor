/**
 * Created by Sehyeon on 2018-06-02.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var Member_SellerSchema = new Schema({
    imageIden:{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    },
    age:{type:String},
    gender:{type:String},
    cellphone:String,
    imageFace:{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    },
    text:{type:String},
    shopName:{type:String},
    address: {type:String},
    shopText:{type:String},
    optionDelivery:{type:Boolean},
    optionPacking:{type:Boolean},
    optionVisit:{type:Boolean},
    optionMon:{type:Boolean},
    optionTues:{type:Boolean},
    optionWen:{type:Boolean},
    optionThur:{type:Boolean},
    optionFri:{type:Boolean},
    optionSat:{type:Boolean},
    optionSun:{type:Boolean},
    optionTime:{type:String},
    imageStore:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }]
});

module.exports = mongoose.model('member_seller', Member_SellerSchema);