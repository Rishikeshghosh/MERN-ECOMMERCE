const Order = require("../Model/Order");
const User = require("../Model/User");
const Product = require("../Model/Product");
const { sendMail, invoiceTemplate } = require("../Services/Common");

exports.feltchUserByOrder = async (req, res) => {
  const { id } = req.user;
  try {
    let user = await Order.find({ user: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.createOrder = async (req, res) => {
  const { id } = req.user;

  /*  const order = req.body; */

  // i'm not using this method to decres the stock quantity when user orders beacuse after sometime all the product's
  // quantity might get to zero and imight have to increase the stocks manually which i dont want to do but you can use it totallty works

  /* for (let item of order.items) {
    let product = await Product.findOne({ _id: item.product.id });
    product.$inc("stock", -1 * item.quantity);
    await product.save();
  } */

  const order = await new Order({
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    totalItems: req.body.totalItems,
    user: id,
    paymentMethod: req.body.paymentMethod,
    selectAddress: req.body.selectAddress,
    status: req.body.status,
  });

  try {
    const doc = await order.save();
    const user = await User.findById(order.user);

    sendMail({
      to: user.email,
      html: invoiceTemplate(doc),
      subject: "Order Received",
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const update = req.body;

    const order = await Order.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Order.findByIdAndDelete(id);

    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllOrders = async (req, res) => {
  let query = Order.find({ delete: { $ne: true } });
  let totalOrdersQuery = Order.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  console.log({ totalDocs });

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
