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
  const admin = await User.findOne({email : "admin@admin.com"});
  if (admin == null) {
    const hash = bcrypt.hashSync("admin1234", 10);
    await User.create({email : "admin@admin.com", password : hash, nickname : "admin"});
  }
}
createAdmin();

module.exports = db;
