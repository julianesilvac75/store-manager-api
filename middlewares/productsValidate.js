const Joi = require('joi');
const { HTTP_UNPROCESSABLE_ENTITY_STATUS, HTTP_BAD_REQUEST_STATUS } = require('../helpers');

// REF pra utilização do Joi: Gabriel Pinheiro https://github.com/tryber/sd-016-b-store-manager/pull/29/files#diff-e1639f5ce5382c251fe24e619af22985f568b1140a74d63fbb7c06aa125023a4

const errorMessage = (error) => {
  if (error.type.includes('min')) {
    return {
      code: 'Unprocessable Entity',
      message: error.message,
    };
  }

  return { 
    code: 'Bad Request',
    message: error.message,
  };
};

const productsValidate = (req, res, next) => {
  const { name, quantity } = req.body;

  const required = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).integer().required(),
  });

  const validation = required.validate({ name, quantity });

  if (validation.error) {
    const error = errorMessage(validation.error.details[0]);

    switch (error.code) {
      case 'Unprocessable Entity':
        return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ message: error.message });
      default:
        return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: error.message });
    }
  }

  next();
};

module.exports = productsValidate;