const Sequelize = require('sequelize');

class FreeBoardLike extends Sequelize.Model {
    static init(sequelize){
        return super.init({

        },{
            sequelize,
            timestamps : true,
            modelName : "FreeBoardLike",
            tableName : "freeBoardLikes",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        });
    }

    static associate(db){
        db.FreeBoardLike.belongsTo(db.User,{foreignKey : "user_id", targetKey : "id", onDelete: "CASCADE"})
        db.FreeBoardLike.belongsTo(db.FreeBoard,{foreignKey : "freeboard_id", targetKey : "id", onDelete: "CASCADE"})
    }
    
}

module.exports = FreeBoardLike;