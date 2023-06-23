const { Show, ShowDateInfo, User, Report, Sheet } = require("../models");

// 시작날짜,끝날짜 계산해서 삽입
function calculateMonthsAndDays(startDate, endDate, dateArr) {
  var date1 = new Date(startDate);
  var date2 = new Date(endDate);

  while (date1 <= date2) {
    var month = date1.getMonth() + 1; // Adding 1 because months are zero-based
    var day = date1.getDate();
    console.log(month + "-" + day);
    dateArr.push(month + "-" + day);
    date1.setDate(date1.getDate() + 1); // Move to the next day
  }
  return dateArr;
}

// 좌석 배열 정보
let gangnam = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let sejong = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

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
    let dateArr = [];
    let newDateArr = calculateMonthsAndDays(
      showStartDate,
      showEndDate,
      dateArr
    );
    newDateArr.forEach(async (a) => {
      let monthArr = a.split("-");
      if (monthArr[0].length < 2) {
        monthArr[0] = `0${monthArr[0]}`;
      }
      if (monthArr[1].length < 2) {
        monthArr[1] = `0${monthArr[1]}`;
      }
      if (theater == 1) {
        await Sheet.create({
          reservation_num: `${show.dataValues.id}_${monthArr[0] + monthArr[1]}`,
          sheets_array: JSON.stringify(gangnam),
          show_id: show.dataValues.id,
        });
      } else {
        await Sheet.create({
          reservation_num: `${show.dataValues.id}_${monthArr[0] + monthArr[1]}`,
          sheets_array: JSON.stringify(sejong),
          show_id: show.dataValues.id,
        });
      }
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
    console.log(id, "공연 id");
    // 디테일의 첫번째 배열은 상세정보,두번째 배열은 공연시간,세번째 배열은 공연의 등급이다.
    const array = [showContent, showDuration, showGrade];
    const stringArray = JSON.stringify(array);
    // 공연 업데이트
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
    // 공연 날짜 업데이트
    await ShowDateInfo.update(
      {
        startDate: showStartDate,
        endDate: showEndDate,
        startTime: showStartTime,
      },
      { where: { id } }
    );

    const show = await Show.findOne({ where: { title: showName } });
    let dateArr = [];
    let newDateArr = calculateMonthsAndDays(
      showStartDate,
      showEndDate,
      dateArr
    );
    newDateArr.forEach(async (a) => {
      let monthArr = a.split("-");
      if (monthArr[0].length < 2) {
        monthArr[0] = `0${monthArr[0]}`;
      }
      if (monthArr[1].length < 2) {
        monthArr[1] = `0${monthArr[1]}`;
      }
      if (theater == 1) {
        await Sheet.destroy({
          where: { show_id: show.dataValues.id },
        });
        await Sheet.create({
          reservation_num: `${show.dataValues.id}_${monthArr[0] + monthArr[1]}`,
          sheets_array: JSON.stringify(gangnam),
          show_id: show.dataValues.id,
        });
      } else {
        await Sheet.destroy({
          where: { show_id: show.dataValues.id },
        });
        await Sheet.create({
          reservation_num: `${show.dataValues.id}_${monthArr[0] + monthArr[1]}`,
          sheets_array: JSON.stringify(sejong),
          show_id: show.dataValues.id,
        });
      }
    });

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
// 공연 삭제
exports.deleteShow = async (req, res) => {
  try {
    const { id } = req.params;
    await Show.destroy({ where: { id } });
    res.send("삭제성공");
  } catch (error) {
    console.log(error);
  }
};
