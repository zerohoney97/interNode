const { Show, ShowDateInfo, User, Report } = require("../models");

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

    res.redirect("/adminPage");
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
    await ShowDateInfo.update(
      {
        startDate: showStartDate,
        endDate: showEndDate,
        startTime: showStartTime,
      },
      { where: { id } }
    );
    res.redirect("/adminPage");
  } catch (error) {
    console.log(error);
  }
};

// 유저의 모든 리스트를 불러오는 함수

exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.findAll();

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// 신고된 유저를 가져오는 함수
exports.getAllReportedUsers = async (req, res) => {
  try {
    let data = await User.findAll({ include: Report });
    let newDataArray = [];
    data.forEach((a) => {
      if (a.dataValues.Reports.length != 0) {
        newDataArray.push([
          a.dataValues,
          a.dataValues.Reports.map((ele) => {
            console.log(ele.dataValues);
            return ele.dataValues;
          }),
        ]);
      }
    });
    console.log(newDataArray);
    res.json(newDataArray);
  } catch (error) {
    console.log(error);
  }
};

// 신고된 유저 제제
exports.applySanction = async (req, res) => {
  try {
    const { id, report_stack } = req.body.user;
    const reportedElementId = req.body.reportedElementId;
    await User.update({ report_stack }, { where: { id } });
    await Report.destroy({ where: { id: reportedElementId } });
    res.send("제제성공");
  } catch (error) {
    console.log(error);
  }
};
// 반려된 유저 제제
exports.noptApplySanction = async (req, res) => {
  try {
    const reportedElementId = req.body.reportedElementId;
    await Report.destroy({ where: { id: reportedElementId } });
    res.send("반려성공");
  } catch (error) {
    console.log(error);
  }
};
