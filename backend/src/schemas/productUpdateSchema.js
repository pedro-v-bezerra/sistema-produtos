const yup = require('yup');

const productUpdateSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  category: yup.string(),
  price: yup.number().positive('O preço deve ser maior que zero'),
});

module.exports = productUpdateSchema;
