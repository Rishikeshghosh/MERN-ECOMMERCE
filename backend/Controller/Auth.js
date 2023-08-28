const User = require("../Model/User");
const crypto = require("crypto");
const { sanitizeUser, sendMail } = require("../Services/Common");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { email } = req.body;
  try {
    const alreadyRegisteredUser = await User.findOne({ email: email });
    if (alreadyRegisteredUser) {
      res.status(401).json("User alreday registered! Please login.");
    } else {
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          const user = await new User({
            ...req.body,
            password: hashedPassword,
            salt,
          });
          user.save();
          req.login(sanitizeUser(user), (error) => {
            if (error) {
              res.status(400).json(error);
            } else {
              const token = jwt.sign(
                sanitizeUser(user),
                process.env.JWT_SECRET_KEY
              );
              res.cookie("jwt", token, {
                expires: new Date(Date.now() + 4500000),
                httpOnly: true,
              });
              console.log(token);
              res.status(201).json(token);
            }
          });
        }
      );
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  res.cookie("jwt", req.user.token, {
    expires: new Date(Date.now() + 4500000),
    httpOnly: true,
  });
  res.status(201).json(req.user.token); //req.user
};

exports.logOut = async (req, res) => {
  res
    .cookie("jwt", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, token, password } = req.body.data;

  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
      }
    );
    const subject = "Succesfully able to reset your E-commerce password !";
    const text = "Succesfully able to reset your E-commerce password !";
    const html = `<p>Your E-commerce password has been succesfully updated !</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, text, html });
      res.status(201).json(response);
    } else {
      res.status(401);
    }
  } else {
    res.status(401);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = await crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    await user.save(); // "https://64ba450dc3c0525c21f75357--peaceful-valkyrie-2db202.netlify.app/reset-password?token=" +
    const resetPageLink =
      "https://64ba95e8e2ed1a0bcfdb1865--aquamarine-klepon-da6714.netlify.app?token=" +
      token +
      "&email=" +
      email;
    const subject = "Reset password for e-commerce";
    const html = `<p>Click <a href='${resetPageLink}'> here </a>to reset your E-commerce password.</p>`;
    if (email) {
      const response = await sendMail({ to: email, subject, html });

      res.status(200).json(response);
    } else {
      res.status(401);
    }
  } else {
    res.status(401);
  }
};
