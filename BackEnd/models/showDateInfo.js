const Sequelize = require("sequelize");

class ShowDateInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        startDate: { type: Sequelize.STRING(20), allowNull: false },
        endDate: { type: Sequelize.STRING(20), allowNull: false },
        startTime: { type: Sequelize.STRING(30), allowNull: false },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "ShowDateInfo",
        tableName: "showDateInfos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.ShowDateInfo.belongsTo(db.Show, {
      foreignKey: "show_id",
      targetKey: "id",
      onDelete: "CASCADE"
    });
  }
}

module.exports = ShowDateInfo;
