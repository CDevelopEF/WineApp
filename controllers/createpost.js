const {body, validationResult} = require('express-validator')
const { PrismaClient }         = require('@prisma/client');
const prisma                   = new PrismaClient();


/**
 * Crea en la base de datos una nueva publicacion.
 * @param {object} body - Cantidad de publicaciones a obtener (opcional, valor predeterminado: 5).
 * @returns {Promise<object[]>} - Post creado.
 * @throws {Error} - Si ocurre un error durante la consulta a la base de datos.
 */


async function createpost(req) {
const {title, content} = req.body

const isExist = await prisma.post.findUnique({where: {
    title,
}})

if(isExist){
    return "El post existe"
}

    try{
        const resp = await prisma.post.create({
            data: {
                title,
                content,
            }
        })
    return resp;
    } catch (error) {
        throw new Error('Error: ', error)
    } 
    
}

module.exports = createpost