const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "rahul@sign";
const fetchuser = require("../middlewares/fetchuser");

// Route 1: create a user using post => api/auth/login
router.post(
  "/createuser",

  // validator
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    // if user already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res.send("Email already exists!");
      }

      // adding user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = new User({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      let result = await user.save();

      // sending token
      const data = user.id;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.status(201).json({ authToken });
      console.log(result);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//Route 2: authenticate a user using post => api/auth/login
router.post(
  "/login",

  // validator
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    // validation
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    // checking if the user exists
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ error: "email or password is wrong" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res.status(400).json({ error: "email or password is wrong" });
      }

      // sending token if user exists
      const data = user.id;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3: get user info (login required)
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
