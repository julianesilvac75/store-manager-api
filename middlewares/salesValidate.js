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

const searchForError = (product) => {
  const required = Joi.object({
    productId: Joi.number().integer().min(1).required(),
    quantity: Joi.number().integer().min(1).required(),
  });
  let isValid = true;
  let errorInfo = {};

  const validation = required.validate(product);

  if (validation.error) {
    isValid = false;
    errorInfo = validation.error;
  }

  return { isValid, errorInfo };
};

const salesValidate = (req, res, next) => {
  const productsPayload = req.body;

  const { isValid, errorInfo } = productsPayload.map(searchForError)[0];

  if (!isValid) {
    const error = errorMessage(errorInfo.details[0]);

    switch (error.code) {
      case 'Unprocessable Entity':
        return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS).json({ message: error.message });
      default:
        return res.status(HTTP_BAD_REQUEST_STATUS).json({ message: error.message });
    }
  }

  next();
};

module.exports = salesValidate;
