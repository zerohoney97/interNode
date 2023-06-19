const router = require('express').Router();
const {showDetail} = require('../controllers/showDetailController');
const path = require('path');


//디테일 페이지 이동
router.get('/',(req,res)=>{
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