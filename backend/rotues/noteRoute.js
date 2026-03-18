const express = require('express');
const router = express.Router();
const { getAllNotes, getSingleNote, createNote, updateNote, deleteNote } = require('../controller/notesController');

// GET /api/notes - Get all notes
router.get("/", getAllNotes);

// GET /api/notes/:id - Get a single note
router.get("/:id", getSingleNote);

// POST /api/notes - Create a new note
router.post("/", createNote);

// PUT /api/notes/:id - Update a note
router.put("/:id", updateNote);

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", deleteNote);

module.exports = router;