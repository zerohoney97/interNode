const { Show } = require("../models");

exports.enrollShow = async (req, res) => {
  try {
    const {
      showName,
      showContent,
      showPrice,
      showGrade,
      showDuration,
      showStartDate,
      showEndDate,
      showStartTime,
    } = req.body;
    console.log(showContent, showName, "dddasdsa");
    const { filename } = req.file;
    // 디테일의 첫번째 배열은 상세정보,두번째 배열은 공연시간,세번째 배열은 공연의 등급이다.
    const array = [showContent, showDuration, showGrade];
    const stringArray = JSON.stringify(array);
    await Show.create({
      title: showName,
      detail: stringArray,
      img: filename,
      price: showPrice,
    });

    const show = await Show.findOne({ where: { showName } });
    console.log(show);
    res.redirect(
      "http://127.0.0.1:5500/FrontEnd/zerohoneyHTML/adminPage/showControll.html"
    );
  } catch (error) {
    console.log(error);
  }
};
