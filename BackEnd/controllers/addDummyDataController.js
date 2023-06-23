const {
  User,
  Theater,
  FreeBoard,
  Comment,
  Recomment,
  Sheet,
  Show,
  ShowDateInfo,
  ChatLog,
  FreeBoardLike,
  Report,
  ReservedList,
  ReviewBoard,
  ReviewBoardLike,
  sequelize,
} = require("../models");
const bcrypt = require("bcrypt");

// 관리자 계정 없으면 생성
const createAdmin = async () => {
  const admin = await User.findOne({ where: { email: "admin@admin.com" } });
  if (admin == null) {
    const hash = bcrypt.hashSync("admin1234", 10);
    await User.create({
      email: "admin@admin.com",
      password: hash,
      nickname: "admin",
    });
  }
};

// 공연장 두개 생성
const createTheaters = async () => {
  await Theater.create({
    name: "강남 예술의 전당",
    location: "강남",
  });
  await Theater.create({
    name: "세종 문화회관",
    location: "세종",
  });
};

// 신고테이블 임의 생성
const createReport = async () => {
  await Report.create({
    type: "자유 게시판",
    typeId: 1,
    title: "심한 말 나쁜 말",
    content: "알고보니 더 심한말",
    user_id: 2,
  });
};

// 공연 12개 생성
const createShow = async () => {
  await Show.create({
    title: "BENEE (베니) 첫 내한 공연",
    detail:
      '["강렬한 에너지와 매력 넘치는 목소리 현재 세계 팝 시장이 주목하는 가장 흥미롭고 카리스마 넘치는 뉴질랜드 싱어송라이터", "70", "12"]',
    img: "show_benee.jpg",
    price: 60000,
    theaters_id: 1,
  });
  await Show.create({
    title: "2023 박창근 콘서트 [우리들 꿈에 관한 이야기]",
    detail:
      '["쉼없이 달려왔던 지난날들, 별것 아닌것 같았던 하루도 우리에겐 충분히 가치가 있습니다 우리는 언제나 꿈을 향해 달려가고 있을테니까요", "120", "7"]',
    img: "show_parkchangguen.jpg",
    price: 70000,
    theaters_id: 2,
  });
  await Show.create({
    title: "2023 포레스텔라 전국투어 콘서트 - The Light in Seoul",
    detail: '["2023 포레스텔라 콘서트 : The Light in Seoul", "150", "7"]',
    img: "show_f.jpg",
    price: 132000,
    theaters_id: 2,
  });
  await Show.create({
    title: "뮤지컬 〈비스티〉",
    detail:
      '["시끄러운 도시의 소음, 서울의 밤거리 클랙슨 소리가 사방에 퍼진 적들처럼 쏟아지면, 개츠비의 간판이 켜진다", "130", "14"]',
    img: "show_beasty.jpg",
    price: 60000,
    theaters_id: 1,
  });
  await Show.create({
    title: "Soundberry Festa'23",
    detail:
      '["달콤한 너와 시원한 내가 만나는 우리들의 여름 이야기 뜨거운 열기 가득한 한 여름날, 음악의 파도를 타고 새롭게 써내려갈 우리들의 이야기가 시작됩니다", "540", "7"]',
    img: "show_soundberry.jpg",
    price: 23000,
    theaters_id: 2,
  });
  await Show.create({
    title: "KB국민카드 스타샵 X 2023 인천펜타포트락페스티벌",
    detail:
      '["펜타포트 공식 셔틀버스 꽃가마와 대중교통으로 찾아오실 수 있습니다", "228", "0"]',
    img: "show_incheonrock.jpg",
    price: 88000,
    theaters_id: 1,
  });
  await Show.create({
    title: "2023 이승철 전국투어 콘서트: RETRO Night ",
    detail:
      '["새로운 입체 음향 사운드를 통해 탁월한 현장감과 공간감을 느낄 수 있습니다. 이승철 레코딩 스튜디오의 운영 노하우를 통해 얻어낸 기술로 이승철 콘서트 팀만이 제공합니다.", "80", "8"]',
    img: "show_leeSC.jpg",
    price: 88000,
    theaters_id: 2,
  });
  // 이승철 콘서트까지 포함 위에  7개 공연은 swipe에 들어가는 공연들입니다.↑↑↑↑
  await Show.create({
    title: "메가필드뮤직페스티벌 2023",
    detail:
      '["보라미유,홍이삭,이솔로몬,하현상,하동균,박원,로이킴,볼빨간사춘기,HoooW,제이유나,이병찬,솔루션스,아일,이무진,존박,김필,적재,NELL", "150", "14"]',
    img: "show_megafield.jpg",
    price: 110000,
    theaters_id: 1,
  });
  // 메가필드뮤직페스티벌 2023 은 main페이지 오늘의 추천에 필요한 공연입니다 ↑↑↑↑
  await Show.create({
    title: "뮤지컬 <백작>",
    detail:
      '["무패의 군신으로 불리는 백작. 인간들을 상대로 밤에만 전투를 하고, 새벽이 되면 적장이 가장 사랑하는 사람을 인질로 잡아 포에나리성으로 퇴각한다. 백작에게 인질로 잡힌 적장의 아들 V. 태양을 가린 커튼 아래 빛의 세계와 밤의 세계가 교차한다. 기록되지 않은 포에나리 성주의 전설", "95", "13"]',
    img: "show_v.jpg",
    price: 44000,
    theaters_id: 1,
  });
  await Show.create({
    title: "2023 타임캡슐 슈퍼콘서트",
    detail:
      '["국내 최고 레트로 콘서트 브랜드 타임캡슐 슈퍼콘서트가 올해도 어김없이 찾아갑니다!", "210", "7"]',
    img: "show_time.jpg",
    price: 99000,
    theaters_id: 2,
  });
  await Show.create({
    title: "뮤지컬 〈트레이스 유〉",
    detail:
      '["대학로 소극장 뮤지컬의 흥행신화 10주년 맞아, 올 여름 대학로를 뜨겁게 달군다!매 시즌 수많은 클러버들을 만들어내며 탄탄한 마니아층을 보유한 뮤지컬 <트레이스 유>. 락 콘서트를 능가할 만큼 신나고 짜릿한 무대를 선사해 또 한번 흥행열풍을 예고한다!", "110", "13"]',
    img: "show_Trace_U.jpg",
    price: 50000,
    theaters_id: 1,
  });
  await Show.create({
    title: "쇼뮤지컬 〈드림하이〉",
    detail:
      '["KBS 2TV 드라마 원작 드림하이의 오리지널 아이덴티 X SHOW MUSICAL 새로운 형태의 DANCE PERFORMANCE!!! 그들은 10년 후에도 최고의 무대를 향한 꿈을 지켜갈 수 있을까?", "150", "8"]',
    img: "show_dream.jpg",
    price: 90000,
    theaters_id: 2,
  });
};

