////////////////////////////////////
// Dependencies
///////////////////////////////////
const jwt = require('jsonwebtoken');

// jwt verify
const checkLogin = async (req, res, next) => {
    const {token} = req.headers;
    try{
        const privateKey = process.env.SECRET_KEY;
        const decode = await jwt.verify(token, privateKey);
        const {email} = decode;
        req.email = email;
        next();
    }catch{
        res.status(401).json({status: 'Auth_Harmful'});
    }
}

module.exports = checkLogin;