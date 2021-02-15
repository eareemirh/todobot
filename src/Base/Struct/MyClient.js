const { Client, Collection, MessageEmbed } = require("discord.js");
const Logger = require("../Modules/Logger");
const Functions = require("../Functions");
const { TOKEN, PREFIX, EMOJI, AUTHOR_ID, CHANNEL_ID, GUILD_ID } = process.env;

class MyClient extends Client {
  constructor(options = {}) {
    super(options);

    this.commands = new Collection();
    this.cooldowns = new Collection();

    this.logger = new Logger();
    this.function = new Functions(this);

    this.prefix = PREFIX;
    this.token = TOKEN;

    this.once("ready", this.ready);
    this.on("message", this.handle);
  }

  async ready() {
    console.log(`- Bot Adı             >   ${this.user.tag}`);
    console.log(`- Sunucu Sayısı       >   ${this.guilds.cache.size}`);
    console.log(
      `- Davet URL'si        >   ${await this.generateInvite({
        permissions: []
      })}`
    );
    this.logger.log("Bot hazır!", "READY");
  }

  handle(message) {
    if (message.content.startsWith(EMOJI)) {
      let str = message.content.replace(EMOJI, "");
      const Embed = new MessageEmbed()
        .setColor(message.guild.member(this.user).displayHexColor)
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ format: "png", size: 1024 }),
          `https://discord.com/users/${message.author.id}`
        )
        .setDescription(str);

      this.guilds.cache
        .get(GUILD_ID)
        .channels.cache.get(CHANNEL_ID)
        .send(Embed);
      message.react("👌");
    }
    if (message.author.bot || !message.content.startsWith(this.prefix)) return;

    let [command, ...args] = message.content
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);

    let cmd =
      this.commands.get(command.toLowerCase()) ||
      this.commands.find(
        data => data.aliases && data.aliases.includes(command.toLowerCase())
      );

    if (!cmd) return;

    if (cmd.guildOnly && !message.guild) return;

    if (cmd.usage && !args.length) {
      return;
    }

    if (cmd.ownerOnly && message.author.id !== AUTHOR_ID) return;

    if (!this.cooldowns.has(cmd.name))
      this.cooldowns.set(cmd.name, new Collection());

    let now = Date.now();
    let timestamps = this.cooldowns.get(cmd.name);
    let cooldownAmount = cmd.cooldown * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        return;
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      cmd.exec(message, args);
    } catch (e) {
      this.logger.log(`Komut İşleyici Hatası |  ${cmd.name}: ${e}`, "ERROR");
    }
  }

  async launch() {
    Promise.all([this.function.load(), super.login(this.token)]);
  }
}

module.exports = MyClient;
