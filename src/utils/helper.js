let bcrypt = require('bcrypt')

let success = async(response, status=200, message = "success", data=[])=>{
    response.status(status).json({
        message,
        data
    })
}

let encode = (password, salt)=>{
    let hash = bcrypt.hashSync(password, bcrypt.genSalt(salt));
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