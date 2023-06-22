const Sequelize = require("sequelize");

class Report extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: { type: Sequelize.STRING(15), allowNull: false },
        typeId: { type: Sequelize.INTEGER, allowNull: false },
        title: { type: Sequelize.TEXT },
        content: { type: Sequelize.TEXT },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Report",
        tableName: "reports",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Report.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id",
      onDelete: "CASCADE"
    });
  }
}

module.exports = Report;
