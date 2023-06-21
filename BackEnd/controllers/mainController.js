const { Show, ShowDateInfo, Theater, ReviewBoard, sequelize } = require("../models");

// 전체 공연 정보 반환
exports.showList = async (req, res) => {
    try {
        const show = await Show.findAll({include:[{model:ShowDateInfo}, {model:Theater}]});

        return res.json(show);
    } catch (error) {
        console.log(error);
    }
}

// 평점 순 공연 정보 반환
exports.rateShowList = async (req, res) => {
    try {
        const show = await Show.findAll({include:[
            {model:ShowDateInfo},
            {model:Theater},
            {model:ReviewBoard}
        ],
        attributes: {
            include: [[sequelize.literal('(SELECT CAST(SUM(rates)/COUNT(rates) AS DECIMAL(10, 2)) FROM reviewBoards WHERE reviewBoards.show_id = Show.id)'), 'showRates']],
        },
        order: [[sequelize.literal('showRates'), 'DESC']]});

        return res.json(show);
    } catch (error) {
        console.log(error);
    }
}

// 댓글 순 공연 정보 반환
exports.cmtShowList = async (req,res)=> {
    
        
            try {
                const show = await Show.findAll({
                    include: [
                        { model: ShowDateInfo },
                        { model: Theater },
                        { model: ReviewBoard }
                    ],
                    attributes: {
                        include: [
                            [
                                sequelize.literal('(SELECT COUNT(*) FROM reviewBoards WHERE reviewBoards.show_id = Show.id)'),
                                'reviewCount'
                            ]
                        ],
                    },
                    order: [
                        [sequelize.literal('reviewCount'), 'DESC']
                    ]
                });
        
                return res.json(show);
            } catch (error) {
                console.log(error);
            }
        
        
    
       
    
}