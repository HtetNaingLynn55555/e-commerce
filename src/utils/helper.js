let bcrypt = require('bcryptjs')

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

module.exports = {
    success,
    encode,
    compareHash
}