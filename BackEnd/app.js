const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const mainRouter = require("./routers/main");

app.use(e.json());
app.use(e.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(e.urlencoded({ extended: false }));
app.use(e.static(path.join(__dirname, '..','FrontEnd','public')));
app.use("/main",mainRouter);

app.listen(8080, () => {
  console.log("gogo");
});
