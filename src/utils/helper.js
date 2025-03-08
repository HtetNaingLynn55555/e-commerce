let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let success = async(response, status=200, message = "success", data=[])=>{
    response.status(status).json({
        message,
        data
    })
}

let encode = (password, saltCount)=>{
    let salt = bcrypt.genSaltSync(saltCount);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

let compareHash = (password, hash)=>{
    return bcrypt.compareSync(password, hash);
}

let tokenGenerator = (payload)=>{
   return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn : "12h"})
}

let verifyToken = (payload)=>{
    return jwt.verify(payload, process.env.SECRET_KEY, (err, data)=>{
        if(err)
        {
            return false;
        }
        else
        {
            return data
        }
    });
}



  

module.exports = {
    success,
    encode,
    compareHash,
    tokenGenerator,
    verifyToken
}