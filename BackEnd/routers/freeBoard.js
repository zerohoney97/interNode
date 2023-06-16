const router = require('express').Router();
const { viewPostAll,
        insertPost, 
        selectPost, 
        viewsUp, 
        updatePost , 
        deletePost , 
        myPost, 
        myLikes, 
        thumbsUp,
        comment,
        commentInsert,
        recommentInsert
    } = require('../controllers/freeBoardsController');
const { isLogin } = require('../middleware/islogin');

//전체 게시글 조회
router.get("/", viewPostAll);

//게시글 등록
router.post("/insert", isLogin, insertPost);

//글 상세조회
router.get("/postdetail/?", selectPost);

//조회수 증가
router.get('/viewsup/?' , viewsUp);

//게시글 수정
router.post('/updatepost/?', updatePost);

//게시글 삭제
router.get('/deletepost', deletePost);

//내가 쓴 글 조회
router.get('/mypost',isLogin,myPost);

//내가 좋아요한 글 조회
router.get('/mylikes',isLogin, myLikes);

// 좋아요 버튼 클릭
router.get('/thumbsup/?',isLogin, thumbsUp);

// 댓글, 대댓글 조회
router.get('/comment/?', comment);

// 댓글 추가
router.post('/commentinsert/?', isLogin, commentInsert);

// 대댓글 추가
router.post('/recommentinsert/?', isLogin, recommentInsert);

// 게시판 이동
router.get("/main", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "..",
      "..",
      "FrontEnd",
      "freeboard",
      "freeboard.html"
    )
  );
});
module.exports = router;
