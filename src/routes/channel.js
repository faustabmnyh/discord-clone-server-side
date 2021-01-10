const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channel");
const channel = require("../models/channel");

router.post("/channel", channelController.createChannel);
router.get("/get/channelList", channelController.getChannelList);
router.post("/message", channelController.createMessage);
router.get("/get/message", channelController.getMessage);

module.exports = router;
