const jwt = require('jsonwebtoken');

exports.isLogin = async (req,res,next)=>{
    const {access_token, refresh_token} = req.session;
    jwt.verify(access_token,process.env.ACCESS_TOKEN,(err, acc_decoded)=>{
        if(err){
            res.send("세션이 만료되었습니다. 다시로그인해주세요");
        }else{
            // 정상적인 토큰 
            req.acc_decoded = acc_decoded;

            next();
        }
    })
}