var { PrismaClient } = require('@prisma/client');
var prisma           = new PrismaClient();

async function getProducts(req) {

    const {take, skip} = req.query;

    // Evaluar sino vienen nulos las Query
    const numberOfProd = !isNaN(take) ? parseInt(take) : 5;
    const skipProd     = !isNaN(skip) ? parseInt(skip) : 0; 

    try{
        const queryResult  = await prisma.products.findMany({skip: skipProd , take: numberOfProd});
        return queryResult;
    }catch(err){
        return `Error: ${err.message}`
    }
}

module.exports = getProducts;