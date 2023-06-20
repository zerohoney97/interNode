const router = require('express').Router();
const {showDetail , reviewBoard , reviewThumbsUp, reviewReport} = require('../controllers/showDetailController');
const path = require('path');
const { isLogin } = require('../middleware/islogin');



//디테일 페이지 이동
router.get('/?',(req,res)=>{
    res.sendFile(
        path.join(
            __dirname,
            "..",
            "..",
            "FrontEnd",
            "showdetail",
            "showdetail.html"
        )
    )
})

//디테일 페이지 onload 
router.get('/detail/?',showDetail);

//관람후기 데이터 보내주기
router.get('/reviewboard/?',reviewBoard);

// 관람후기 좋아요
router.get('/thumbsup/?',isLogin, reviewThumbsUp);

// 관람후기 신고
router.get("/report/?", reviewReport);


module.exports = router;