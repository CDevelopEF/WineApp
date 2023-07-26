var {PrismaClient} = require('@prisma/client');
var prisma = new PrismaClient();

/**
 * Obtiene una lista de publicaciones desde la base de datos.
 * @param {number} id - Id del post a borrar.
 * @returns {Promise<object[]>} - Lista de publicaciones.
 * @throws {Error} - Si ocurre un error durante la consulta a la base de datos.
 */ 
async function deletePost(id) {
    try{
        const postDeleted = await prisma.post.delete({
            where: {
                id: id
            }
        })
        return postDeleted
    } catch(error) {
        return `No existe post con id: ${id}`;
    }

}

module.exports = deletePost;