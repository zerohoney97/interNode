const Sequelize = require("sequelize");

class Recomment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: { type: Sequelize.TEXT },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Recomment",
        tableName: "recomments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static association(db) {
    db.Recomment.belongsTo(db.Comment, {
      foreignKey: "comment_id",
      targetKey: "id",
    });
    db.Recomment.belongsTo(db.FreeBoard, {
      foreignKey: "freeboard_id",
      targetKey: "id",
    });
  }
}

module.exports = Recomment;
