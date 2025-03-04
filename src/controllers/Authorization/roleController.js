let DB = require('../../models/Authorization/role');
let {success} = require('../../utils/helper')

let all = async(request, response, next)=>{
    let roles = await DB.find().select("-__v");
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

}

module.exports = {
    all,
    create,
    details,
    update,
    drop,
}