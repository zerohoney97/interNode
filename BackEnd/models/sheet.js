const Sequelize = require('sequelize');

class Sheet extends Sequelize.Model {
    static init (sequelize) {
        return super.init({
            reservation_num : {
                type : Sequelize.STRING(20),
                allowNull : false,
            },
            sheets_array : {
                type : Sequelize.STRING(20),
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : "Sheet",
            tableName : "sheets",
            paranoid : false,
            charset : "utf8",
            collate : "utf8_general_ci"
        })
    }

    static associate(db){
        db.Sheet.belongsTo(db.Show,{foreignKey : "show_id", targetKey : "id"});
    }
}

module.exports = Sheet;