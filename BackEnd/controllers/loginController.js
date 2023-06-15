const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const session = require('express-session');

//로그인 시도
exports.login = async (req,res)=>{
    const {user_id,user_pw} = req.body;
    try {
        const user = await User.findOne({where : {email : user_id}})
        if(user == null){
            return res.redirect('http://127.0.0.1:5500/FrontEnd/login/idErr.html');
        }
        
        const same = bcrypt.compareSync(user_pw,user.password)
        // if(same){


        // }

        if(same){
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
                primaryKey: user.id
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "30m"
            })

            req.session.access_token = accessToken;

            res.redirect('/main');
        }else{
            return res.redirect('http://127.0.0.1:5500/FrontEnd/login/pwErr.html')
        }
    } catch (error) {
        console.log(error);
    }
}

// accessToken 의 정보를 decode해서 유저 데이터를 응답
// 메인 페이지와 마이 페이지에서 유저의 닉네임 보여줄 때 사용
exports.viewUser = async (req,res)=>{
    const { acc_decoded } = req;
    try {
        const user = await User.findOne({where : {email : acc_decoded.email}});
        res.json(user.nickname);
    } catch (error) {
        console.log(error);
    }
}