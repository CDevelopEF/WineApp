var app           = require('express')
var router        = app.Router()

//middleware
var validate        = require('../middleware/validation');

var addProduct      = require('../controllers/addproduct');
var getProducts     = require('../controllers/getproducts');
var updateProduct   = require('../controllers/updateproduct');
var deleteProduct   = require('../controllers/deleteproduct');

router.post('/addproduct', async (req, res) => {
    const producto = await addProduct(req);
    res.status(201).send({data : producto})
})

router.get('/getproducts', async (req, res) => {
    const listProduct = await getProducts(req);
    res.status(200).send({data : listProduct})
})
router.put('/modproduct/:id', validate, async (req, res) => {
    const updatedProducts = await updateProduct(req);
    res.status(201).send({data : updatedProducts})
})

router.delete('/delproduct/:id', async (req, res) => {

    const deletedProduct = await deleteProduct(req);
    res.status(200).send({data : deletedProduct})
})

module.exports = router;