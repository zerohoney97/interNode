const e = require("express");
const { sequelize } = require("./models");
const dot=require('dotenv').config()
const app = e();
const session = require('express-session');
//로그인 라우터 설정
const loginRouter = require('./routers/login');
const cors = require("cors");



sequelize
  .sync({ force: false })
  .then((e) => {
    console.log("연결 성공~");
  })
  .catch((err) => {
    console.log(err);
  });

// 세션 사용
app.use(session({
  secret : process.env.SESSION_KEY,
  resave : false,
  saveUninitialized : false
}))

app.use(cors({
  // 도메인 허용 옵션
  // 접근을 허용할 도메인
  // 여러개의 도메인을 허용하고 싶다 배열의 형태로 넣어주면 된다
  // origin : ["","",""]
  origin : "http://127.0.0.1:5500",
  // origin : "",
  credentials : true,
}))

// 로그인 라우터 경로 설정

app.use(e.urlencoded({ extended: false }));
app.use('/login',loginRouter);
app.listen(8080, () => {
  console.log("gogo");
});
