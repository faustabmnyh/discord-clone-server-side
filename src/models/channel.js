const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Channel = new Schema({
  channelName: {
    type: String,
    required: true,
  },
  conversation: [
    {
      message: {
        type: String,
        require: true,
      },
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

module.exports = mongoose.model("conversations", Channel);
