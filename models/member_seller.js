/**
 * Created by Sehyeon on 2018-06-02.
 */
var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var Member_SellerSchema = new Schema({
    email:{type:String},
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
    location : {
        type : {
            type: String,
            default: 'Point'
        },
        coordinates: [{type:Number}]
    },
    shopText:{type:String},
    optionDelivery:{type:String},
    optionPacking:{type:String},
    optionVisit:{type:String},
    optionMon:{type:String},
    optionTues:{type:String},
    optionWen:{type:String},
    optionThur:{type:String},
    optionFri:{type:String},
    optionSat:{type:String},
    optionSun:{type:String},
    optionTime1:{type:String},
    optionTime2:{type:String},
    imageStore:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }]
});

module.exports = mongoose.model('member_seller', Member_SellerSchema);