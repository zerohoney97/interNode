const e = require("express");
const { sequelize } = require("./models");
const dot=require('dotenv').config();
const cors = require("cors");
const signUpRouter = require("./routers/signUp");
const app = e();

app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true,
}));

sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(e.urlencoded({ extended: false }));
app.use(e.json());
app.use("/signup", signUpRouter);

app.listen(8080, () => {
  console.log("gogo");
});
