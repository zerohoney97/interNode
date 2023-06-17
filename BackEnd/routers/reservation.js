const router = require("express").Router();
const path = require('path');

router.get('/seats',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', '..','FrontEnd','seat','seat.html'));

});

// 유저 아이디 반환
router.get('/user', (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        return res.send({primaryKey});
    } catch (error) {
        console.log(error);
    }

});

module.exports = router;