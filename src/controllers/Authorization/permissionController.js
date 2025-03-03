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


let create = async(request, response,next)=>{
    try{
        
        let existingName = await DB.findOne({name : request.body.name});
        if(existingName)
        {
            throw new Error('permission name already exist');
            
        }
        let permission = await  DB.create(request.body);
        if(permission)
        {
            success(response, 201, "permission created", permission)
        }
        else
        {
            throw new Error('permission create fail')
        }

    }
    catch(error)
    {
        next(new Error(error.message))

    }
}

let details = async(request, response, next)=>{
    let permission = await DB.findById(request.params.id).select("-__v");
    if(permission)
    {
        success(response, 200, 'permission fetching success', permission)
    }
    else
    {
        next(new Error('permission fetching fail with given id'))
    }
}

let update = async(request, response, next)=>{
    try{
        let permission = await DB.findById(request.params.id);
        if(!permission)
        {
            throw new Error('cannot find the permission with given id')
        }
        let permissionExist = await DB.findOne({name : request.body.name})
        if(permissionExist)
        {
            throw new Error('permission name already exist')
        }
        let updatePermission = await DB.findByIdAndUpdate(permission._id, request.body);
        if(updatePermission)
        {
            let data = await DB.findById(updatePermission._id).select('-__v');
            success(response, 201, 'permission update success',data )
        }
        else{
            throw new Error('update permission fail')
        }
    }
    catch(error)
    {
        next(new Error(error.message))
    }
}   

let drop = async(request, response, next) =>{
    try
    {
        let permission = await DB.findById(request.params.id);
        if(permission)
        {
            let dropPermission = await DB.findByIdAndDelete(permission._id);
            if(dropPermission)
            {
                success(response, 201, "permission delete success", dropPermission)
            }
            else
            {
                throw new Error('cannot delete permission')
            }
        }
        else
        {
            throw new Error('cannot find permission with given id')
        }
    }
    catch(error)
    {
        next(new Error(error.message))
    }
}
module.exports = {
    all,
    create,
    details,
    update,
    drop,

}