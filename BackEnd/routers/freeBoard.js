const router = require('express').Router();
const { viewPostAll, insertPost, selectPost, viewsUp, updatePost , deletePost} = require('../controllers/freeBoardsController');
const { isLogin } = require('../middleware/islogin');

//전체 게시글 조회
router.get('/', viewPostAll);

//게시글 등록
router.post('/insert',isLogin,insertPost);

//글 상세조회
router.get('/postdetail/?',selectPost);

//조회수 증가
router.get('/viewsup/?' , viewsUp);

//게시글 수정
router.post('/updatepost/?', updatePost);

//게시글 삭제
router.get('/deletepost', deletePost)

module.exports = router;