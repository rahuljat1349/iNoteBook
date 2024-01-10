const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: fetch all the notes using get => api/notes/fetchnotes
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route 2: Add a new note using post => api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      let { title, description, tag } = req.body;
      const notes = await new Notes({
        title,
        description,
        tag,
        user: req.user,
      });
      const result = await notes.save();
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3: Update note using post => api/notes/updatenote
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    try {
      // getting information
      let { title, description, tag } = req.body;
      let newNote = {
        title,
        description,
        tag,
      };

      // finding if note exists
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }

      // finding if note belongs to user
      if (note.user.toString() !== req.user) {
        return res.status(401).send("access denied");
      }

      // updating the note
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 4: Delete an existing note using delete => api/notes/deletenote
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      // finding if the note exists
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }

      // finding if note belongs to user
      if (note.user.toString() !== req.user) {
        return res.status(401).send("access denied");
      }

      // deleting the note
      let result = await Notes.findByIdAndDelete(req.params.id);
      res.send({ Sucess: "Note has been deleted", note: note });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
