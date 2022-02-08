module.exports.set = {
  name: "ping",
  aliases: ["ping"]
};

module.exports.run = (db, client, message) => {
  message.channel.send(`${Math.round(client.ping)} ms`);
};
