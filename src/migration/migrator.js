let fs = require('fs');
let DB = require('../models/user');
let {compareHash, encode} = require('../utils/helper')

let migrator = ()=>{

    console.log();
    let jsonUserData = fs.readFileSync(__dirname+"/users.json");
    let userData = JSON.parse(jsonUserData);
    
    userData.forEach(async(user)=>{
        
        try{
            let {email, phone} = user;
            let existingUser = await DB.findOne({
                $or :[{email},{phone}]
            })
            if(existingUser)
            {
                throw new Error('user already exist')
            }
            else
            {
                user.password = encode(user.password, 5);
                await DB.create(user)
            }
        }
        catch(error)
        {
            console.log(error.message);
        }
        
    })
}

let backupUserData = async()=>{
    let userData = await DB.find();
    
    let jsonData = JSON.stringify(userData);

    fs.writeFileSync(__dirname+"/backupData/users.json", jsonData)
}
module.exports = {
    migrator,
    backupUserData
}