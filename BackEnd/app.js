const e = require("express");
const { sequelize } = require("./models");
const dot=require('dotenv').config()
const app = e();
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

module.exports = {app, server};