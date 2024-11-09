const { DataTypes, Model } = require("sequelize");

class Lesson extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING(100),
        },
        status: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      { sequelize, modelName: 'Lesson', tableName: 'lessons', timestamps: false}
    );
  }
}

module.exports = Lesson;
