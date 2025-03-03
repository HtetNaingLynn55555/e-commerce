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

module.exports = {
    bodyValidator,
    paramsValidator,
}