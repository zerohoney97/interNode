const router = require("express").Router();
const path = require("path");
const { isLoginMiddle } = require("../middleware/isLoginMiddle");
const { showList, rateShowList } = require('../controllers/mainController');

router.get("/", isLoginMiddle, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "mainpage", "mainpage.html")
  );
});

// 전체 공연 정보 반환
router.get("/showList", showList);

// 평점순 공연 정보 반환
router.get("/rateShowList", rateShowList);
