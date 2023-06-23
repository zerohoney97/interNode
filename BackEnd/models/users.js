const Sequelize = require("sequelize");
class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(60),
          defaultValue : "default_user.png"
        },
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        report_stack: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.FreeBoard, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.ReviewBoard, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Comment, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Recomment, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.Report, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.ReservedList, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.ChatLog, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.FreeBoardLike, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.User.hasMany(db.ReviewBoardLike, {
      foreignKey: "user_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  }
}

module.exports = User;
