module.exports.set = {
  name: "test",
  aliases: ["test"]
};

module.exports.run = (db, client, message) => {
  message.channel.send("This is a test");
};
