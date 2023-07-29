var {PrismaClient} = require('@prisma/client');
var prisma         = new PrismaClient();
var bcrypt         = require('bcrypt');
                     require('dotenv').config();


const register = async (req, res) => {

    const {username, password, email, roleId} = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);

    try {
        const userFinded = await prisma.users.create({
            data : {
                email,
                password: passwordHashed,
                username,
                roleId
            }
        });
        return res.status(200).json({
            data: userFinded
        });

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            data: 'Internal Server Error.'
        })
    }
}


module.exports = register;