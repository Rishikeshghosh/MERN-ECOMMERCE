const Category = require("../Model/Category");

exports.fetchAllCategories = async (req, res) => {
  try {
    let categories = await Category.find({}).exec();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createCategories = async (req, res) => {
  try {
    const category = await new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await new Category.findById(id);

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};
