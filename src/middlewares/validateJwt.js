const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJwt = (req, res = response, next )=>{

    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            isOk: false,
            msg: "not isToken!"
        });
    }
    try {
        const { uid, nombres } = jwt.verify(
            token,
            process.env.SECRET_JWT_CREATE
        );
            // ojo con esta informacion
        req.uid = uid;
        req.nombres = nombres;

    } catch (error) {
        res.status(401).json({
            isOk: false,
            msg: "not is-invalidToken!"
        });
    }

    next();
}

module.exports = {
    validateJwt
}