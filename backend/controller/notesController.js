const Note = require('../models/Note');

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt:-1});//sorting the notes by createdAt in descending order
    res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes",error);
        res.status(500).json({message:"Error fetching notes"});
    }
};

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content, tags, isImportant } = req.body;
        
        const newNote = new  Note({
          title,
            content,
            tags: tags || [],
            isImportant: isImportant || false
        });
     
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note",error);
        res.status(500).json({message:"Error creating note"});
    }
};

// Get a single note by ID
const getSingleNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note", error);
        res.status(500).json({ message: "Error fetching note" });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
      const{id}=req.params;
      const { title, content, tags, isImportant } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(id, { title, content, tags, isImportant }, { new: true });
      res.status(200).json(updatedNote);

      //check if the note is found
      if(!updatedNote){
        return res.status(404).json({message:"Note not found"});
      }
    } catch (error) {
        console.error("Error updating note",error);
        res.status(500).json({message:"Error updating note"});
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const{id}=req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Note deleted successfully"});
    } catch (error) {
        console.error("Error deleting note",error);
        res.status(500).json({message:"Error deleting note"});
    }
    
};

module.exports = {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
};