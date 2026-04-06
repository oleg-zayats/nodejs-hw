// src/controllers/studentsController.js
import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

// GET /notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found notes!',
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// GET /notes/:noteId
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found note with id ${noteId}!`,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// POST /notes
export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /notes/:noteId
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findByIdAndDelete(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully deleted the note!',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
