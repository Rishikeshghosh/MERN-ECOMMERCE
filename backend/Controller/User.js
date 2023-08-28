const User = require("../Model/User");
const { sanitizeUser } = require("../Services/Common");

exports.createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const check = await User.findById(id);
    const user = sanitizeUser(check);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const user = await User.findByIdAndUpdate(id, update, { new: true });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
