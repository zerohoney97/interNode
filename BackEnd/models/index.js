const Sequelize = require("sequelize");
const config = require("../config");
const ChatLog = require("./chatlogs");
const Comment = require("./comments");
const FreeBoardLike = require("./freeBoardLike");
const FreeBoard = require("./freeBoards");
const Recomment = require("./recomments");
const Report = require("./reports");
const ReservedList = require("./reservedlist");
const ReviewBoardLike = require("./reviewBoardLike");
const ReviewBoard = require("./reviewBoards");
const Sheet = require("./sheet");
const ShowDateInfo = require("./showDateInfo");
const Show = require("./shows");
const User = require("./users");
const Theater = require("./theaters");

const bcrypt = require("bcrypt");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  config.dev
);

const db = {};
db.sequelize = sequelize;
db.User = User;
db.ChatLog = ChatLog;
db.Comment = Comment;
db.FreeBoard = FreeBoard;
db.FreeBoardLike = FreeBoardLike;
db.Recomment = Recomment;
db.Report = Report;
db.ReservedList = ReservedList;
db.ReviewBoardLike = ReviewBoardLike;
db.ReviewBoard = ReviewBoard;
db.Sheet = Sheet;
db.ShowDateInfo = ShowDateInfo;
db.Show = Show;
db.Theater = Theater;

User.init(sequelize);

ChatLog.init(sequelize);

Comment.init(sequelize);

FreeBoard.init(sequelize);

FreeBoardLike.init(sequelize);

Recomment.init(sequelize);

Report.init(sequelize);

ReservedList.init(sequelize);

ReviewBoardLike.init(sequelize);

ReviewBoard.init(sequelize);

Sheet.init(sequelize);

ShowDateInfo.init(sequelize);

Show.init(sequelize);

Theater.init(sequelize);

User.associate(db);
ChatLog.associate(db);
Comment.associate(db);
FreeBoard.associate(db);
FreeBoardLike.associate(db);
Recomment.associate(db);
Report.associate(db);
ReservedList.associate(db);
ReviewBoardLike.associate(db);
ReviewBoard.associate(db);
Sheet.associate(db);
ShowDateInfo.associate(db);
Show.associate(db);
Theater.associate(db);

// 관리자 계정 없으면 생성
const createAdmin = async () => {
  const admin = await User.findOne({ email: "admin@admin.com" });
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
    detail: '["쉼없이 달려왔던 지난날들, 별것 아닌것 같았던 하루도 우리에겐 충분히 가치가 있습니다 우리는 언제나 꿈을 향해 달려가고 있을테니까요", "120", "7"]',
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
    startDate: "2023-03-21",
    endDate: "2023-04-25",
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
    endDate: "2023-06-12",
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
    endDate: "2023-12-20",
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
    endDate: "2023-06-02",
    startTime: "20:00",
    show_id: 10,
  });
  await ShowDateInfo.create({
    startDate: "2023-09-08",
    endDate: "2023-12-25",
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





// 주의~~!! 본 정적 데이터는 외래키로 인하여 순서대로 실행 하여함. 만약 순서대로 실행을 안 한다면 테이블을 지우고 다시 하기 바람.
// **1**
// createAdmin();
// **2**
// createTheaters();
// **3**
// createShow();
// **4**
// createShowDate();

// 회원가입 후에 진행
// createReport();
module.exports = db;
