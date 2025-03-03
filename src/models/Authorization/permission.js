
let mongoose = require('mongoose');
let {Schema} = mongoose;

let permissionSchema = new Schema({
    name : {type : String, required : true, unique: true},
    created_at : {type: Date, defaults : Date.now},
})

let Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;