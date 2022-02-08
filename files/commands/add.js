module.exports.set = {
  name: "add",
  aliases: ["add"]
};

const insert = (db, message, memo_title, memo_content, responseMessage) =>
  db.run(
    "INSERT INTO memo VALUES(?,?,?,?)",
    [message.author.id, message.author.username, memo_title, memo_content],
    err => {
      if (err) return; // TODO
      const embed = {
        title: "memo added",
        color: 0x4a90e2,
        fields: [
          { name: "Title", value: memo_title },
          { name: "Content", value: memo_content }
        ],
        footer: {
          icon_url: message.author.avatarURL,
          text: message.author.tag
        }
      };
      responseMessage.edit({ embed });
    }
  );

//コマンド内容
module.exports.run = async (db, client, message) => {
  const responseMessage = await message.channel.send(
    "Checking for memo..."
  );
  const memo = message.content.split(" ");

  if (memo.length < 3) {
    responseMessage.edit(
      "Error!\nPlease use `.madd <title> <content>` to add memo."
    );
    return;
  }

  const memo_title = memo[1];
  if (memo_title.length > 10) {
    responseMessage.edit(
      "Title is too long.\n10 characters limited."
    );
    return;
  }

  const memo_content = memo.slice(2).join(" ");
  if (memo_content.length > 1000) {
    responseMessage.edit(
      "Content is too long.\n1000 characters limited."
    );
    return;
  }

  db.get(
    "SELECT count(0) FROM memo WHERE user_id=?",
    [message.author.id],
    (err, row) => {
      if (err) return; // TODO
      if (row[0] >= 100) {
        responseMessage.edit(
          "Your memo amount has reached the limit (100).\nPlease delete unnecessary memo."
        );
        return;
      }

      db.get(
        "SELECT * FROM memo WHERE user_id=? AND memo_title=?;",
        [message.author.id, memo_title],
        (err, row) => {
          if (err) return; // TODO
          if (row) {
            responseMessage.edit(
              "Memo of same title already exists.\nYou can delete the old one before re-adding."
            );
            return;
          }
          insert(db, message, memo_title, memo_content, responseMessage);
        }
      );
    }
  );
};
