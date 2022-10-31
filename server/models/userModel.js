const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("Email and password must be filled");
  else if (!validator.isEmail(email)) throw Error("Invalid email");
  else if (!validator.isStrongPassword(password))
    throw Error("Password not strong");

  const check = await this.findOne({ email }); ///returns null if not present

  if (check) throw Error("Account already exists for this email");

  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPW });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("Email and password must be filled");
  else if (!validator.isEmail(email)) throw Error("Invalid email");
  else if (!validator.isStrongPassword(password))
    throw Error("Password not strong");

  const user = await this.findOne({ email }); ///returns null if not present

  if (!user) throw Error("Email not registered");

  const check = await bcrypt.compare(password, user.password);

  if (!check) throw Error("Invalid login credentials");

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
