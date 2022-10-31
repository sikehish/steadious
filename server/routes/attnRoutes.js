const jwt = require("jsonwebtoken");
const { Router } = require("express");
const express = require("express");

const {
  getAttn,
  deleteAttn,
  updateAttn,
  createAttn,
  deleteAllAttn,
} = require("../controllers/attnController");
const attnRouter = express.Router();

//Protecting API routes- middleware func
const checkAuth = (req, res, next) => {
  // console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1]; //Bearer token present in the header

  try {
    const { id } = jwt.verify(token, process.env.PVT_KEY);
    req.user = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

attnRouter.use(checkAuth);

attnRouter.route("/attn").get(getAttn).post(createAttn).delete(deleteAllAttn);

attnRouter.route("/attn/:id").delete(deleteAttn).patch(updateAttn);

module.exports = attnRouter;
