const Sequelize = require("sequelize");
class Show extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        // 공연정보,몇분
        detail: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(150),
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Show",
        tableName: "shows",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Show.belongsTo(db.Theater, {
      foreignKey: "theaters_id",
      targetKey: "id", onDelete: "CASCADE"
    });
    db.Show.hasMany(db.ReviewBoard, {
      foreignKey: "show_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.Show.hasMany(db.ShowDateInfo, {
      foreignKey: "show_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.Show.hasMany(db.ReservedList, {
      foreignKey: "show_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
    db.Show.hasMany(db.Sheet, {
      foreignKey: "show_id",
      sourceKey: "id",
      onDelete: "CASCADE",
    });
  }
}

module.exports = Show;
