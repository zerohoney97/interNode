const Sequelize = require("sequelize");

class ShowDataInfo extends Sequelize.Model {
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
        modelName: "ShowDataInfo",
        tableName: "showDataInfos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static association(db) {
    db.ShowDataInfo.belongsTo(db.Show, {
      foreignKey: "show_id",
      targetKey: "id",
    });
  }
}

module.exports = ShowDataInfo;
