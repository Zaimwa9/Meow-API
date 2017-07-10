var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    frequency: String
});

var UsersMeow=mongoose.model('UsersMeow', UserSchema);

module.exports=UsersMeow;
