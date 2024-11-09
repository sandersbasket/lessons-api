const Sequelize = require("sequelize");
const config = require("../config/config");

const Lesson = require("./Lesson");
const Teacher = require("./Teacher");
const Student = require("./Student");
const LessonTeacher = require("./LessonTeacher");
const LessonStudent = require("./LessonStudent");

const sequelize = new Sequelize(config.development);

Lesson.init(sequelize);
Teacher.init(sequelize);
Student.init(sequelize);
LessonTeacher.init(sequelize);
LessonStudent.init(sequelize);

Lesson.belongsToMany(Teacher, { through: LessonTeacher, foreignKey: "lesson_id" });
Teacher.belongsToMany(Lesson, { through: LessonTeacher, foreignKey: "teacher_id" });

Lesson.belongsToMany(Student, { through: LessonStudent, foreignKey: "lesson_id" });
Student.belongsToMany(Lesson, { through: LessonStudent, foreignKey: "student_id" });

module.exports = { sequelize, Lesson, Teacher, Student, LessonTeacher, LessonStudent };
