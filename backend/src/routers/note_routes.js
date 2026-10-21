import express from "express";
import { getAllNotes, postNote, updateNote, deleteNote, getNoteById } from "../controllers/note_controller.js";

const noteRouter = express.Router();

noteRouter.get("/", getAllNotes);
noteRouter.get("/:id", getNoteById);
noteRouter.post("/", postNote);
noteRouter.put("/:id", updateNote);
noteRouter.delete("/:id", deleteNote);

export default noteRouter;