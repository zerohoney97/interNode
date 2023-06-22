const { Show, ShowDateInfo , Theater ,User, ReviewBoard, ReviewBoardLike ,Report} = require('../models');
const path = require('path');
const Sequelize = require('sequelize');

exports.showDetail = async (req,res)=>{
    const show_id=req.query.id

    try {
        const data = await Show.findOne({
            where : {id : show_id},
            include : [
                {
                    model : Theater
                },
                {
                    model : ShowDateInfo
                }
            ]
        })
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

exports.reviewBoard = async (req,res)=>{
    const show_id =req.query.id
    const {primaryKey} = req.acc_decoded;
    let result;
    try {
        const review = await ReviewBoard.findAll({
            where : {show_id},
            include : [
                {
                    model : ReviewBoardLike
                },
                {
                    model : User,
                    attributes : ['nickname','img']
                    
                }
            ]

        });
        result = [review,primaryKey]
        res.json(result);

    } catch (error) {
        console.log(error);
    }

}

// 좋아요 버튼 클릭
exports.reviewThumbsUp = async (req,res)=>{
    const cmt_id = req.query.id;
    const { primaryKey } = req.acc_decoded;
    let heart ;
    try {

        let result = await ReviewBoardLike.findOne({
            where : {user_id : primaryKey, reviewboard_id :cmt_id }
        })

        if(result){
            //삭제
            await ReviewBoardLike.destroy({where : {reviewboard_id : cmt_id, user_id : primaryKey}});
            heart = false;
        }else{
            //추가
            await ReviewBoardLike.create({
                user_id : primaryKey,
                reviewboard_id : cmt_id
            })
            heart = true;
        }
        //현재 좋아요 수 리턴
        const likes = await ReviewBoardLike.findAll({
            where : {reviewboard_id : cmt_id}
        })
        let rs = [likes,heart]
        res.json(rs);
    } catch (error) {
        console.log(error);
    }
}

// 관람후기 신고
exports.reviewReport = async (req,res)=>{
    const cmt_id = req.query.id;
    try {
        const data = await ReviewBoard.findOne({ where : {id : cmt_id}});
        const result = await Report.findOne({ where :{user_id : data.user_id, content: data.content}})
        if(!result){
            await Report.create({
                type : '후기 게시판',
                typeId : 2,
                title : null,
                content : data.content,
                user_id : data.user_id
            })
        }
        res.redirect(`/showdetail/detail?id=cmt_id`);
    } catch (error) {
        console.log(error);
    }

}