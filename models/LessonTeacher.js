const { DataTypes, Model } = require("sequelize");

class LessonTeacher extends Model {
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
        teacher_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Teachers',
            key: 'id',
          },
        },
      },
      { sequelize, modelName: 'LessonTeacher', timestamps: false, tableName: 'lesson_teachers'}
    );
  }
}

module.exports = LessonTeacher;
