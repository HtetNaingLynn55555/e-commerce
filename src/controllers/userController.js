const { response } = require('express');
let DB = require('../models/user');
let {success} = require('../utils/helper');

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
    response.end('login');
}

let register = async(request, response, next)=>{
    response.end('register');
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