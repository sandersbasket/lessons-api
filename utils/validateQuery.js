const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (dateString) => {
  const date = new Date(dateString);

  return (
    dateFormatRegex.test(dateString) &&
    !isNaN(date) &&
    date <= new Date() 
  );
};


const validateLessonQuery = (query) => {
  const errors = [];
  if (query.date) {
    const dates = query.date.split(",");
    if (dates.length > 2 || !dates.every(isValidDate)) {
      errors.push("Неправильный формат даты или даты не существует, используйте YYYY-MM-DD или YYYY-MM-DD,YYYY-MM-DD. ");
    }
  }

  if (query.status && ![0, 1].includes(parseInt(query.status, 10))) {
    errors.push("Неправильный статус");
  }

  if (query.studentsCount) {
    const counts = query.studentsCount.split(",");
    if (counts.length > 2 || !counts.every(count => /^\d+$/.test(count))) {
      errors.push("Неправильный диапазон StudentsCount, используйте: '10' или '10, 20'");
    }
  }

  if (query.page) {
    if (!/^\d+$/.test(query.page)) {
      errors.push("Неправильный формат данных page");
    }
  }

  if (query.lessonsPerPage) {
    if (!/^\d+$/.test(query.lessonsPerPage)) {
      errors.push("Неправильный формат данных lessonsPerPage");
    }
  }

  if (query.teacherIds) {
    const teachersIds = query.teacherIds.split(",");
    if (teachersIds.length > 1) {
      if (teachersIds.length > 2 || !teachersIds.every(count => /^\d+$/.test(count))) {
        errors.push("Неправильный формат данных teachersIds");
      }
    } else { 
      if (!/^\d+$/.test(query.teacherIds)) {
        errors.push("Неправильный формат данных teacherIds");
      }
    }
  }
  return errors.length ? errors : null;
};

module.exports = validateLessonQuery;
