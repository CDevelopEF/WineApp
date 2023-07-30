const {PrismaClient} = require('@prisma/client');
var prisma           = new PrismaClient();
var bcrypt           = require('bcrypt');
                       require('dotenv').config();
const jwt            = require('jsonwebtoken');



const generateTokens = (user) => {
    const accessTokenSigned = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '15m'});
    const refreshTokenSigned = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, {expiresIn: '7d'});
    return {accessTokenSigned, refreshTokenSigned};
}

const login = async (req, res) => {

    const {password,email} = req.body;

    try {

        const userDataBase = await prisma.users.findUnique({
            where: {
                email: email
            }
        })

        if(!userDataBase) {
           return res.status(401).json({data: 'User not found!'})
        }

        const { password: pass, id, name } = userDataBase;

        const isPasswordCorrect = await bcrypt.compare(password, pass);
        
        if(!isPasswordCorrect){
            return res.status(401).json({data: 'user o password incorrecta'});
        }

        const {accessTokenSigned, refreshTokenSigned} = generateTokens(userDataBase)
        return res.status(200).json({
            jwt: refreshTokenSigned,
            accessToken: accessTokenSigned
        })


    }catch(err){
       return res.status(404).json({error: err.message})
    }
}

module.exports = login;