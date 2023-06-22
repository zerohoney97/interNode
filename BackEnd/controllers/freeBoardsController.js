const {
  FreeBoard,
  FreeBoardLike,
  Comment,
  Recomment,
  User,
  Report,
} = require("../models");
const path = require("path");
const Sequelize = require("sequelize");
//게시글 목록 전체조회
exports.viewPostAll = async (req, res) => {
  try {
    const list = await FreeBoard.findAll({
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: FreeBoardLike,
        },
      ],
    });
    res.json(list);
  } catch (error) {
    console.log(error);
  }
};

//게시글 등록
exports.insertPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { acc_decoded } = req;
    const user = await User.findOne({ where: { email: acc_decoded.email } });
    await FreeBoard.create({
      title,
      content,
      user_id: user.id,
    });
    res.redirect("/freeboards/main");
  } catch (error) {
    console.log(error);
  }
};

// 글 상세조회

exports.selectPost = async (req, res) => {
  const post_id = req.query.id;
  const {primaryKey} = req.acc_decoded;
  let result;
  try {
    const post = await FreeBoard.findOne({
      where: { id: post_id },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: FreeBoardLike,
        },
      ],
    });
    result = [post,primaryKey]
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

//조회수 증가
exports.viewsUp = async (req, res) => {
  const post_id = req.query.id;
  try {
    await FreeBoard.update(
      { views: Sequelize.literal("views + 1") },
      { where: { id: post_id } }
    );
  } catch (error) {
    console.log(error);
  }
};

//게시글 수정
exports.updatePost = async (req, res) => {
  const post_id = req.query.id;
  const { title, content } = req.body;
  try {
    await FreeBoard.update({ title, content }, { where: { id: post_id } });
    res.redirect(`/freeboards/detailmain?id=${post_id}`);
  } catch (error) {
    console.log(error);
  }
};

//게시글 삭제
exports.deletePost = async (req, res) => {
  const post_id = req.query.id;
  try {
    await FreeBoard.destroy({ where: { id: post_id } });
    // res.redirect('http://127.0.0.1:5500/FrontEnd/freeboard/freeboard.html');
    res.end();
  } catch (error) {
    console.log(error);
  }
};

// 내가 쓴 글 조회
exports.myPost = async (req, res) => {
  const { primaryKey } = req.acc_decoded;
  try {
    const list = await FreeBoard.findAll({
      where: { user_id: primaryKey },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: FreeBoardLike,
        },
      ],
    });
    res.json(list);
  } catch (error) {
    console.log(error);
  }
};

// 내가 좋아요 한 글 조회
exports.myLikes = async (req, res) => {
  const { primaryKey } = req.acc_decoded;
  try {
    const list = await FreeBoardLike.findAll({
      where: { user_id: primaryKey },
      include: [
        {
          model: FreeBoard,
        },
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });

    let idList = [];
    for (let el of list) {
      idList.push(el.freeboard_id);
    }

    // console.log(list)

    const fav = await FreeBoard.findAll({
      where: { id: idList },
      include: [
        {
          model: FreeBoardLike,
        },
      ],
    });

    let data = [list, fav];

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// 좋아요 버튼 클릭

exports.thumbsUp = async (req, res) => {
  const post_id = req.query.id;
  const { primaryKey } = req.acc_decoded;
  let heart;
  try {
    let result = await FreeBoardLike.findOne({
      where: { user_id: primaryKey, freeboard_id: post_id },
    });

    if (result) {
      //삭제
      await FreeBoardLike.destroy({ where: { freeboard_id: post_id, user_id :primaryKey } });
      heart = false;
    } else {
      //추가
      await FreeBoardLike.create({
        user_id: primaryKey,
        freeboard_id: post_id,
        
      });
      heart = true;
    }
    //현재 좋아요 수 리턴
    const post = await FreeBoard.findOne({
      where: { id: post_id },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
        {
          model: FreeBoardLike,
        },
      ],
    });
    let rs = [post,heart];
    res.json(rs);
  } catch (error) {
    console.log(error);
  }
};

// 댓글, 대댓글 조회
exports.comment = async (req, res) => {
  const post_id = req.query.id;
  try {
    let data = await Comment.findAll({
      where: { freeboard_id: post_id },
      include: [
        {
          model: Recomment,
          include: [
            {
              model: User,
              attributes: ["nickname"],
            },
          ],
        },
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

// 댓글 추가
exports.commentInsert = async (req, res) => {
  const post_id = req.query.id;
  const { content } = req.body;
  const { primaryKey } = req.acc_decoded;

  try {
    Comment.create({
      content,
      user_id: primaryKey,
      freeboard_id: post_id,
    });
    res.redirect(`/freeboards/detailmain?id=${post_id}`);
  } catch (error) {
    console.log(error);
  }
};

// 대댓글 추가
exports.recommentInsert = async (req, res) => {
  const { content, commentId } = req.body;
  const post_id = req.query.id;
  const { primaryKey } = req.acc_decoded;

  try {
    Recomment.create({
      content,
      user_id: primaryKey,
      comment_id: commentId,
    });
    // 댓글 번호로 게시글 주소 찾고 주소 리다이렉트 해준다.
    res.redirect(`/freeboards/detailmain?id=${post_id}`);
  } catch (error) {
    console.log(error);
  }
};

//신고
exports.report = async (req, res) => {
  const { id, cmt, recmt } = req.query;

  if (cmt == 0 && recmt == 0) {
    //게시글에 신고
    try {
      const data = await FreeBoard.findOne({ where: { id } });
      const db = await Report.findOne({
        where: { content: data.content, user_id: data.user_id },
      });
      if (!db) {
        await Report.create({
          type: "자유 게시판",
          typeId: 1,
          title: data.title,
          content: data.content,
          user_id: data.user_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else if (cmt != 0) {
    //댓글에 신고
    try {
      const data = await Comment.findOne({ where: { id: cmt } });
      const db = await Report.findOne({
        where: { content: data.content, user_id: data.user_id },
      });
      if (!db) {
        await Report.create({
          type: "자유 게시판",
          typeId: 1,
          title: null,
          content: data.content,
          user_id: data.user_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    //대댓글에 신고
    try {
      const data = await Recomment.findOne({ where: { id: recmt } });
      const db = await Report.findOne({
        where: { content: data.content, user_id: data.user_id },
      });
      if (!db) {
        await Report.create({
          type: "자유 게시판",
          typeId: 1,
          title: null,
          content: data.content,
          user_id: data.user_id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  // // 해당 게시글로 가고싶다
  res.redirect(`/freeboards/detailmain?id=${id}`);
};
