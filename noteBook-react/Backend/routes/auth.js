const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'rahul@sign';

// create a user using post
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
    const error = validationResult(req);
    let user = await User.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // if data is invalid
    if (!error.isEmpty()) {
      res.send({ errors: error.array() });
      // if user already exists
    } else if (user) {
      res.send("Email already exists!");
      // adding data
    } else {
      let user = new User({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = user.id
      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});
      let result = await user.save();
      console.log(result);
    }
  }
);

module.exports = router;
