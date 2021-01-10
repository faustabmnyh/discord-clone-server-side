const Channel = require("../models/channel");

const createChannel = (req, res) => {
  const body = req.body;

  const Add = new Channel(body);

  Add.save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => console.log(err));
};

const getChannelList = (req, res) => {
  Channel.find()
    .then((result) => {
      // refactoring because in there will be a user and channel and i push that(just for channel)
      let channels = [];
      result.map((data) => {
        // this is for channel i think
        const channelInfo = {
          id: data._id,
          name: data.channelName,
        };

        channels.push(channelInfo);
      });

      res.status(201).send(channels);
    })
    .catch((err) => console.log(err));
};

const createMessage = (req, res) => {
  const _id = req.query.id;
  const body = req.body;

  // i think in this buttom is not only the one way to get that, that because lack of my knowladge
  Channel.update({ _id }, { $push: { conversation: body } })
    .then((result) => res.status(201).send(result))
    .catch((err) => console.log(err));
};

// const getMessage = (req, res) => {
//   Channel.find()
//     .then((result) => {
//       res.status(201).send(result);
//     })
//     .catch((err) => console.log(err));
// };

const getMessage = (req, res) => {
  const id = req.query.id;
  Channel.find({ _id: id })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  createChannel,
  getChannelList,
  createMessage,
  getMessage,
};
