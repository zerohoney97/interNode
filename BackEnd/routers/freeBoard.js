const router = require('express').Router();
const { freeBoardList } = require('../controllers/freeBoardsController');

router.get('/',freeBoardList);


module.exports = router;