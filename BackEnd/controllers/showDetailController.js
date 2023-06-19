const { Show, ShowDateInfo , Theater ,User, ReviewBoard, ReviewBoardLike} = require('../models');
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

    try {
        const review = await ReviewBoard.findAll({
             where : {show_id},

            
            });

        console.log('쇼아이디',show_id);
    } catch (error) {
        console.log(error);
    }

}