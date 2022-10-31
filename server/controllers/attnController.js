const Attn = require("../models/attnModel");

exports.getAttn = async (req, res) => {
  try {
    // console.log(req.user);
    const allAttn = await Attn.find({ uid: req.user });
    // console.log(allAttn);
    res.status(200).json(allAttn);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateAttn = async (req, res) => {
  try {
    const allAttn = await Attn.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(allAttn);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAttn = async (req, res) => {
  try {
    const { id } = req.params;
    const allAttn = await Attn.findByIdAndDelete(req.params.id);
    res.status(200).json(allAttn);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteAllAttn = async (req, res) => {
  try {
    const allAttn = await Attn.deleteMany();
    res.status(200).json(allAttn);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createAttn = async (req, res) => {
  try {
    const id = req.user;
    console.log(req.body);
    const allAttn = await Attn.create({ ...req.body, uid: id });
    res.status(200).json(allAttn);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
