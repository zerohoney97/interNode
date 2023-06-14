const jwt = require('jsonwebtoken');

exports.isLogin = async (req,res,next)=>{
    const {access_token} = req.session;
    jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err, acc_decoded)=>{
        if(err){
            res.send("false");
        }else{
            // 정상적인 토큰 
            req.acc_decoded = acc_decoded;

            next();
        }
    })
}