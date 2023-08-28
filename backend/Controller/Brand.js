const Brand = require("../Model/Brand");

exports.feltchAllBrands = async (req, res) => {
  try {
    let brands = await Brand.find({}).exec();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createBrands = async (req, res) => {
  try {
    const brand = await new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json(error);
  }
};
