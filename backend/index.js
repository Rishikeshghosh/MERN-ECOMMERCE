const express = require("express");
const cors = require("cors");
const server = express();
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const crypto = require("crypto");
const dotenv = require("dotenv").config();
const path = require("path");
const productRouter = require("./Routes/Products");
const categoryRouter = require("./Routes/Category");
const brandRouter = require("./Routes/Brand");
const userRouter = require("./Routes/User");
const authRouter = require("./Routes/Auth");
const cartRouter = require("./Routes/Cart");
const orderRouter = require("./Routes/Order");
const connectMongoose = require("./Mongodb/database");
const User = require("./Model/User");
const { sanitizeUser, isAuth, cookieExtractor } = require("./Services/Common");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

server.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  }
);

let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;

server.use(express.static(path.resolve(__dirname, "build")));
server.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));
server.use(cookieParser());
server.use(
  cors({
    exposedHeaders: ["X-RateLimit-Limit"], //https://64ba95e8e2ed1a0bcfdb1865--aquamarine-klepon-da6714.netlify.app/
    origin: "*",
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
  })
);

server.use(express.json());
connectMongoose();

server.use("/products", isAuth(), productRouter);
server.use("/categories", isAuth(), categoryRouter);
server.use("/brands", isAuth(), brandRouter);
server.use("/users", isAuth(), userRouter);
server.use("/auth", authRouter);
server.use("/cart", isAuth(), cartRouter);
server.use("/orders", isAuth(), orderRouter);

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();

      if (!user) {
        done(null, false, { message: "User not found" });
      } else {
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "Invalid credentials" });
            } else {
              const token = await jwt.sign(
                sanitizeUser(user),
                process.env.JWT_SECRET_KEY
              );
              done(null, { token }); //{ id: user.id, role: user.role, email: user.email }
            }
          }
        );
      }
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      if (error) {
        return done(error, false);
      }
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      role: user.role,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (amount) => {
  return amount * 1000;
};

server.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(totalAmount),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  console.log(paymentIntent.client_secret);
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const endpointSecret = process.env.ENDPOINTSECRET;

const PORT = process.env.PORT;

server.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));
