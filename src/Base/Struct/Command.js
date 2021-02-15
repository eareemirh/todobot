class Command {
	constructor(client, data = {}) {
		this.client = client;

		this.name = data.name;
		this.aliases = data.aliases || [];
		this.cooldown = data.cooldown || 3;
		
		this.guildOnly = data.guildOnly || true;
		this.ownerOnly = data.ownerOnly || false;

		this.description = data.description || 'Açıklama sağlanmadı.';
		this.category = 'Diğer';
		this.usage = data.usage || undefined;
	}

	// eslint-disable-next-line no-unused-vars
	exec(message, args) {
		throw new Error(`Boş komut: ${this.name}`);
	}
}

module.exports = Command;
