require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/userRoutes");
const attnRouter = require("./routes/attnRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

//routes
app.use("/api/user", userRouter);
app.use("/api", attnRouter);

app.get("/", (req, res) => res.json({ msg: "welcome" }));

const connStr = process.env.MONGO_URI.replace("<password>", process.env.PW);
// console.log(connStr);

// Running the app only when connection is succesful
mongoose
  .connect(connStr, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((con) => {
    // console.log(con.connections);
    app.listen(process.env.PORT || 8000, () => {
      console.log("LISTENIN..");
    });
  });
