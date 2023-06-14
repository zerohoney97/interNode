const e = require("express");
const { sequelize } = require("./models");
const dot = require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const app = e();
const signUpRouter = require("./routers/signUp");
const mainRouter = require("./routers/main");
const chatRouter = require("./routers/chat");


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
  .then(() => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "nonbanonfj",
//   database: "test16",
//   // host: process.env.DB_HOST,
//   // user: process.env.DB_USER,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
// });
// const sequelize1 = new Sequelize({
//   host: "127.0.0.1",
//   user: "root",
//   password: "nonbanonfj",
//   database: "test16",
//   dialect:"mysql"
//   // host: process.env.DB_HOST,
//   // user: process.env.DB_USER,
//   // password: process.env.DB_PASSWORD,
//   // database: process.env.DB_NAME,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('MySQL 연결 오류:', err);
//     return;
//   }
//   console.log('MySQL에 연결되었습니다.');

//   // 여기서부터 데이터베이스 작업을 수행할 수 있습니다.
//   // 채팅 메시지를 저장하거나 조회하는 등의 작업을 구현할 수 있습니다.
// });

app.use(e.urlencoded({ extended: false }));

app.use("/main",mainRouter);
app.use("/signup", signUpRouter);
app.use("/chat",chatRouter);


// app.use(e.static(path.join(__dirname, "js")));
app.use("/public",e.static(path.join(__dirname,"..","FrontEnd","public"),{
    setHeaders : (res,filePath) => {
        if(path.extname(filePath) === ".css"){
            res.setHeader("Content-Type","text/css");
        }
    }
}));
app.listen(8080, () => {
  console.log("gogo");
});

//module.exports = server;



