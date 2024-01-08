const express = require("express");
const router = express.Router();
const User = require("../models/User");


// create a user using post
router.post("/", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
  console.log(result);
});

module.exports = router;
