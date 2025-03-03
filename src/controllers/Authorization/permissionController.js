let DB = require("../../models/Authorization/permission");
let {success} = require('../../utils/helper');
let all = async(requset, response)=>{
    let permission = await DB.find();
    if(permission)
    {
        success(response,200, "permessions List", permission)
    }
    else
    {
        next(new Error('Server Error'))
    }
}


let create = async(request, response)=>{
    try{
        let {name} = request.body;
        response.json({
            message : name
        })
    }
    catch(error)
    {
        next(new Error(error.message))

    }
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