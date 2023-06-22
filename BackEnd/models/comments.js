const Sequelize = require("sequelize");



class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content:{type:Sequelize.TEXT}
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User, {
      foreignKey: "user_id",
      targetKey: "id", onDelete: "CASCADE"
    });
    db.Comment.belongsTo(db.FreeBoard, {
        foreignKey: "freeboard_id",
        targetKey: "id", onDelete: "CASCADE"
      });
    db.Comment.hasMany(db.Recomment, {
        foreignKey: "comment_id",
        sourceKey: "id",
        onDelete: "CASCADE",
      });
  }
}

module.exports = Comment;
