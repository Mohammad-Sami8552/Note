import express from "express";
import { getAllNotes, postNote, updateNote, deleteNote, getNoteById } from "../controllers/note_controller.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", postNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;