const jwt = require("jsonwebtoken");

exports.isLoginMiddle = (req, res, next) => {
  const { access_token } = req.session;
  console.log(access_token, "로그인 미들웨어 거침");

  jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, acc_decoded) => {
    if (err) {
      console.log(err);

      res.send("다시 로그인 해주세요");
    } else {
      req.acc_decoded = acc_decoded;
      // 다음 미들웨어 실행
      next();
    }
  });
};
