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

module.exports = {
    bodyValidator,
}