const express = require("express");
const router = express.Router();
const lessonsController = require("../controllers/lessonsController");

router.get("/", lessonsController.getLessons);

module.exports = router;
