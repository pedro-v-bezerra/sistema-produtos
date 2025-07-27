const yup = require('yup');

const productCreateSchema = yup.object().shape({
  name: yup.string().required('O nome do produto é obrigatório'),
  description: yup.string(),
  category: yup.string().required('A categoria do produto é obrigatória'),
  price: yup.number().required('O preço é obrigatório').positive('O preço deve ser maior que zero'),
});

module.exports = productCreateSchema;
