const {
  createAdmin,
  createComments,
  createFreeBoards,
  createRecomments,
  createSheets,
  createShow,
  createShowDateInfo,
  createTheaters,
  createUser,
} = require("../controllers/addDummyDataController");
const path = require("path");

const router = require("express").Router();
router.get("/main", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "FrontEnd", "addDummyData.html")
  );
});

router.post("/a", createAdmin);
router.post("/b", createUser);
router.post("/c", createTheaters);
router.post("/d", createShow);
router.post("/e", createShowDateInfo);
router.post("/f", createSheets);
router.post("/g", createFreeBoards);
router.post("/h", createComments);
router.post("/i", createRecomments);

module.exports = router;
