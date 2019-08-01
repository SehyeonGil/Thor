/**
 * Created by Sehyeon on 2018-06-02.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var moment = require('moment');

var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    email:{type:String},
    pw:{type:String},
    first_name:{type:String},
    last_name:{type:String},
    mail_certificate:{type:Boolean,default:false},
    is_certificate:{type:Boolean,default:false},
    pic_certificate:{type:String},
    seller_check:{type:Boolean,default:false},
    naver : {
        id:String,
        name:String,
        validation:{type:Boolean,default:false}
    },
    google: {
        id: String
    },
    kakao : {
        id: String,
        name:String,
        validation:{type:Boolean,default:false}
    },
    provider:String,
    mailing:{type:Boolean,default:false},
    message:{type:Boolean,default:false},
    submit_date:{type: Date, default: moment().format()},
    last_login:Date,
    last_login_ip:String,
    imageIden:{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    },
    imageFace:{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    },
    age:{type:String},
    gender:{type:String},
    cellphone:String,
    text:{type:String},
    address: {type:String},
    location : {
        type : {
            type: String,
            default: 'Point'
        },
        coordinates: [{type:Number}]
    }
});

var saltRounds = 10;

//password를 암호화
MemberSchema.methods.generateHash =function(password){
    return bcrypt.hashSync(password, saltRounds);
};
//password의 유효성 검증
MemberSchema.methods.validPassword = function(password) {
    var user=this;
    return bcrypt.compareSync(password, user.pw);
};

module.exports = mongoose.model('member', MemberSchema);