const { body, validationResult } = require('express-validator');


const validationRules = [
    body('username').isString().isLength({min: 4, max: 20}).notEmpty(),
    body('password').isStrongPassword({minLength: 6, minLowercase: 2, minNumbers: 2, minUppercase: 2 }).notEmpty().withMessage('min-lenght: 6, Uppercase 2, Lowercase 2, Number 2'),
    body('email').isString().isEmail().notEmpty().withMessage('Email invalido'),
    body('profilePhoto').isString().optional().withMessage('Profile Photo'),
    body('roleId').isInt({min: 1, max: 1000})
]

//IMPORTANTE: La contrasenia debe tener 2 Numeros, letras mayusculas y minusculas y caracter especial.

async function validationAuth(req, res, next) {

    await Promise.all(validationRules.map( validation => validation.run(req)));
    const isError = validationResult(req);
    if(isError.isEmpty()){
        return next();
    }

    return res.status(422).json({
        error: isError.array()
    })
}

module.exports = validationAuth;