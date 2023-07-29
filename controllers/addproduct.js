var {PrismaClient}               = require('@prisma/client');
var prisma                       = new PrismaClient()
const { body, validationResult } = require('express-validator');
/**
 * Crea en la base de datos un nuevo producto.
 * @param {object} req - Request obj.
 * @returns {Promise<object[]>} - Producto creado.
 * @throws {Error} - Si ocurre un error durante la consulta a la base de datos.
 */

async function addProduct(req) {

    const {count, name, price } = req.body;

    const validationRules = [
        body('count').notEmpty().isInt({min: 0, max: 100000,}).withMessage("El valor minimo es cero, dataTypeInt"),
        body('name').isString().trim().notEmpty().withMessage("El campo no puede estar vacio"),
        body('price').notEmpty().isFloat({min: 0, max: 100000}).withMessage('No puede estar vacio, datatypeFloat')
    ]
    await Promise.all(validationRules.map( validation => validation.run(req)));
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return {message: [errores]}
    }
    try {
        const productResult = await prisma.products.create({
            data : {
                count: count,
                name: name,
                price: price
            }
        });
        return productResult;
    } catch(error) {
        throw new Error(`Error al crear producto: ${error.message}`);
    }
}

module.exports = addProduct;