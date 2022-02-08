module.exports.set = {
  name: "rm",
  aliases: ["rm"]
};

module.exports.run = async (db, client, message) => {
  const responseMessage = await message.channel.send(
    "Checking whether the memo can be deleted..."
  );

  const memo = message.content.split(" ");
  const memo_title = memo[1];
  if (memo.length < 2) {
    responseMessage.edit(
      "Input error!\nCommand is `.mrm <title>`."
    );
    return;
  }
  db.get(
    "SELECT * FROM memo WHERE user_id=? AND memo_title=?;",
    [message.author.id, memo_title],
    (err, row) => {
      if (err) return;
      if (!row) {
        responseMessage.edit(`Title ${memo_title} does not exist.`);
        return;
      }
      db.get(
        "DELETE FROM memo WHERE user_id=? AND memo_title=?",
        [message.author.id, memo_title],
        (err, row) => {
          if (err) return;

          const embed = {
            title: "Memo deleted",
            color: 0xd0021b,
            fields: [{ name: "Title", value: memo_title }],
            footer: {
              icon_url: message.author.avatarURL,
              text: message.author.tag
            }
          };
          responseMessage.edit({ embed });
        }
      );
    }
  );
};
