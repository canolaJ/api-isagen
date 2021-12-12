const { response } = require('express')
const{ validationResult } = require('express-validator');
const res = require('express/lib/response');


const validateFields = (req, res = response, next)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:mapped()
        });
    }

    next();
}


module.exports = {
    validateFields
}