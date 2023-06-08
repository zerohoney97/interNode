const Sequelize = require("sequelize");
class Show extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            detail : {
                type : Sequelize.TEXT,
                allowNull : false,
            },
            img : {
                type : Sequelize.STRING(50),
            },
            price : {
                type : Sequelize.STRING(50),
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Show",
            tableName : "shows",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci",
        });
    }

    static associate(db){
        db.Show.belongsTo(db.Theater,{foreignKey : "theaters_id", targetKey: "id"});
        db.Show.hasMany(db.ReviewBoard, {foreignKey : "show_id", sourceKey : "id"});
        db.Show.hasMany(db.ShowDateInfo, {foreignKey : "show_id", sourceKey : "id"});
        db.Show.hasMany(db.ReservedList, {foreignKey : "show_id", sourceKey : "id"});
        db.Show.hasMany(db.Sheet, {foreignKey : "show_id", sourceKey : "id"});
    }

}

module.exports = Show;