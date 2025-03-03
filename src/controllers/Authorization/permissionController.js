let DB = require('../models/Authorization/permission');

let all = async(requset, response)=>{
    response.json({
        message : 'get all permission'
    })
}


let create = async(request, response)=>{
    response.json({
        message : 'create  permission'
    })
}

let get = async(request, response)=>{
    response.json({
        message : 'get one permission'
    })
}

let update = async(request, response)=>{
    response.json({
        message : 'update permission'
    })
}

let drop = async(request, response) =>{
    response.json({
        message : 'drop permission'
    })
}
module.exports = {
    all,
    create,
    get,
    update,
    drop,

}