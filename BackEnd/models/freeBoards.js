const Sequelize = require("sequelize");
class FreeBoard extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(40),
                allowNull : false,
            },
            content : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            views : {
                type : Sequelize.INTEGER,
                allowNull : false,
                defaultValue : 0,
            }
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "FreeBoard",
            tableName : "freeBoards",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci",
        });
    }

    static associate(db){
        db.FreeBoard.belongsTo(db.User,{foreignKey : "user_id", targetKey: "id", onDelete: "CASCADE"});
        db.FreeBoard.hasMany(db.Comment, {foreignKey : "freeboard_id", sourceKey : "id",  onDelete: "CASCADE",});
        db.FreeBoard.hasMany(db.FreeBoardLike, {foreignKey : "freeboard_id", sourceKey : "id",  onDelete: "CASCADE",});
    }

}

module.exports = FreeBoard;