// 공연 12개에 대한 임의의 날짜,시작 시간 설정
const createShowDate = async () => {
  await ShowDateInfo.create({
    startDate: "2023-06-21",
    endDate: "2023-07-21",
    startTime: "21:00",
    show_id: 1,
  });
  await ShowDateInfo.create({
    startDate: "2023-03-12",
    endDate: "2023-04-01",
    startTime: "15:00",
    show_id: 2,
  });
  await ShowDateInfo.create({
    startDate: "2023-07-12",
    endDate: "2023-08-01",
    startTime: "21:00",
    show_id: 3,
  });
  await ShowDateInfo.create({
    startDate: "2023-04-23",
    endDate: "2023-05-05",
    startTime: "12:30",
    show_id: 4,
  });
  await ShowDateInfo.create({
    startDate: "2023-03-20",
    endDate: "2023-04-10",
    startTime: "14:00",
    show_id: 5,
  });
  await ShowDateInfo.create({
    startDate: "2023-09-01",
    endDate: "2023-10-01",
    startTime: "18:00",
    show_id: 6,
  });
  await ShowDateInfo.create({
    startDate: "2023-11-02",
    endDate: "2023-12-02",
    startTime: "19:00",
    show_id: 7,
  });
  await ShowDateInfo.create({
    startDate: "2023-07-11",
    endDate: "2023-07-18",
    startTime: "14:30",
    show_id: 8,
  });
  await ShowDateInfo.create({
    startDate: "2023-01-01",
    endDate: "2023-02-04",
    startTime: "17:00",
    show_id: 9,
  });
  await ShowDateInfo.create({
    startDate: "2023-04-03",
    endDate: "2023-05-05",
    startTime: "20:00",
    show_id: 10,
  });
  await ShowDateInfo.create({
    startDate: "2023-09-08",
    endDate: "2023-09-20",
    startTime: "21:00",
    show_id: 11,
  });
  await ShowDateInfo.create({
    startDate: "2023-02-21",
    endDate: "2023-03-04",
    startTime: "09:00",
    show_id: 12,
  });
};

