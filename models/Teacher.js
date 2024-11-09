const { DataTypes, Model } = require("sequelize");

class Teacher extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(10),
        },
      },
      { sequelize, modelName: 'Teacher', timestamps: false, tableName: 'teachers'}
    );
  }
}

module.exports = Teacher;
