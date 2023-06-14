const { User, ReservedList, Show, ReviewBoard, sequelize } = require("../models");
const { Theater, ReviewBoardLike } = require("../models");
const bcrypt = require("bcrypt");

// 유저 정보 반환
exports.getUserInfo = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const user = await User.findOne({ where: { id: primaryKey } });

        return res.json({ email: user.dataValues.email, nickname: user.dataValues.nickname, img: user.dataValues.img });
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
        await User.update({ nickname: nickname }, { where: { id: primaryKey } });

        // 성공
        return res.json({ result: "0", nickname });
    } catch (error) {
        console.log(error);
        return res.json({ result: "1" });
    }
}

// 비밀번호 변경
exports.changePassword = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;
        const { password } = req.body;

        const hash = bcrypt.hashSync(password, 10);

        // 비밀번호 변경
        await User.update({ password: hash }, { where: { id: primaryKey } });

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

        await User.update({ img: file.filename }, { where: { id: primaryKey } });

        return res.send("0");
    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}

// 유저의 예매내역 반환
exports.getUserReservedList = async (req, res) => {
    try {
        const { primaryKey } = req.acc_decoded;

        // 예매내역
        let reservedList = await ReservedList.findAll({ where: { user_id: primaryKey }, include: [{ model: Show }] });
        // console.log(reservedList);





        // // 후기
        // // 예매내역 불러올때 후기도 불러오는데, 후기좋아요 개수도 계산해서 보내기
        // const reviewBoard = await ReviewBoard.findAll({
        //     where: { user_id: primaryKey },
        //     include: [
        //         {
        //             model: ReviewBoardLike,
        //             required: false
        //         },
        //     ],
        //     attributes: {
        //         include: [[sequelize.literal('(SELECT COUNT(*) FROM ReviewBoardLikes WHERE ReviewBoardLikes.reviewboard_id = ReviewBoard.id)'), 'likes']],
        //     },
        // });

        // console.log(reviewBoard);


        // let list = [];

        // await Promise.all(
        //     reservedList.map(async (el)=>{
        //         const reviewBoard = await ReviewBoard.findOne({
        //             where: { user_id: primaryKey, show_id : el.dataValues.show_id },
        //             include : [{model: ReviewBoardLike, required:false}],
        //             attributes : {
        //                 include: [[sequelize.literal('(SELECT COUNT(*) FROM ReviewBoardLikes WHERE ReviewBoardLikes.reviewboard_id = ReviewBoard.id)'), 'likes']],
        //             }
        //         });
        //         el.ReviewBoard = reviewBoard;
        //         return el;
        //     })
        // );

        // console.log(reservedList);
        // return res.json(reservedList);



        await Promise.all(
            reservedList.map(async (el) => {
                console.log(el.dataValues.show_id);
                const reviewBoard = await ReviewBoard.findOne({
                    where: { user_id: primaryKey, show_id: el.dataValues.show_id },
                    include: [{ model: ReviewBoardLike, required: false }],
                    attributes: {
                        include: [
                            [
                                sequelize.literal('(SELECT COUNT(*) FROM ReviewBoardLikes WHERE ReviewBoardLikes.reviewboard_id = ReviewBoard.id)'),
                                'likes',
                            ],
                        ],
                    },
                });
                console.log(reviewBoard);
                el.ReviewBoard = reviewBoard;
                return el;
            })
        );

        //   console.log(reservedList);
        return res.json(reservedList);





    } catch (error) {
        console.log(error);
        return res.send("1");
    }
}

