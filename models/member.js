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
    cellphone:{type:String},
    seller_check:{type:Boolean,default:false},
    naver:{
        id:String,
        name:String,
        validation:{type:Boolean,default:false}
    },
    google: {
        id: String
    },
    mailing:{type:Boolean,default:false},
    message:{type:Boolean,default:false},
    submit_date:{type: Date, default: moment().format()},
    last_login:Date,
    last_login_ip:String,
    thumbnail_image:[{
        image_name:{type:String},
        image_url:{type:String},
        image_size:{type:String}
    }]
});

const saltRounds = 10;

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