const router = require("express").Router();
const { ChatLog, User } = require("../models");
const path = require("path");
const { isLoginMiddle } = require("../middleware/isLoginMiddle");
const {
  getChatLogClient,
  getChatLogAdmin,
  saveChatDataAdmin,
  getAllChats,
} = require("../controllers/chatControlloer");

router.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "chart", "rateChart.html")
  );
});

module.exports = router;
