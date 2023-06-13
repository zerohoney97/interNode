const router = require('express').Router();
const { login,viewUser } = require('../controllers/loginController');
const { isLogin } = require('../middleware/islogin');

router.post("/",login);

router.get("/view",isLogin,viewUser)

module.exports = router;