const { param, body, validationResult } = require('express-validator');

const productValidationRules = [
  // Reglas de validación para el parámetro 'id'
  param('id').toInt().isNumeric().withMessage('El id debe ser un número'),
  
  // Reglas de validación para el body (count, name, price)
  body('count').notEmpty().isNumeric().isInt({ min: 0, max: 100000 }).withMessage('El parametro debe ser int, mayor a 0 y menor a 10000, no debe ser null'),
  body('name').notEmpty().isString().isLength({ min: 1, max: 30 }).withMessage('Str, notEmpty,MinLenght=2MaxLenght=30'),
  body('price').notEmpty().isFloat({ min: 0.1, max: 100000 }).withMessage('notEmpty,Float,min=0.1max=100000')
];

const validate = (req, res, next) => {
  // Ejecuta todas las reglas de validación en parámetros y body
  Promise.all(productValidationRules.map(validator => validator.run(req)))
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // No hay errores, pasa al siguiente middleware o controlador
    }
    
    // Hay errores, responde con los errores de validación
    return res.status(422).json({ errors: errors.array() });
  
};

module.exports = validate;
