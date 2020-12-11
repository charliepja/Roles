module.exports = {
	args: true,
	guildOnly: true,
	memberPermission: 'ADMINISTRATOR',
	category: 'commands',
	name: 'setting',
	description: 'View, set, or update a predefined setting\nSettings: Role Channel (role_channel), Prefix (prefix)',
	usage: '[view || update || set] [name] <value>',
	cooldown: 5,
	aliases: [''],
	async run(message, args, db, helpers) {
		const action = args[0].toLowerCase();

		if(!['view', 'set', 'update'].includes(action)) return helpers.embed(message, `Error: ${action} is not an approved action.\nPlease pick from: view, update, set`);

		const settingToGet = args[1].toLowerCase();

		if(!['role_channel', 'prefix'].includes(settingToGet)) return helpers.embed(message, `Error: ${settingToGet} is not a predefined setting.\nPlease pick from: role_channel, or prefix`);

		let getSetting;
		if(action === 'view') {
			getSetting = await db.prepare('SELECT * FROM settings WHERE guild = ? AND name = ?').get(message.guild.id, settingToGet);
			if(getSetting && getSetting.value) {
				return helpers.embed(message, `${settingToGet} is currently set to ${getSetting.value}`);
			}
			return helpers.embed(message, `Error: ${settingToGet} is currently not defined.`);
		}
		else {
			getSetting = await db.prepare('SELECT * FROM settings WHERE guild = ? AND name = ?').get(message.guild.id, settingToGet);
			if(getSetting && getSetting.value) {
				db.prepare('INSERT INTO settings (id, guild, name, value) VALUES (?, ?, ?, ?)').run(getSetting.id, getSetting.guild, getSetting.name, args[2]);
			}
			else {
				db.prepare('INSERT INTO settings (guild, name, value) VALUES (?, ?, ?)').run(message.guild.id, settingToGet, args[2]);
			}

			return helpers.embed(message, `Success! ${settingToGet} has been set to ${args[2]}`);
		}


	},
};