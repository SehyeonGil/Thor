var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var certificate = new Schema({
    email:{type:String,required: true},
    token:{type:String,required: true},
    timer:{type:Date,required : true}
});

certificate.methods.generateHash = function(token) {
    return bcrypt.hashSync(token, bcrypt.genSaltSync(10));
};
//token 비교
certificate.methods.validToken = function(token) {
    return (this.token===token);
};
module.exports = mongoose.model('cert', certificate);
