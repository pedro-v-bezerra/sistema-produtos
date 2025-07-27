const { Product } = require('../models');

module.exports = {
  async listAll(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json({
        message: 'Produtos listados com sucesso',
        error: false,
        data: products,
      });
    } catch {
      return res.status(500).json({
        message: 'Erro ao listar produtos',
        error: true,
        data: null,
      });
    }
  },

  async listById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado',
          error: true,
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Produto encontrado com sucesso',
        error: false,
        data: product,
      });
    } catch {
      return res.status(500).json({
        message: 'Erro ao buscar o produto',
        error: true,
        data: null,
      });
    }
  },

  async add(req, res) {
    try {
      const { name, description, price, stock, category } = req.body;

      const product = await Product.create({ name, description, category, price, stock });

      return res.status(201).json({
        message: 'Produto adicionado com sucesso',
        error: false,
        data: product,
      });
    } catch {
      return res.status(500).json({
        message: 'Erro ao adicionar o produto',
        error: true,
        data: null,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, category } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado',
          error: true,
          data: null,
        });
      }

      const updatedProduct = await product.update({ name, description, category, price, stock });

      return res.status(200).json({
        message: 'Produto atualizado com sucesso',
        error: false,
        data: updatedProduct,
      });
    } catch {
      return res.status(500).json({
        message: 'Erro ao atualizar o produto',
        error: true,
        data: null,
      });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({
          message: 'Produto não encontrado',
          error: true,
          data: null,
        });
      }

      await product.destroy();

      return res.status(200).json({
        message: 'Produto deletado com sucesso',
        error: false,
        data: null,
      });
    } catch {
      return res.status(500).json({
        message: 'Erro ao deletar o produto',
        error: true,
        data: null,
      });
    }
  },
};
