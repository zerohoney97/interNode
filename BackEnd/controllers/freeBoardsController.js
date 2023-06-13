const { FreeBoard, FreeBoardLike, Comment , Recomment } = require('../models');

//게시글 목록 전체조회
exports.freeBoardList = async (req,res)=>{
    try {
        const list = await FreeBoard.findAll()
        res.json(list);
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}



