const { required, date, defaults } = require('joi');
let mongoose = require('mongoose');
let {Schema} = mongoose;

let permissionSchema = new Schema({
    name : {type : String, required : true, unique: true},
    created_at : {type: date, defaults : Date.now},
})

let Permission = mongoose.model('permission', permissionSchema);

module.exports = Permission;