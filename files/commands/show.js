module.exports.set = {
  name: "show",
  aliases: ["show"]
};

module.exports.run = async (db, client, message) => {
  const msg = await message.channel.send("Searching for memo....");

  const memo = message.content.split(" ");
  const memo_title = memo[1];

  db.get(
    "SELECT * FROM memo WHERE user_id=? AND memo_title=?;",
    [message.author.id, memo_title],
    (err, row) => {
      if (!row) {
        msg.edit(`Title ${memo_title} does not exist.`);
      } else {
        const embed = {
          title: "📝MEMO",
          color: 0xb8e986,
          fields: [
            {
              name: "Title",
              value: memo_title
            },
            {
              name: "Content",
              value: row.memo_content
            }
          ],
          footer: {
            icon_url: message.author.avatarURL,
            text: message.author.tag
          }
        };

        msg.edit({ embed });
      }
    }
  );
};
