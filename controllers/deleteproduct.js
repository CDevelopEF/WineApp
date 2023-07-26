var { PrismaClient }            = require('@prisma/client');
var prisma                      = new PrismaClient();
const {param, validationResult} = require('express-validator')

async function deleteProduct(req) {

    const {id} = req.params;
    let parsedInt = parseInt(id);
    const validationRules = param('id').toInt(10).isNumeric().withMessage('El id debe ser un numero')
    
    await validationRules.run(req);
    const isError = validationResult(req);

    if(!isError.isEmpty()){
        return isError;
    }
    if(isNaN(parsedInt)){
        return `Debe proporcionar un id`;
    }

    try{
        const deletedProduct = await prisma.products.delete({
            where: {
                id: parsedInt
            }
        })
        return deletedProduct;
    }catch(err){
        if(err.code === 'P2025'){
            return `El id no existe en la base  de datos`
        }
        throw new Error('Internal Error')
    }

}

module.exports = deleteProduct;