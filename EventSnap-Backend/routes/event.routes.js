const express = require("express");
const multer = require("multer");
const { createEvent, getEvents } = require("../controllers/event.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images"), createEvent);
router.get("/", getEvents);

module.exports = router;
