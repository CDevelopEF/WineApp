const {body, validationResult} = require('express-validator');


const validationRules = [
    body('title').isString().trim().notEmpty().withMessage("El campo no puede estar vacio"),
    body('content').isString().trim().notEmpty().withMessage("El campo no puede estar vacio"),
]

async function validation_post(req, res, next) {
    await Promise.all(validationRules.map( validation => validation.run(req)));
    const errorResponse = validationResult(req);

    if( errorResponse.isEmpty()){
        return next();
    }

    return res.status(422).json(
        {
            errors: errorResponse.array()
        }
    )
}

module.exports = validation_post;