// 공연에 대한 자리 삽입

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
// 시작날짜,끝날짜 계산해서 삽입
function calculateMonthsAndDays(startDate, endDate) {
  let dateArr = [];

  var date1 = new Date(startDate);
  var date2 = new Date(endDate);

  while (date1 <= date2) {
    var month = date1.getMonth() + 1; // Adding 1 because months are zero-based
    var day = date1.getDate();
    dateArr.push(month + "-" + day);
    date1.setDate(date1.getDate() + 1); // Move to the next day
  }
  console.log(dateArr, "또 반복");
  let resultArr = dateArr.map((a) => {
    let monthArr = a.split("-");
    if (monthArr[0].length < 2) {
      monthArr[0] = `0${monthArr[0]}`;
    }
    if (monthArr[1].length < 2) {
      monthArr[1] = `0${monthArr[1]}`;
    }
    return monthArr[0] + monthArr[1];
  });
  return resultArr;
}

const createSheets = async () => {
  let show1 = calculateMonthsAndDays("2023-06-21", "2023-07-21");
  let show2 = calculateMonthsAndDays("2023-03-12", "2023-04-01");
  let show3 = calculateMonthsAndDays("2023-07-12", "2023-08-01");
  let show4 = calculateMonthsAndDays("2023-04-23", "2023-05-05");
  let show5 = calculateMonthsAndDays("2023-03-20", "2023-04-10");
  let show6 = calculateMonthsAndDays("2023-09-01", "2023-10-01");
  let show7 = calculateMonthsAndDays("2023-11-02", "2023-12-02");
  let show8 = calculateMonthsAndDays("2023-07-11", "2023-07-18");
  let show9 = calculateMonthsAndDays("2023-01-01", "2023-02-04");
  let show10 = calculateMonthsAndDays("2023-04-03", "2023-05-05");
  let show11 = calculateMonthsAndDays("2023-09-08", "2023-09-20");
  let show12 = calculateMonthsAndDays("2023-02-21", "2023-03-04");
  // console.log(show9)
  show1.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `1_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 1,
    });
  });
  show2.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `2_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 2,
    });
  });
  show3.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `3_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 3,
    });
  });
  show4.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `4_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 4,
    });
  });
  show5.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `5_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 5,
    });
  });
  show6.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `6_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 6,
    });
  });
  show7.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `7_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 7,
    });
  });
  show8.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `8_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 8,
    });
  });
  show9.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `9_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 9,
    });
  });
  show10.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `10_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 10,
    });
  });
  show11.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `11_${a}`,
      sheets_array: JSON.stringify(gangnam),
      show_id: 11,
    });
  });
  show12.forEach(async (a) => {
    await Sheet.create({
      reservation_num: `12_${a}`,
      sheets_array: JSON.stringify(sejong),
      show_id: 12,
    });
  });
};

