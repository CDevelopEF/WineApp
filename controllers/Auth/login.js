const {PrismaClient} = require('@prisma/client');
var prisma           = new PrismaClient();
var bcrypt           = require('bcrypt');
                       require('dotenv').config();

const login = async (req, res) => {

    const {user, email, password} = req.body;

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
        const {password: as, create_at, ...data} = userDataBase;
        return res.status(200).json({data: data})


    }catch(err){
       return res.status(404).json({error: err.message})
    }
}

module.exports = login;