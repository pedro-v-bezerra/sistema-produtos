const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const productSchema = require("../validations/productValidation");
const authenticate = require("../middlewares/auth");

router.get("/", authenticate, ProductController.index);
router.get("/:id", authenticate, ProductController.show);
router.post("/", authenticate, async (req, res) => {
  try {
    await productSchema.validate(req.body, { abortEarly: false }); // valida tudo de uma vez
    return ProductController.store(req, res);
  } catch (err) {
    return res.status(400).json({
      errors: err.errors, // array com as mensagens de erro do yup
    });
  }
});
router.put("/:id", authenticate, async (req, res) => {
  try {
    await productSchema.validate(req.body, { abortEarly: false }); // valida tudo de uma vez
    return ProductController.update(req, res);
  } catch (err) {
    return res.status(400).json({
      errors: err.errors, // array com as mensagens de erro do yup
    });
  }
});
router.delete("/:id", authenticate, ProductController.destroy);

module.exports = router;
