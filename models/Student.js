const { DataTypes, Model } = require("sequelize");

class Student extends Model {
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
      { sequelize, modelName: 'Student', timestamps: false, tableName: 'students'}
    );
  }
}

module.exports = Student;
