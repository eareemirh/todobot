const Command = require("../../Base/Struct/Command");

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "ping"
    });
  }

  exec(message) {
    message.channel.send("🏓");
  }
};
