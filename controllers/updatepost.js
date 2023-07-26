const { PrismaClient } = require('@prisma/client');
const prisma           = new PrismaClient();


/**
 * Crea en la base de datos una nueva publicacion.
 * @param {object} body - Cantidad de publicaciones a obtener (opcional, valor predeterminado: 5).
 * @returns {Promise<object[]>} - Post creado.
 * @throws {Error} - Si ocurre un error durante la consulta a la base de datos.
 */


async function updatePost(body, id) {
const {title, content} = body

const isExist = await prisma.post.findUnique({where: {
    id: id,
}})

if(!isExist){
    return `El post de id: ${id} no existe.`
}

    try{
        const resp = await prisma.post.update(
            {
                data: {
                    title: title,
                    content: content,
            },
                 where: isExist
            }
        )
    return resp;
    } catch (error) {
        throw new Error('Error: ', error)
    } 
    
}

module.exports = updatePost