const express = require("express");
const { userSignup, userLogin } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/login").post(userLogin);

userRouter.route("/signup").post(userSignup);

module.exports = userRouter;
