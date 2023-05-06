const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const app = express();
const cors = require("cors");
const { Notice } = require("./routes/notice.route");

app.use(express.json());
app.use(cors({ origin: "*" }));
// app.use("/",(err,res)=>{
//     res.send("welcome to the mock");
// })

app.use("/notice", Notice);


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to mongo");
  } catch (err) {
    console.log("msg:", err);
  }
  console.log(`connected to port ${process.env.port} successfully`);
});
