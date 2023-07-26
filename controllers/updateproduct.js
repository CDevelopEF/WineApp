const {body, validationResult, param} = require('express-validator');
var { PrismaClient }                  = require('@prisma/client');
var prisma                            = new PrismaClient();


async function updateProduct(req) {
    
    const {id}                 = req.params;
    const {count, name, price} = req.body;
    const parsedId             = parseInt(id, 10);

    try{
        const productUpdated = await prisma.products.update({
            where: {
                id: parsedId
            },
            data : {
                count: count,
                name: name,
                price: price, 
            }
        })
        return productUpdated;
    }catch(err){
        if(err.code === 'P2025'){
            return "El id no existe";
        } else {
            return `Error: ${err.message}`
        }
    }
}

module.exports = updateProduct;