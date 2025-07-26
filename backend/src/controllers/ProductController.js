const { Product } = require("../models");

module.exports = {
  async index(req, res) {
    const products = await Product.findAll();
    res.json(products);
  },

  async show(req, res) {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json(product);
  },

  async store(req, res) {
    const { name, description, price, stock, category } = req.body;
    if (!name || !price) {
      return res.status(400).json({ error: "Nome e preço são obrigatórios" });
    }

    const product = await Product.create({ name, description, category, price, stock });
    res.status(201).json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });

    await product.update({ name, description, category, price, stock });
    res.json(product);
  },

  async destroy(req, res) {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({ error: "Produto não encontrado" });

    await product.destroy();
    res.status(204).send(); // sem conteúdo
  },
};
