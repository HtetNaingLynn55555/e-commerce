const { response } = require('express');
let DB = require('../models/user');
let {success, encode, tokenGenerator, compareHash} = require('../utils/helper');

let all = async(request, response, next)=>{
    response.end('all');
}

let create = async(request, response, next)=>{
    response.end('create')
}

let details = async(request, response, next)=>{
    response.end('details')
}

let update = async(request, response, next)=>{
    response.end('update')
}

let drop = async(request, response, next)=>{
    response.end('drop')
}

let login = async(request, response, next)=>{
    if(request.body.email)
    {
        let checkUser = await DB.findOne({email : request.body.email});
        if(checkUser && compareHash(request.body.password, checkUser?.password))
        {
            let payload = {data: checkUser._id};
            let token = tokenGenerator(payload);
            success(response, 201, "user login success", token)

        }
        else
        {
            next(new Error('login fail email or password wrong'))
        }

    }
    else if(request.body.phone)
    {
        let checkUser = await DB.findOne({phone : request.body.phone});
        if(checkUser && compareHash(request.body.password, checkUser?.password))
        {
            let payload = {data: checkUser._id};
            let token = tokenGenerator(payload);
            success(response, 201, "user login success", token)

        }
        else
        {
            next(new Error('login fail phone or password wrong'))
        }
    }
    else
    {
        next(new Error('we nee email or phone require to login'))
    }
}

let register = async(request, response, next)=>{

    try{
        let hash = encode(request.body.password, 5);
        let existingUser = await DB.findOne({
            $or : [
                {email : request.body.email},
                {phone : request.body.phone},
                {name : request.body.name}

            ]
        })

        if(existingUser)
        {
            throw new Error('user with name or email or phone alread exist');
        }
        let newUser = await DB.create({
            email : request.body.email,
            name : request.body.name,
            password : hash,
            phone : request.body.phone
        });

        if(newUser)
        {
            let payload = {data: newUser._id};
            let token = tokenGenerator(payload);
            success(response, 201, "user register success", token)
        }
        else
        {
            next(new Error('user register fail'))
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
    login,
    register,
}