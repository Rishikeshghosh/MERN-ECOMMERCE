
const Product = require("../Model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await new Product(req.body);
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const response = await product.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  let condition = {};

  if (!req.query.admin) {
    condition.delete = { $ne: true };
  }
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } }); // phone
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } }); //apple
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    }); //apple
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page || 10;
    query = query.skip(pageSize * (page - 1)).limit(pageSize); //page limit : 10
  }

  try {
    const doc = await query.exec();
    res.set("X-RateLimit-Limit", totalDocs);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};