// freeboard 2개
const createFreeBoard = async () => {
  await FreeBoard.create({
    title: "안녕하세요",
    content: "첫글첫글",
    user_id: 2,
  });

  await FreeBoard.create({
    title: "솔직히 포레스트가 그정돈가?",
    content: "1등까진 아닌듯;;",
    views:5,
    user_id: 3,
  });

  await FreeBoard.create({
    title: "사이트 예쁘네 ㄷㄷ",
    content: "누가 만듦?",
    views:6,
    user_id: 2,
  });

  await FreeBoard.create({
    title: "공연 추천 점 해주세염",
    content: "싼걸로 ㄱㄱ",
    user_id: 3,
  });

  await FreeBoard.create({
    title: "이 사이트 좀 거품인듯;;;",
    content: "언빌리 '버블'",
    user_id: 2,
  });

  await FreeBoard.create({
    title: "이 사이트 개발자는 여름에 에어컨을 키지 않는다.",
    content: "'더 위'가 없기 때문....",
    user_id: 3,
  });

  await FreeBoard.create({
    title: "이거 제작한 회사 다녀왔는데요...",
    content: "이무...헌??대리님?? 좀 잘생기신듯...",
    user_id: 2,
  });

  await FreeBoard.create({
    title: "롤 할 사람",
    content: "유도미도미 친추 ㄱㄱ",
    user_id: 3,
  });

  await FreeBoard.create({
    title: "박창근이 여기 나올 정돈가...?",
    content: "흠....",
    user_id: 2,
  });

  await FreeBoard.create({
    title: "경일 아카데미 저번에 갔었는데...(소름주의)",
    content: "이순현...교수님??? 좀 잘생기신것 같음;;;",
    user_id: 3,
  });
};

//comment 2개
const createComment = async () => {
  await Comment.create({
    content: "??병먹금",
    user_id: "2",
    freeboard_id: "2",
  });

  await Comment.create({
    content: "이무헌 김아현 박민우 신근호 그들은 신이야!",
    user_id: "3",
    freeboard_id: "3",
  });
};

// recomment 2개
const createReComment = async () => {
  await Recomment.create({
    content: "알바네 ㅋㅋㅋ",
    user_id: "3",
    comment_id: "1",
  });

  await Recomment.create({
    content: "얘 여기서도 이러네 ㅋㅋㅋㅋ",
    user_id: "2",
    comment_id: "2",
  });
};
// 더미 유저 생성 함수
const createUser = async () => {
  const user1 = await User.findOne({
    where: { email: "zerohoney97@gmail.com" },
  });
  if (user1 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "zerohoney97@gmail.com",
      password: hash,
      nickname: "zero",
    });
  }
  const user2 = await User.findOne({
    where: { email: "2coco97@naver.com" },
  });
  if (user2 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97@naver.com",
      password: hash,
      nickname: "mumu",
    });
  }
  const user3 = await User.findOne({
    where: { email: "2coco97003@naver.com" },
  });
  if (user3 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97003@naver.com",
      password: hash,
      nickname: "무무",
    });
  }
  const user4 = await User.findOne({
    where: { email: "2coco97004@naver.com" },
  });
  if (user4 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97004@naver.com",
      password: hash,
      nickname: "소니",
    });
  }
  const user5 = await User.findOne({
    where: { email: "2coco97005@naver.com" },
  });
  if (user5 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97005@naver.com",
      password: hash,
      nickname: "삼성",
    });
  }
  const user6 = await User.findOne({
    where: { email: "2coco97006@naver.com" },
  });
  if (user6 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97006@naver.com",
      password: hash,
      nickname: "커피",
    });
  }
  const user7 = await User.findOne({
    where: { email: "2coco97007@naver.com" },
  });
  if (user7 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97007@naver.com",
      password: hash,
      nickname: "메가",
    });
  }
  const user8 = await User.findOne({
    where: { email: "2coco97008@naver.com" },
  });
  if (user8 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97008@naver.com",
      password: hash,
      nickname: "셔츠",
    });
  }
  const user9 = await User.findOne({
    where: { email: "2coco97009@naver.com" },
  });
  if (user9 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97009@naver.com",
      password: hash,
      nickname: "아메리카노",
    });
  }
  const user10 = await User.findOne({
    where: { email: "2coco97010@naver.com" },
  });
  if (user10 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97010@naver.com",
      password: hash,
      nickname: "텀블러",
    });
  }
  const user11 = await User.findOne({
    where: { email: "2coco97011@naver.com" },
  });
  if (user10 == null) {
    const hash = bcrypt.hashSync("q1w2e3R$", 10);
    await User.create({
      email: "2coco97011@naver.com",
      password: hash,
      nickname: "자유시간",
    });
  }
};

