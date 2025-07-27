const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const productCreateSchema = require('../schemas/productCreateSchema');
const productUpdateSchema = require('../schemas/productUpdateSchema');
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');

router.get('/', authenticateMiddleware, async (req, res) => {
  try {
    return await ProductController.listAll(req, res);
  } catch {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/:id', authenticateMiddleware, async (req, res) => {
  try {
    return await ProductController.listById(req, res);
  } catch {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/', authenticateMiddleware, async (req, res) => {
  try {
    await productCreateSchema.validate(req.body, { abortEarly: false });
    return ProductController.add(req, res);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/:id', authenticateMiddleware, async (req, res) => {
  try {
    await productUpdateSchema.validate(req.body, { abortEarly: false });
    return ProductController.update(req, res);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ errors: err.errors });
    }
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/:id', authenticateMiddleware, async (req, res) => {
  try {
    return await ProductController.delete(req, res);
  } catch {
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
