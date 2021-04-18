const Category = require("../../database/schemas/category/index");

exports.list = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.add = async (req, res, next) => {
  try {
    const results = await Category.find({
      category_cod: req.body.category_cod,
    });

    if (results.length) {
      res.status(500).json({
        error: "Ya existe una categoría con ese código",
        codeName: "duplicateKey",
      });
      return;
    }
    const category = new Category(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await Category.findOne({
      category_cod: req.body.category_cod,
    });

    if (results.length && id !== results._id) {
      res.status(500).json({
        error: "Ya existe una categoría con ese código",
        codeName: "duplicateKey",
      });
      return;
    }
    const category = await Category.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: "Categoria Eliminada" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ status: "No existe la Categoría" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