// 리뷰보드 생성
const createReviewBoard = async () => {
  await ReviewBoard.create({user_id : 10, show_id : 1, content : "재밌었어요!!", rates : 5});
  await ReviewBoard.create({user_id : 11, show_id : 1, content : "좋았음", rates : 4});
  await ReviewBoard.create({user_id : 12, show_id : 1, content : "ㄱㅊㄱㅊ", rates : 3});
  await ReviewBoard.create({user_id : 5, show_id : 1, content : "좋았어요", rates : 4});
  await ReviewBoard.create({user_id : 6, show_id : 1, content : "무난", rates : 2});
  await ReviewBoard.create({user_id : 7, show_id : 1, content : "ㅂㄹ", rates : 1});
  await ReviewBoard.create({user_id : 8, show_id : 1, content : "나쁘지 않았음", rates : 3});
  await ReviewBoard.create({user_id : 9, show_id : 1, content : "재밌었어요", rates : 5});

  await ReviewBoard.create({user_id : 10, show_id : 2, content : "제 취향은 아니었는데도 좋았어요", rates : 4});
  await ReviewBoard.create({user_id : 11, show_id : 2, content : "무난무난", rates : 2});
  await ReviewBoard.create({user_id : 12, show_id : 2, content : "취향아님ㅜㅜ", rates : 1});
  await ReviewBoard.create({user_id : 5, show_id : 2, content : "좋았어요", rates : 5});
  await ReviewBoard.create({user_id : 6, show_id : 2, content : "ㅂㄹ", rates : 2});
  await ReviewBoard.create({user_id : 7, show_id : 2, content : "ㅂㄹ", rates : 1});
  await ReviewBoard.create({user_id : 8, show_id : 2, content : "취향갈릴듯", rates : 2});
  await ReviewBoard.create({user_id : 9, show_id : 2, content : "재밌었어요", rates : 5});

  await ReviewBoard.create({user_id : 10, show_id : 3, content : "굿", rates : 4});
  await ReviewBoard.create({user_id : 11, show_id : 3, content : "좋았어요", rates : 5});
  await ReviewBoard.create({user_id : 12, show_id : 3, content : "즐거웠어요~", rates : 5});
  await ReviewBoard.create({user_id : 5, show_id : 3, content : "ㅜㅜ 최고", rates : 5});
  await ReviewBoard.create({user_id : 6, show_id : 3, content : "재밌었음", rates : 5});
  await ReviewBoard.create({user_id : 7, show_id : 3, content : "좋았어요", rates : 5});
  await ReviewBoard.create({user_id : 8, show_id : 3, content : "좋아요", rates : 3});
  await ReviewBoard.create({user_id : 9, show_id : 3, content : "재밌었어요", rates : 5});

  await ReviewBoard.create({user_id : 10, show_id : 4, content : "힐링", rates : 4});
  await ReviewBoard.create({user_id : 11, show_id : 4, content : "추천추천", rates : 5});
  await ReviewBoard.create({user_id : 12, show_id : 4, content : "나쁘지 않았음", rates : 3});
  await ReviewBoard.create({user_id : 5, show_id : 4, content : "지루했음", rates : 2});
  await ReviewBoard.create({user_id : 6, show_id : 4, content : "재밌었음", rates : 5});
  await ReviewBoard.create({user_id : 7, show_id : 4, content : "좋았어요", rates : 4});
  await ReviewBoard.create({user_id : 8, show_id : 4, content : "좋아요", rates : 3});
  await ReviewBoard.create({user_id : 9, show_id : 4, content : "재밌었어요", rates : 5});

  await ReviewBoard.create({user_id : 10, show_id : 5, content : "무난~~~", rates : 4});
  await ReviewBoard.create({user_id : 11, show_id : 5, content : "좋았어요", rates : 4});
  await ReviewBoard.create({user_id : 12, show_id : 5, content : "즐거웠어요~", rates : 5});
  await ReviewBoard.create({user_id : 5, show_id : 5, content : "좋아여 추천", rates : 5});
  await ReviewBoard.create({user_id : 6, show_id : 5, content : "재밌었음", rates : 4});
  await ReviewBoard.create({user_id : 7, show_id : 5, content : "좋았어요", rates : 4});
  await ReviewBoard.create({user_id : 8, show_id : 5, content : "좋아요", rates : 3});
  await ReviewBoard.create({user_id : 9, show_id : 5, content : "재밌었어요", rates : 5});
}

