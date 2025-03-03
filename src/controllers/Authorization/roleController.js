let DB = require('../../models/Authorization/role');
let {success} = require('../../utils/helper')

let all = async(request, response, next)=>{
    let roles = await DB.find();
    if(roles)
    {
        success(response, 200, "role fetching success", roles);
    }
    else
    {
        next(new Error('roles fetching fail'))
    }
}

let create = async(request, response, next)=>{

}

let details = async(request, response, next)=>{

}

let update = async(request, response, next)=>{

}

let drop = async(request, response, next)=>{

}

module.exports = {
    all,
    create,
    details,
    update,
    drop,
}