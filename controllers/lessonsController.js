const validateLessonQuery = require("../utils/validateQuery");
const lessonService = require('../services/lessonService');

exports.getLessons = async (req, res) => {
  console.log("req", req.query);

  const validationErrors = validateLessonQuery(req.query);
  if (validationErrors) {
    return res.status(400).json({ errors: validationErrors });
  }

  const filterParams = {
    date: req.query.date,
    status: req.query.status,
    teacherIds: req.query.teacherIds,
    studentsCount: req.query.studentsCount,
    page: req.query.page || 1,
    lessonsPerPage: req.query.lessonsPerPage || 5
  };

  try {
    const lessons = await lessonService.getLessonsWithFilters(filterParams);

    return res.status(200).json({ errors: 0, lessons });
  } catch (error) {
    return res.status(500).json({ error: "Непредвиденная ошибка", errorHandler: error });
  }
};