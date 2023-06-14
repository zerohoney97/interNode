const { FreeBoard, FreeBoardLike, Comment , Recomment, User } = require('../models');
const Sequelize = require('sequelize')
//게시글 목록 전체조회
exports.viewPostAll = async (req,res)=>{
    try {
        const list = await FreeBoard.findAll({
            include :[
                {
                    model: User,
                    attributes : ['nickname']
                },
                {
                    model :FreeBoardLike,
                }
            ]
        });
        res.json(list);
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}

//게시글 등록
exports.insertPost = async (req,res)=>{
    try {
        const { title, content } = req.body;
        const { acc_decoded } = req;
        const user = await User.findOne({where : {email : acc_decoded.email}})
        await FreeBoard.create({
            title,
            content,
            user_id : user.id
        })
        res.redirect('http://127.0.0.1:5500/FrontEnd/freeboard/freeboard.html')
    } catch (error) {
        console.log(error);
    }
}

// 글 상세조회

exports.selectPost = async (req,res)=>{
    const post_id=req.query.id;
    try {
        const post = await FreeBoard.findOne({
            where :{id : post_id},
            include :[
                {
                    model: User,
                    attributes : ['nickname']
                },
                {
                    model :FreeBoardLike,
                }
            ]
        });
        res.json(post);
    } catch (error) {
        console.log(error);
    }
}

//조회수 증가
exports.viewsUp = async (req,res)=>{
    const post_id= req.query.id
    try {
        await FreeBoard.update(
            { views: Sequelize.literal('views + 1') },
            { where: { id: post_id } } 
        )
    } catch (error) {
        console.log(error);
    }
}