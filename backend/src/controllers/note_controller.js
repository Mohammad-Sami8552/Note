import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ message: "Internal Sever Error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: "Note not found" });
        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: "Internal Sever Error" });
    }
}

export async function postNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });
        await newNote.save();
        return res.status(201).json(newNote);
    } catch (error) {
        console.error("Error creating note", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote)
            return res.status(404).json({ message: "Note not found" });
        res.status(200).json(deletedNote);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}