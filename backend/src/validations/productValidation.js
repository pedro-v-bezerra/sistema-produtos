const yup = require("yup");

const productSchema = yup.object().shape({
  name: yup.string().required("O nome do produto é obrigatório"),
  description: yup.string().required("A descrição do produto é obrigatória"),
  category: yup.string().required("A categoria do produto é obrigatória"),
  price: yup
    .number()
    .required("O preço é obrigatório")
    .positive("O preço deve ser maior que zero"),
});

module.exports = productSchema;
