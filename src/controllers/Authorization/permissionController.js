let DB = require("../../models/Authorization/permission");

let all = async(requset, response)=>{
    let permission = await DB.find();
    if(permission)
    {
        
    }
    else
    {
        next(new Error('Server Error'))
    }
}


let create = async(request, response)=>{
    response.json({
        message : 'create  permission'
    })
}

let details = async(request, response)=>{
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
    details,
    update,
    drop,

}