const { Show, ShowDateInfo } = require("../models");

const culculateDay = async (
  startDateArray,
  endDateArray,
  thirtyArray,
  thirtyoneArray,
  February,
  repeatNum,
  show,
  showStartTime
) => {
  // 월의 차이
  console.log(startDateArray[1], "시작");

  const monthSub = parseInt(endDateArray[1]) - parseInt(startDateArray[1]);
  let intMonth = parseInt(startDateArray[1]);
  let startDay = parseInt(startDateArray[2]);
  let endDay = parseInt(endDateArray[2]);
  if (monthSub != 0) {
    // 만약 월의 차이가 0이 아닌 경우, 그 공연은 다음 월로 넘어간다는 차이를 계산한다.
    if (thirtyArray.indexOf(intMonth) != -1) {
      // 시작 날짜(한 번 반복 후에는 1로 고정)에서 전체 날짜를 빼서 반복횟수를 정한다.
      repeatNum += 30 - startDay + 1;
      for (let index = startDay; index < 31; index++) {
        // 반복횟수 만큼 반복시켜 년월일을 넣는다.
      await ShowDateInfo.create({
          year: startDateArray[0],
          month: startDateArray[1],
          day: index,
          startTime: showStartTime,
          show_id: show.dataValues.id,
        });
      }

      // 월은 다음달로 넘어가야 하고, 1일부터 시작이므로 바꿔준다.
      startDateArray[1] = intMonth + 1;
      startDateArray[2] = 1;
    } else if (thirtyoneArray.indexOf(startDateArray[1]) != -1) {
      // 시작 날짜(한 번 반복 후에는 1로 고정)에서 전체 날짜를 빼서 반복횟수를 정한다.
      repeatNum += 31 - startDay + 1;
      for (let index = startDay; index < 32; index++) {
        // 반복횟수 만큼 반복시켜 년월일을 넣는다.
        await ShowDateInfo.create({
          year: startDateArray[0],
          month: startDateArray[1],
          day: index,
          startTime: showStartTime,
          show_id: show.dataValues.id,
        });
      }

      // 월은 다음달로 넘어가야 하고, 1일부터 시작이므로 바꿔준다.
      startDateArray[1] = intMonth + 1;
      startDateArray[2] = 1;
    } else {
      // 시작 날짜(한 번 반복 후에는 1로 고정)에서 전체 날짜를 빼서 반복횟수를 정한다.
      repeatNum += 28 - startDay + 1;
      for (let index = startDay; index < 29; index++) {
        // 반복횟수 만큼 반복시켜 년월일을 넣는다.
        await ShowDateInfo.create({
          year: startDateArray[0],
          month: startDateArray[1],
          day: index,
          startTime: showStartTime,
          show_id: show.dataValues.id,
        });
      }

      // 월은 다음달로 넘어가야 하고, 1일부터 시작이므로 바꿔준다.
      startDateArray[1] = intMonth + 1;
      startDateArray[2] = 1;
    }
    culculateDay(
      startDateArray,
      endDateArray,
      thirtyArray,
      thirtyoneArray,
      February,
      repeatNum,
      show,
      showStartTime
    );
  } else {
    for (let index = startDay; index < endDay - startDay + 1; index++) {
      // 반복횟수 만큼 반복시켜 년월일을 넣는다.
      console.log(intMonth,'4')
      await ShowDateInfo.create({
        year: startDateArray[0],
        month: startDateArray[1],
        day: index,
        startTime: showStartTime,
        show_id: show.dataValues.id,
      });
    }

    return;
  }
};

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
    console.log(showStartDate, "시작 날짜");
    // 0000-00-00 형식이므로 데이터 형식을 split으로 잘라내어 각 연월일을 확인
    const startDateArray = showStartDate.split("-");
    const endDateArray = showEndDate.split("-");
    // 월의 계산을 위해, 31,30,28일 을 가진 월을 배열로 둠
    const thirtyArray = [4, 6, 9, 11];
    const thirtyoneArray = [1, 3, 5, 7, 8, 10, 12];
    const February = [2];
    // 일의 차이

    const show = await Show.findOne({ where: { title: showName } });
    // 월,일을 계산해서 mysql에 넣어주는 함수
    await culculateDay(
      startDateArray,
      endDateArray,
      thirtyArray,
      thirtyoneArray,
      February,
      0,
      show,
      showStartTime
    );
    res.redirect(
      "http://127.0.0.1:5500/FrontEnd/zerohoneyHTML/adminPage/showControll.html"
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getShow = async (req, res) => {
  try {
    const showList = await Show.findAll({ where: { id: 1 } });
    // console.log(showList);
    res.json(showList);
  } catch (error) {
    console.log(error);
  }
};
