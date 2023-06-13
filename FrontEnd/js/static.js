const path = require("path");
// 이미지 경로 변수
const imgPath = path.join(__dirname, "..", "..", "BackEnd", "imgs");

// 외부 요청시 이 부분만 변경해주면 된다! 배포시 배포 주소로 변경해주자
const url = "http://127.0.0.1:8080";

module.exports = { imgPath, url };
