module.exports.set = {
  name: "help",
  aliases: ["?", "help"]
};

module.exports.run = (db, client, message) => {
  const embed = {
    title: "Commands",
    color: 0xf5a623,
    fields: [
      {
        name: ".m <title>",
        value: "Show memo"
      },
      {
        name: ".madd <title> <content>",
        value: "Write memo"
      },
      {
        name: ".mrm <title>",
        value: "Delete memo"
      },
      {
        name: ".mlist",
        value: "List all memo"
      },
      {
        name: ".m?",
        value: "Show help message"
      }
    ],
    footer: {
      icon_url: client.user.avatarURL,
      text: client.user.tag
    }
  };
  message.channel.send({ embed });
};
