const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const session = require('express-session');

exports.login = async (req,res)=>{
    const {user_id,user_pw} = req.body;
    try {
        const user = await User.findOne({where : {email : user_id}})
        if(user == null){
            return res.redirect('http://127.0.0.1:5500/FrontEnd/login/idErr.html');
        }
        
        
        // const same = bcrypt.compareSync(user_pw,user.password)
        if(user_pw === user.password){
            //신고횟수가 3회 이상이면 로그인 거절
            if(user.report_stack >= 3){
                return res.redirect('http://127.0.0.1:5500/FrontEnd/login/loginBlock.html')
            }
            if(user.email === 'admin@admin.com'){
                res.redirect("http://127.0.0.1:5500/FrontEnd/zerohoneyHTML/adminPage/searchUserDetail.html")
            }
            // access 토큰 발행 
            const accessToken = jwt.sign({
                email : user.email,
                nickname : user.nickname
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "5m"
            })

            req.session.access_token = accessToken;

            res.redirect('http://127.0.0.1:5500/FrontEnd/mainpage/mainpage.html');
        }else{
            return res.redirect('http://127.0.0.1:5500/FrontEnd/login/pwErr.html')
        }
    } catch (error) {
        console.log(error);
    }
}