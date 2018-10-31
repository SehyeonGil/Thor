/**
 * Created by Sehyeon on 2018-10-29.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MenuSchema = new Schema({
    email:{type:String},
    imageMenu:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }],
    title:{type:String},
    text:{type:String},
    price:{type:String},
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
    address:{type:String},
    location : {
        type : {
            type: String,
            default: 'Point'
        },
        coordinates: [{type:Number}]
    },
    hashtag:[{type:String}],
    onoff:{type:Boolean, default:false}
});

module.exports = mongoose.model('menu', MenuSchema);