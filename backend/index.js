require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const { connection } = require("./Config/connection");
const { userRouter } = require("./Router/user.routes");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send(
    '<h1 style="text-align:center; color:rgb(255,59,43); font-size:60px; margin-top:50px;">Welcome To Frequent Backend</h1>'
  );
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`Server is Running at ${process.env.port} `);
  } catch (error) {
    console.log(error);
  }
});
