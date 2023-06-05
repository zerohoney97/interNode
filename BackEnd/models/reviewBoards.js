const Sequelize = require("sequelize");
class ReviewBoard extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            content : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            rates : {
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 0,
            }
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "ReviewBoard",
            tableName : "reviewBoards",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci",
        });
    }

    static associate(db){
        db.ReviewBoard.belongsTo(db.User,{foreignKey : "user_id", targetKey: "id"});
        db.ReviewBoard.belongsTo(db.Show,{foreignKey : "show_id", targetKey: "id"});
        db.ReviewBoard.hasMany(db.ReviewBoardLike, {foreignKey : "reviewBoard_id", sourceKey : "id"});
    }

}

module.exports = ReviewBoard;