const { DataTypes, Model } = require("sequelize");

class LessonStudent extends Model {
  static init(sequelize) {
    super.init(
      {
        lesson_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Lessons',
            key: 'id',
          },
        },
        student_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Students',
            key: 'id',
          },
        },
        visit: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      { sequelize, modelName: 'LessonStudent', timestamps: false, tableName: 'lesson_students'}
    );
  }
}

module.exports = LessonStudent;
