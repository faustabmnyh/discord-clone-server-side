const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const channelRoutes = require("./src/routes/channel");
const Pusher = require("pusher");

// app config
const app = express();
const PORT = process.env.PORT || 3100;

// pusher
const pusher = new Pusher({
  appId: "1107194",
  key: "23bd3fda0c1cc5b30b8f",
  secret: "e0fcb95ac884e9d0bf55",
  cluster: "mt1",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://fausta:u69yncebjiknv2RC@cluster0.5koym.mongodb.net/discordDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("DB Connected");

  const ChangeStream = mongoose.connection.collection("conversations").watch();

  ChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      // (untuk kita ketika menambahkan channel)kita akan membuat pusher channel dan yang sampingnya itu akan diberi events yaitu newChannel
      pusher.trigger("channels", "newChannel", {
        change: change,
      });
    } else if (change.operationType === "update") {
      // the explanation same as above
      pusher.trigger("conversation", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error Occured");
    }
  });
});

app.use("/new", channelRoutes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
