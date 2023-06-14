const { User } = require("../models");
const bcrypt = require("bcrypt");

// 유저 정보 반환
exports.getUserInfo = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const user = await User.findOne({where : {id:primaryKey}});

        return res.json({email : user.dataValues.email, nickname : user.dataValues.nickname, img: user.dataValues.img});
    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}

// 닉네임 변경
exports.changeNickName = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const { nickname } = req.body;

        // 닉네임 변경
        await User.update({nickname : nickname}, {where : {id:primaryKey}});

        // 성공
        return res.json({result : "0", nickname});
    } catch (error) {
        console.log(error);
        return res.json({result : "1"});
    }
}

// 비밀번호 변경
exports.changePassword = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const { password } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        // 비밀번호 변경
        await User.update({password : hash}, {where : {id:primaryKey}});

        // 성공
        return res.send("0");
    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}

// 프로필 이미지 변경
exports.changeImg = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const { file } = req;

        await User.update({img:file.filename}, {where : {id:primaryKey}});

        return res.send("0");
    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}