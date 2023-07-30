var jwt = require('jsonwebtoken');
          require('dotenv').config();

async function verifyToken(req, res, next) {

    const accessToken = req.headers.authorization?.split(' ')[1]
    if(!accessToken){
        return res.status(401).json({error: "Access token not found!"})
    }
    try{
        const verifiedToken = jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN);
        req.token  =  verifiedToken;
        return next();
    }catch(err){
        return res.status(401).json({error: 'Token de acceso invalido'})
        //Es posible que aqui se desee redireccionar y no decir que es invalido solamente.
    }
} 
module.exports = verifyToken;