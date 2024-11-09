const { Lesson, Student, Teacher, LessonStudent, sequelize } = require('../models');
const { Op } = require('sequelize');

class LessonService {
  async getLessonsWithFilters({
    date,
    status,
    teacherIds,
    studentsCount,
    page = 1,
    lessonsPerPage = 5,
  }) {
    try {
      const filters = {};
      const includeOptions = [
        {
          model: Student,
          as: 'Students',
          attributes: ['id', 'name'],
          through: { attributes: ['visit'] },
        },
        {
          model: Teacher,
          as: 'Teachers',
          attributes: ['id', 'name'],
        },
      ];

      // Обработка параметра date
      if (date) {
        const dates = date.split(',');
        if (dates.length === 1) {
          filters.date = dates[0];
        } else if (dates.length === 2) {
          filters.date = { [Op.between]: [dates[0], dates[1]] };
        } else {
          throw new Error('Некорректный формат даты.');
        }
      }

      // Обработка параметра status
      if (status !== undefined) {
        const parsedStatus = parseInt(status, 10);
        if ([0, 1].includes(parsedStatus)) {
          filters.status = parsedStatus;
        } else {
          throw new Error('Некорректное значение статуса.');
        }
      }

      // Обработка параметра teacherIds
      if (teacherIds) {
        const teacherIdsArray = teacherIds.split(',').map(id => parseInt(id, 10));
        includeOptions[1].where = { id: { [Op.in]: teacherIdsArray } };
      }

      // Обработка параметра studentsCount
      if (studentsCount) {
        const counts = studentsCount.split(',').map(Number);
        if (counts.length === 1) {
          filters.studentCount = sequelize.literal(`(SELECT COUNT(*) FROM lesson_students WHERE lesson_students.lesson_id = "Lesson".id) = ${counts[0]}`);
        } else if (counts.length === 2) {
          filters.studentCount = sequelize.literal(`(SELECT COUNT(*) FROM lesson_students WHERE lesson_students.lesson_id = "Lesson".id) BETWEEN ${counts[0]} AND ${counts[1]}`);
        } 
      }
      
      // Пагинация
      const offset = (page - 1) * lessonsPerPage;
      const limit = lessonsPerPage;

      // Выполнение запроса с фильтрацией и пагинацией
      const lessons = await Lesson.findAll({
        where: filters,
        include: includeOptions,
        offset,
        limit,
      });

      // Форматирование результата
      const result = lessons.map(lesson => ({
        id: lesson.id,
        date: lesson.date,
        title: lesson.title,
        status: lesson.status,
        visitCount: lesson.Students.filter(student => student.LessonStudent.visit).length,
        students: lesson.Students.map(student => ({
          id: student.id,
          name: student.name,
          visit: student.LessonStudent.visit,
        })),
        teachers: lesson.Teachers.map(teacher => ({
          id: teacher.id,
          name: teacher.name,
        })),
      }));

      return result;

    } catch (error) {
      console.error('Ошибка при получении уроков с фильтрацией:', error);
      throw { status: 400, message: error.message };
    }
  }
}

module.exports = new LessonService();
