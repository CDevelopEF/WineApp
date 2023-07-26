const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Obtiene una lista de publicaciones desde la base de datos.
 * @param {number} totake - Cantidad de publicaciones a obtener (opcional, valor predeterminado: 5).
 * @param {number} skip   - Offset para paginacion, cantidad de publicaciones a saltar.
 * @returns {Promise<object[]>} - Lista de publicaciones.
 * @throws {Error} - Si ocurre un error durante la consulta a la base de datos.
 */

async function getAllPost(totake, skip) {
    try{
        const listpost = await prisma.post.findMany({take: totake, skip: skip });
        return listpost;
    }catch(error) {
        throw new Error("Error al obtener los post: " + error)
    }
}

module.exports = getAllPost;