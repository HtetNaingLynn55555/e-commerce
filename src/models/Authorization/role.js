let mongoose = require("mongoose")
let {Schema} = mongoose;


let roleSchema = new Schema({
    name : {type : String, required: true, unique: true},
    permission_id : [{type :Schema.Types.ObjectId, ref:"Permission"}]
})

let Role = mongoose.model('Role', roleSchema);

module.exports = Role;