const { Show, ShowDateInfo } = require("../models");

// 공연 등록하기
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
      theater,
    } = req.body;
    const { filename } = req.file;
    console.log(theater);
    // 디테일의 첫번째 배열은 상세정보,두번째 배열은 공연시간,세번째 배열은 공연의 등급이다.
    const array = [showContent, showDuration, showGrade];
    const stringArray = JSON.stringify(array);
    await Show.create({
      title: showName,
      detail: stringArray,
      img: filename,
      price: showPrice,
      theaters_id: theater,
    });
    console.log(showStartDate, "시작 날짜");

    const show = await Show.findOne({ where: { title: showName } });
    await ShowDateInfo.create({
      startDate: showStartDate,
      endDate: showEndDate,
      startTime: showStartTime,
      show_id: show.dataValues.id,
    });

    res.redirect(
      "http://127.0.0.1:5500/FrontEnd/zerohoneyHTML/adminPage/showControll.html"
    );
  } catch (error) {
    console.log(error);
  }
};

// 모든 공연 가져오기
exports.getShow = async (req, res) => {
  try {
    const showList = await Show.findAll();
    // console.log(showList);
    res.json(showList);
  } catch (error) {
    console.log(error);
  }
};

// 공연 업데이트
exports.updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      showName,
      showContent,
      showPrice,
      showGrade,
      showDuration,
      showStartDate,
      showEndDate,
      showStartTime,
      theater,
    } = req.body;
    const { filename } = req.file;
    console.log(theater);
    // 디테일의 첫번째 배열은 상세정보,두번째 배열은 공연시간,세번째 배열은 공연의 등급이다.
    const array = [showContent, showDuration, showGrade];
    const stringArray = JSON.stringify(array);
    await Show.update(
      {
        title: showName,
        detail: stringArray,
        img: filename,
        price: showPrice,
        theaters_id: theater,
      },
      { where: { id } }
    );
    console.log(showStartDate, "시작 날짜");
    await ShowDateInfo.update({
      startDate: showStartDate,
      endDate: showEndDate,
      startTime: showStartTime,
    },{where:{id}});
    res.redirect(
      "http://127.0.0.1:5500/FrontEnd/zerohoneyHTML/adminPage/showControll.html"
    );
  } catch (error) {
    console.log(error);
  }
};
