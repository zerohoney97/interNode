const {
  User,
  ReservedList,
  Show,
  ReviewBoard,
  sequelize,
  ReviewBoardLike,
} = require("../models");
const bcrypt = require("bcrypt");

// 유저 정보 반환
exports.getUserInfo = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const user = await User.findOne({ where: { id: primaryKey } });
    // 예매내역 개수 반환
    const reservedLength = await ReservedList.count({
      where: { user_id: primaryKey },
    });
    return res.json({
      email: user.dataValues.email,
      nickname: user.dataValues.nickname,
      img: user.dataValues.img,
      reservedLength,
    });
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 닉네임 변경
exports.changeNickName = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const { nickname } = req.body;

    // 닉네임 변경
    await User.update({ nickname: nickname }, { where: { id: primaryKey } });

    // 성공
    return res.json({ result: "0", nickname });
  } catch (error) {
    console.log(error);
    return res.json({ result: "1" });
  }
};

// 비밀번호 변경
exports.changePassword = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const { password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    // 비밀번호 변경
    await User.update({ password: hash }, { where: { id: primaryKey } });

    // 성공
    return res.send("0");
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 프로필 이미지 변경
exports.changeImg = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const { file } = req;

    await User.update({ img: file.filename }, { where: { id: primaryKey } });

    return res.send("0");
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 유저의 예매내역 반환
exports.getUserReservedList = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;

    // 예매내역=>where부분에 돈을 냈는지 판별하는 pay추가
    let reservedList = await ReservedList.findAll({
      where: { user_id: primaryKey },
      include: [{ model: Show }],
    });

    // 후기
    const reviewBoard = await ReviewBoard.findAll({
      where: { user_id: primaryKey },
      include: [
        {
          model: ReviewBoardLike,
          required: false,
        },
        {
          model: User,
          attributes: ["nickname", "img"],
        },
      ],
      attributes: {
        // 후기 좋아요 개수 - likes
        include: [
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM reviewBoardLikes WHERE reviewBoardLikes.reviewboard_id = ReviewBoard.id)"
            ),
            "likes",
          ],
        ],
      },
    });

    // 예매내역, 공연 후기 게시글 객체 담은 배열
    const list = reservedList.map((reserved) => {
      let reservedItem = {};
      const board = reviewBoard.find((board) => {
        return reserved.dataValues.show_id == board.dataValues.show_id;
      });
      reservedItem.reservedList = reserved.dataValues;
      if (board == null) {
        // 프론트에서 reviewBoard가 null값이면 공연후기 작성할 수 있게 처리
        reservedItem.reviewBoard = null;
      } else {
        reservedItem.reviewBoard = board.dataValues;
      }
      return reservedItem;
    });

    return res.json(list);
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 후기 게시글 작성
exports.insertReviewBoard = async (req, res) => {
  try {
    const { primaryKey } = req.acc_decoded;
    const { content, rates } = req.body;
    const { show_id } = req.params;

    await ReviewBoard.create({ content, rates, user_id: primaryKey, show_id });

    // 등록 성공
    return res.send("0");
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 후기 게시글 수정
exports.editReviewBoard = async (req, res) => {
  try {
    // 프론트에서 content, rates, id 보내줘야 함
    const { content, rates } = req.body;
    const { id } = req.params;

    await ReviewBoard.update({ content, rates }, { where: { id } });

    // 수정 성공
    return res.send("0");
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};

// 후기 게시글 삭제
exports.deleteReviewBoard = async (req, res) => {
  try {
    const { id } = req.params;

    await ReviewBoard.destroy({ where: { id } });

    // 삭제 성공
    return res.send("0");
  } catch (error) {
    console.log(error);
    return res.send("1");
  }
};
