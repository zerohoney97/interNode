const router = require('express').Router();
const { viewPostAll, insertPost, selectPost} = require('../controllers/freeBoardsController');
const { isLogin } = require('../middleware/islogin');

//전체 게시글 조회
router.get('/', viewPostAll);

//게시글 등록
router.post('/insert',isLogin,insertPost);

//글 상세조회
router.get('/:id')

module.exports = router;