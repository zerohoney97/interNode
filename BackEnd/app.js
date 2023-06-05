const e = require("express");

const app = e();

app.use(express.urlencoded({ extended: false }));
app.listen(8080, () => {
  console.log("gogo");
});
