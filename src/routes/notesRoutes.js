// src/routes/studentsRoutes.js

import { Router } from 'express';
import { student } from '../models/note.js';
import * as notesController from '../controllers/notesController.js';
const router = Router();

router.get('/students', async (req, res) => {
  const students = await student.find();
  res.status(200).json(students);
});



router.get('/notes', notesController.getAllNotes);
router.get('/notes/:noteId', notesController.getNoteById);
router.post('/notes', notesController.createNote);
router.delete('/notes/:noteId', notesController.deleteNote);
router.get('/students/:studentId', async (req, res) => {
  const { studentId } = req.params;
  const student = await student.findById(studentId);
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.status(200).json(student);
});

export default router;
