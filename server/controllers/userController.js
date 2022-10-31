const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.PVT_KEY, { expiresIn: "3d" });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

exports.userSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    // const token = createToken(user._id);

    res.status(200).json({ email });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
