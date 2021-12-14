const jwt = require('jsonwebtoken');

const generateJwt = ( uid, nombres) =>{

    return new Promise( (resolve, reject ) =>{

        const payload = { uid, nombres};

        jwt.sign(payload, process.env.SECRET_JWT_CREATE, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('the token was not generated!')
            }

            resolve( token );
        } )
    })

}

module.exports = {
    generateJwt
}