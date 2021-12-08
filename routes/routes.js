const express = require("express");
const router = express.Router();
const {
  createStory,
  getAllStories,
  deleteStory,
  getStory,
  renderTemas,
} = require("../controllers/index.controller");

router.post("/relatos/add", createStory);

router.get("/relatos/get/all", getAllStories);

router.get("/relatos/get/:id", getStory);

router.delete("/relatos/delete/:id", deleteStory);

router.get("/temas", renderTemas);

module.exports = router;
