let mongoose = require('mongoose')
let {Schema} = mongoose;

let userSchema = new Schema({
    name : {type : String, required : true },
    email : {type :String, required: true, unique: true},
    phone : {type : String, required : true, unique: true},
    password : {type : String, required : true},
    created_at : {type : Date, default : Date.now}
})

let User = mongoose.model('User', userSchema);

module.exports = User;