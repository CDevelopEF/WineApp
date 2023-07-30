const {PrismaClient} = require('@prisma/client');
var prisma           = new PrismaClient();
var bcrypt           = require('bcrypt');
                       require('dotenv').config();
const jwt            = require('jsonwebtoken');


//Agregar esta funcionalidad a la carpeta Utils dentro del proyecto
const generateTokens = (user) => {
    const accessTokenSigned = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, {expiresIn: '15m'});
    const refreshTokenSigned = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN, {expiresIn: '7d'});
    return {accessTokenSigned, refreshTokenSigned};
}

const login = async (req, res) => {

    const {password,email, id} = req.body;

    try {

        const userDataBase = await prisma.users.findUnique({
            where: {
                email: email
            },
            include:{
                role: true
            }
        })

        if(!userDataBase) {
           return res.status(401).json({data: 'User not found!'})
        }

        const { password: pass } = userDataBase;

        const isPasswordCorrect = await bcrypt.compare(password, pass);
        
        if(!isPasswordCorrect){
            return res.status(401).json({data: 'user o password incorrecta'});
        }

        const {accessTokenSigned, refreshTokenSigned} = generateTokens(userDataBase);
        const {role} = userDataBase;
        const {role_value} = role; //METODO PARA OBTENER EL ROL y despues evaluarlo tenerlo en cuenta en middleware isAdmin()
        return res.status(200).json({
            jwt: accessTokenSigned,
            refreshToken: refreshTokenSigned
        })


    }catch(err){
       return res.status(404).json({error: err.message})
    }
}

module.exports = login;