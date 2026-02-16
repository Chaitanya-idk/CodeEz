const express = require("express");
const router = express.Router();
const problemsController = require("../controllers/problemsController");

router.get("/all", problemsController.getAllProblems);
router.get("/:id",problemsController.getProblemById);

module.exports = router;