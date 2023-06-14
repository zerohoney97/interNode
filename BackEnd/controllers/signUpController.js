const { User } = require("../models");
const bcrypt = require("bcrypt");

// 중복확인
exports.checkEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({where : {email}});

        // 사용 불가능한 이메일
        if (user != null) {
            return res.send("1");
        }

        // 사용 가능한 이메일
        return res.send("0");
    } catch (error) {
        console.log(error);
        return res.send("2");
    }
}

// 회원가입(유저추가)
exports.signUp = async (req, res) => {
    try {
        const { email, password, nickname } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        // 유저 생성
        await User.create({email, password:hash, nickname});

        // 로그인 페이지로 이동
        return res.send("0");
    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}

