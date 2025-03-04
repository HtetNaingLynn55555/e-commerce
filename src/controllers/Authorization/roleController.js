let DB = require('../../models/Authorization/role');
let PermissionDB = require('../../models/Authorization/permission') 
let {success} = require('../../utils/helper');

let all = async(request, response, next)=>{
    let roles = await DB.find().populate('permission_id').select("-__v");
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
    try{
        let checkRoleExist = await DB.findOne({name : request.body.name});
        if(checkRoleExist)
        {
            throw new Error('role is already exist')
        } 
        let role = await DB.create(request.body);
        if(role)
        {
            success(response, 201, 'role create success', role)
        }
        else
        {
            throw new Error('role create fail!');
        }
    }
    catch(error)
    {
        next(new Error(error.message))
    }
}

let details = async(request, response, next)=>{
    let checkRoleExist = await DB.findById(request.params.id).populate('permission_id').select('-__v');
    if(checkRoleExist)
    {
        success(response, 200, "role fetching success", checkRoleExist);

    }
    else
    {
        next(new Error('canont find role with given id'));
    }
}

let update = async(request, response, next)=>{
    try{
        let checkRoleExist = await DB.findById(request.params.id);
        if(checkRoleExist)
        {

            let existingRole = await DB.findOne({name : request.body.name});
            if(!existingRole)
            {
                let updateRole = await DB.findByIdAndUpdate(checkRoleExist._id, request.body);
                if(updateRole)
                {
                    let result = await DB.findById(updateRole._id);
                    success(response, 201, 'role update success', result);
                }
                else
                {
                    throw new Error('role update fail')
                }
            }
            else
            {
                throw new Error('role name already exist')
            }
            
        }
        else
        {
            throw new Error('Role does not exist with given id')
        }

    }catch(error)
    {
        next(new Error(error.message))
    }
}

let drop = async(request, response, next)=>{
    let checkRole = await DB.findById(request.params.id);
    if(checkRole)
    {
        let result = await DB.findByIdAndDelete(checkRole._id);
        success(response, 201, 'role delete success', result)
    }
    else
    {
        next(new Error('cannot find role with that id'))
    }
}

let roleAddPermission = async(request, response, next)=>{
    let role = await DB.findById(request.body.role_id);
    let permission = await PermissionDB.findById(request.body.permission_id);
    if(role && permission)
    {
        let addRoleToPermission = await DB.findByIdAndUpdate(role._id,{$push : {permission_id : permission._id}})
        let result = await DB.findById(addRoleToPermission._id).populate('permission_id', "-__v").select('-__v');
        if(result)
        {
            success(response, 201, "add permission to role success", result)
        }
        else
        {
            next(new Error('cannot add permission to role'));
        }
    }
    else
    {
        next(new Error('cannot find role or permission with given id'))
    }
}

let roleRemovePermission = async(request, response, next)=>{
    let checkRole = await DB.findById(request.body.role_id);
    let checkPermission = await PermissionDB.findById(request.body.permission_id);
    if(checkRole && checkPermission)
    {
        let removePermission = await DB.findByIdAndUpdate(checkRole._id, {$pull :{permission_id : checkPermission._id}});
        if(removePermission)
        {
            let result = await DB.findById(removePermission._id).populate('permission_id').select("-__v")
            success(response, 201, 'permission id remove', result );
        }
        else
        {
            next(new Error('cannot remove permission'))
        }
    }
    else
    {
        next(new Error('role or permission can not find with given id'))
    }
 
}

module.exports = {
    all,
    create,
    details,
    update,
    drop,
    roleAddPermission,
    roleRemovePermission,
}