let fs = require('fs');
let DB = require('../models/user');

let migrator = ()=>{

    console.log();
    let jsonUserData = fs.readFileSync(__dirname+"/users.json");
    let userData = JSON.parse(jsonUserData);
    
    userData.forEach(async(user)=>{
        console.log(user);
    })
}

module.exports = {
    migrator
}