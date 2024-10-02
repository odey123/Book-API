const {expressjwt} = require('express-jwt')

function authjwt() {
    const secret = process.env.secret
    return expressjwt ({
        secret: secret,
        algorithms: ['HS256'],
    }).unless({
        path:[
            '/users/register',
            '/users/login'
        ]
       
    })

 
}





module.exports = authjwt;
