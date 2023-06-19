const { Show, ShowDateInfo , Theater ,User } = require('../models');
const path = require('path');
const Sequelize = require('sequelize');

exports.showDetail = async (req,res)=>{
    const show_id=req.query.id
    try {
        let data = await 
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}