// 리뷰보드 좋아요 생성
const createReviewBoardLike = async () => {
  await ReviewBoardLike.create({reviewboard_id : 1, user_id : 3});
  await ReviewBoardLike.create({reviewboard_id : 1, user_id : 4});
  await ReviewBoardLike.create({reviewboard_id : 1, user_id : 8});

  await ReviewBoardLike.create({reviewboard_id : 10, user_id : 7});
  await ReviewBoardLike.create({reviewboard_id : 10, user_id : 4});
  await ReviewBoardLike.create({reviewboard_id : 11, user_id : 5});
  await ReviewBoardLike.create({reviewboard_id : 10, user_id : 8});

  await ReviewBoardLike.create({reviewboard_id : 18, user_id : 7});
  await ReviewBoardLike.create({reviewboard_id : 19, user_id : 4});
  await ReviewBoardLike.create({reviewboard_id : 19, user_id : 5});
  await ReviewBoardLike.create({reviewboard_id : 20, user_id : 8});

  await ReviewBoardLike.create({reviewboard_id : 26, user_id : 7});
  await ReviewBoardLike.create({reviewboard_id : 26, user_id : 4});
  await ReviewBoardLike.create({reviewboard_id : 29, user_id : 5});
  await ReviewBoardLike.create({reviewboard_id : 28, user_id : 8});

  await ReviewBoardLike.create({reviewboard_id : 35, user_id : 7});
  await ReviewBoardLike.create({reviewboard_id : 35, user_id : 4});
  await ReviewBoardLike.create({reviewboard_id : 36, user_id : 5});
  await ReviewBoardLike.create({reviewboard_id : 36, user_id : 8});

}

exports.createAdmin = (req, res) => {
  try {
    createAdmin();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createUser = (req, res) => {
  try {
    createUser();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createShow = (req, res) => {
  try {
    createShow();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createShowDateInfo = (req, res) => {
  try {
    createShowDate();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createTheaters = (req, res) => {
  try {
    createTheaters();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createSheets = (req, res) => {
  try {
    createSheets();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createFreeBoards = (req, res) => {
  try {
    createFreeBoard();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createComments = (req, res) => {
  try {
    createComment();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createRecomments = (req, res) => {
  try {
    createReComment();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
};
exports.createReviewBoards = (req, res) => {
  try {
    createReviewBoard();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
}
exports.createReviewBoardLikes = (req, res) => {
  try {
    createReviewBoardLike();
    res.send("성공");
  } catch (error) {
    console.log(error);
  }
}