let success = async(response, status=200, message = "success", data=[])=>{
    response.status(status).json({
        message,
        data
    })
}

module.exports = {
    success,
}