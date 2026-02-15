const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getChatHistory,
  clearChatHistory
} = require("../controllers/chatController");

const { protect } = require("../middleware/auth");

router.post("/message", protect, sendMessage);
router.get("/history", protect, getChatHistory);
router.delete("/history", protect, clearChatHistory);

module.exports = router;
