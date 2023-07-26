var express    = require('express');
var router     = express.Router();

//middleware
var validation_post = require('../middleware/validation_post');

//controllers
var createpost = require('../controllers/createpost');
var getAllPost = require('../controllers/getallpost');
var updatePost = require('../controllers/updatepost');
var deletePost = require('../controllers/deletepost');

router.post('/createpost', validation_post, async (req, res) => {

    const resp = await createpost(req);
    return res.status(203).send({data: resp});
})

router.get('/allpost', async (req, res) => {
    const { take, skip } = req.query;
  
    // Evaluar sino vienen nulos las Query
    const numberOfPost = !isNaN(take) ? parseInt(take) : 5;
    const skipPost     = !isNaN(skip) ? parseInt(skip) : 0; 
  
    const allpost = await getAllPost(numberOfPost, skipPost);
    res.status(200).send({ data: allpost });
  });

router.put('/updatepost/:id', async (req, res) => {
    const {id} = req.params;
    const postUpdated = await updatePost(req.body, parseInt(id))
    res.status(201).send({data: postUpdated})
  })
router.delete('/deletepost/:id', async (req, res) => {
    const {id} = req.params;
    if(isNaN(id)){
        res.status(401).send({message: 'Bad Request'})
    }
    const postDeleted = await deletePost(parseInt(id));
    res.status(404).send({data: postDeleted})
})
module.exports = router;