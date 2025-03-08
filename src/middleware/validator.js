let {verifyToken} = require('../utils/helper');
let DB = require('../models/user');

let bodyValidator = (schema) =>{
    
    return (request, response, next)=>{
        let {error, result} = schema.validate(request.body);

        if(error)
        {
            next(new Error(error.details[0].message))
        }
        else
        {
            next();
        }
    }
}

let paramsValidator = (schema, name)=>{
    return (request, response, next)=>{
        let obj = {};
        obj[`${name}`] = request.params[`${name}`];
        
        let {error, result} = schema.validate(obj)
        if(error)
        {
            next(new Error(error.details[0].message))
        }
        else
        {
            next();
        }
    }
}

let tokenValidator = async(request, response, next)=>{
    let bareertoken = request.headers.authorization || request.headers.Authorization;
    if(bareertoken)
    {
        let token = bareertoken.split(' ')[1];
        if(token)
        {
           let data = verifyToken(token)
           if(data)
           {
                let user = await DB.findById(data.data);
                if(user)
                {
                    console.log('error')
                    next()
                }
                else
                {
                    next(new Error('Creditenal error'))
                }
                
           }
           else
           {
                next(new Error('Invalid Token'))
           }
        }   
        else
        {
            next(new Error('invalid token'))
        }
    }
    else
    {
        next(new Error('inavlid token'))
    }
}

module.exports = {
    bodyValidator,
    tokenValidator,
    paramsValidator,
}