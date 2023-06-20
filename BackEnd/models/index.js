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
  await Show.create({title:"JUMF 2023 전주얼티밋뮤직페스티벌 블라인드티켓", detail:"['특별한 뮤직 페스티벌. JUMF2023 티켓 오픈을 시작합니다!', '600', '7']", img:"show_JUMF.jpg", price: 60000, theaters_id : 1});
  await Show.create({title:"10-FEET “COLLINS” TOUR", detail:"['10-FEET 내한공연', '120', '7']", img:"show_10FEET.jpg", price: 70000, theaters_id : 2});
  await Show.create({title:"연극 〈폭풍의 언덕〉", detail:"['빛나는 감수성, 서정적이며 강렬한 필치 영문학을 대표하는 세기의 명작 <폭풍의 언덕>. 탄탄한 고전 작품을 새롭게 재해석하며 오늘을 살고 있는 모두에게 묵직할 울림을 던질 클래식 레퍼토리! 연극 <폭풍의 언덕>으로 새롭게 찾아온다.', '125', '12']", img:"show_Wuthering_Heights.jpg", price: 60000, theaters_id : 1});
  await Show.create({title:"[빛의시어터] 달리 얼리버드 1차", detail:"['최고의 기술, 압도적 스케일. 몰입형 예술 전시 빛의 시어터. 글로벌 몰입형 예술 전시 서울 상륙! 거장들의 예술 작품부터 컨템포러리 미디어 아트까지!', '50', '0']", img:"show_DALI.jpg", price: 23000, theaters_id : 2});
  await Show.create({title:"2023 펭수 펭미팅 <20세기 펭수 – 우리의 네 번째 여름>", detail:"['모든 것이 눈 깜짝할 사이에 변화하던 격동의 세기. 무엇이든 상상할 수 있었던 낭만의 시절. 새로운 밀레니엄에 대한 기대로 두근대던 그 때, 함께하는 네 번째 여름 위에 기록하는 우리의 이야기. 그 시절의 너와 나는 어떤 모습이었을까? 20세기에서 기다리고 있을게!', '90', '7']", img:"show_peng.jpg", price: 88000, theaters_id : 1});
  await Show.create({title:"2023 김영민 FANMEETING: THE NEXT", detail:"['함께 하기에 모든 순간이 빛날 김영민의 다음, 그의 다음을 함께할 여러분을 초대합니다.', '80', '8']", img:"show_Kim.jpg", price: 88000, theaters_id : 2});
  await Show.create({title:"뮤지컬 <시카고> 25주년 기념 오리지널 내한 - 부산", detail:"['뮤지컬 시카고 25주년 기념 오리지널 내한. 25년간 브로드웨이를 점령한 브로드웨이 뮤지컬 역사상 최장 공연 기록에 빛나는 미국 뮤지컬 시카고! 미 전역 투어 이후 마침내 한국에 상륙하다!', '150', '14']", img:"show_chicago.jpg", price: 110000, theaters_id : 1});
  await Show.create({title:"2023 포레스텔라 전국투어 콘서트 - The Light in Seoul", detail:"['2023 포레스텔라 콘서트 : The Light in Seoul', '150', '7']", img:"show_f.jpg", price: 132000, theaters_id : 2});
  await Show.create({title:"뮤지컬 <백작>", detail:"['무패의 군신으로 불리는 백작. 인간들을 상대로 밤에만 전투를 하고, 새벽이 되면 적장이 가장 사랑하는 사람을 인질로 잡아 포에나리성으로 퇴각한다. 백작에게 인질로 잡힌 적장의 아들 V. 태양을 가린 커튼 아래 빛의 세계와 밤의 세계가 교차한다. 기록되지 않은 포에나리 성주의 전설', '95', '13']", img:"show_v.jpg", price: 44000, theaters_id : 1});
  await Show.create({title:"2023 타임캡슐 슈퍼콘서트", detail:"['국내 최고 레트로 콘서트 브랜드 타임캡슐 슈퍼콘서트가 올해도 어김없이 찾아갑니다!', '210', '7']", img:"show_time.jpg", price: 99000, theaters_id : 2});
  await Show.create({title:"뮤지컬 〈트레이스 유〉", detail:"['대학로 소극장 뮤지컬의 흥행신화 10주년 맞아, 올 여름 대학로를 뜨겁게 달군다!매 시즌 수많은 클러버들을 만들어내며 탄탄한 마니아층을 보유한 뮤지컬 <트레이스 유>. 락 콘서트를 능가할 만큼 신나고 짜릿한 무대를 선사해 또 한번 흥행열풍을 예고한다!', '110', '13']", img:"show_Trace_U.jpg", price: 50000, theaters_id : 1});
  await Show.create({title:"쇼뮤지컬 〈드림하이〉", detail:"['KBS 2TV 드라마 원작 드림하이의 오리지널 아이덴티 X SHOW MUSICAL 새로운 형태의 DANCE PERFORMANCE!!! 그들은 10년 후에도 최고의 무대를 향한 꿈을 지켜갈 수 있을까?', '150', '8']", img:"show_dream.jpg", price: 90000, theaters_id : 2});
}

// createReport();
// createTheaters();
// createAdmin();
// createShow();
module.exports = db;
