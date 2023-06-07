const Sequelize = require("sequelize");

class ShowDateInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        year: { type: Sequelize.INTEGER, allowNull: false },
        month: { type: Sequelize.INTEGER, allowNull: false },
        day: { type: Sequelize.INTEGER, allowNull: false },
        startTime: { type: Sequelize.INTEGER, allowNull: false },
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
    });
  }
}

module.exports = ShowDateInfo;
