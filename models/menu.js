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
    expire: {type:String},
    hashtag:[{type:String}]
});

module.exports = mongoose.model('menu', MenuSchema);