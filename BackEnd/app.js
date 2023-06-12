const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const app = e();

app.use(e.json());
app.use(e.urlencoed({ extended: false }));

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
app.listen(8080, () => {
  console.log("gogo");
});
