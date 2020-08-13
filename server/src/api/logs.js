const { Router } = require("express");
const LogEntry = require("../models/logEntry");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const created = await logEntry.save();
    res.json(created);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
