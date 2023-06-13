const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const signUpRouter = require("./routers/signUp");
const mainRouter = require("./routers/main");
const adminPageRouter = require("./routers/adminMypage");
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

app.use("/main", mainRouter);
app.use("/signup", signUpRouter);
app.use("/adminPage", adminPageRouter);
// app.use(e.static(path.join(__dirname, "js")));
app.use(
  "/public",
  e.static(path.join(__dirname, "..", "FrontEnd", "public"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".css") {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.use(
  "/js",
  e.static(path.join(__dirname, "..", "FrontEnd", "js"), {
    setHeaders: (res, filePath) => {
      if (path.extname(filePath) === ".js") {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.listen(8080, () => {
  console.log("gogo");
});
