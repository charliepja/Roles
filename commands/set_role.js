module.exports = {
	args: true,
	guildOnly: true,
	memberPermission: 'ADMINISTRATOR',
	category: 'commands',
	name: 'role',
	description: 'View, set, or update a self-assignable role',
	usage: '[view || update || set] [name]',
	cooldown: 5,
	aliases: ['setrole', 'set-role'],
	async run(message, args, db, helpers) {
		const action = args[0].toLowerCase();

		if(!['view', 'set', 'update'].includes(action)) return helpers.embed(message, `Error: ${action} is not an approved action.\nPlease pick from: view, update, set`);

		const roleName = args.slice(1).join(' ');
		const guildRole = await message.guild.roles.cache.find(r => r.name === roleName);

		if(!guildRole) return helpers.embed(message, `Error: Cannot find guild role with name ${roleName}`);

		let getRole;

		if(action === 'view') {
			getRole = db.prepare('SELECT * FROM roles WHERE guild = ? AND value = ?').get(message.guild.id, guildRole.id);
			if(getRole && getRole.value) {
				return helpers.embed(message, `Role: ${roleName} has been set to <@&${getRole.value}>`);
			}
		}
		else {
			getRole = db.prepare('SELECT * FROM roles WHERE guild = ? AND value = ?').get(message.guild.id, guildRole.id);

			if(getRole && getRole.value) {
				await db.prepare('INSERT INTO roles (id, guild, name, value) VALUES (?, ?, ?, ?)').run(getRole.id, getRole.guild, roleName.toLowerCase(), guildRole.id);
			}
			else {
				await db.prepare('INSERT INTO roles (guild, name, value) VALUES (?, ?, ?)').run(message.guild.id, roleName.toLowerCase(), guildRole.id);
			}

			return helpers.embed(message, `Role: ${roleName} has been set to <@&${guildRole.id}>`);
		}


	},
};