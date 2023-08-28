const Cart = require("../Model/Cart");

exports.feltchCartByUser = async (req, res) => {
  const { id } = req.user;

  try {
    const cartItem = await Cart.find({ user: id })
      .populate("user")
      .populate("product");

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.addToCart = async (req, res) => {
  const { id } = req.user;

  const cart = await new Cart({
    ...req.body,
    user: id,
    product: req.body.product,
  });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  try {
    const id = req.body.id;

    const update = req.body;
   
    const cart = await Cart.findByIdAndUpdate(id, update, {
      new: true,
    });

    const doc = await cart.populate("product");

    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findByIdAndDelete(id);

    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};
