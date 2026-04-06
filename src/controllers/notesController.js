// src/controllers/studentsController.js

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;
  const student = await student.findById(studentId);


  // Додаємо базову обробку помилки замість res.status(404)
  if (!student) {
	  throw new Error('Student not found');
  }

  res.status(200).json(student);
};
