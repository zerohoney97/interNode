const router = require('express').Router();
const { viewPostAll, insertPost} = require('../controllers/freeBoardsController');
const { isLogin } = require('../middleware/islogin');

router.get('/', viewPostAll);

router.post('/insert',isLogin,insertPost);

module.exports = router;