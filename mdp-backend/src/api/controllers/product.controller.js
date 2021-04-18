const Product = require("../../database/schemas/product/index");
const Category = require("../../database/schemas/category/index");

exports.list = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({error: e});
  }
};

exports.add = async (req, res, next) => {
  try {
    const { category } = req.body;
    const isValidCategory = await Category.findById(category);
    const results = await Product.find({
      product_cod: req.body.product_cod,
    });
    if (results.length) {
      res.status(500).json({ error: "Ya existe un producto con ese código", codeName: "duplicateKey" });
      return;
    }
    if (isValidCategory) {
      const product = await new Product(req.body);
      product.save();
      res.status(200).json(product);
    } else {
      res.status(404).json({ status: "La categoria no existe" });
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Product.findOne({
      product_cod: req.body.product_cod,
    });

    if (results.length && id !== results._id) {
      res.status(500).json({ error: "Ya existe un producto con ese código" });
      return;
    }    
    const { category } = req.body;
    const isValidCategory = await Category.findById(category);
    if (isValidCategory) {
      const product = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(product);
    } else {
      res.status(404).json({ status: "La categoria no existe" });
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
};

exports.delete = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (product) {
      res.status(200).json({ status: "Producto Eliminado" });
    } else {
      res.status(404).json({ status: "No existe el producto" });
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ status: "No existe el Producto" });
    }
  } catch (e) {
    res.status(500).json({error: e});
  }
};
