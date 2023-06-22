const Sequelize = require("sequelize");
class ReviewBoard extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        rates: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ReviewBoard",
        tableName: "reviewBoards",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.ReviewBoard.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id", onDelete: "CASCADE"
    });
    db.ReviewBoard.belongsTo(db.Show, {
      foreignKey: "show_id",
      targetKey: "id", onDelete: "CASCADE"
    });
    db.ReviewBoard.hasMany(db.ReviewBoardLike, {
      foreignKey: "reviewboard_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  }
}

module.exports = ReviewBoard;
