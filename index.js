require('dotenv').config();
const Discord = require('discord.js');
const clientHelper = require('./helpers/clientHelpers.js');
const commandHelper = require('./helpers/commandHelpers.js');
const db = require('./seeds.js');

const client = new Discord.Client({ fetchAllMembers: true });

client.commands = new Discord.Collection();

clientHelper.generateCommands(client.commands, 'commands');

client.on('ready', async () => {
	console.log('Hello World!');
});

client.on('message', async (message) => {
	if(message.author.bot) return;
	if(!message.guild) return;

	const roleChannel = db.prepare('SELECT value FROM settings WHERE guild = ? AND name = ?').get(message.guild.id, 'role_channel');
	if(roleChannel && message.channel.id === roleChannel.value) {
		message.delete({ timeout: 1000 });
		const roleMessage = message.content.split(/ +/g);
		const roleToFind = roleMessage.join(' ').toLowerCase();

		const roleDB = db.prepare('SELECT * FROM roles WHERE guild = ? AND name = ?').get(message.guild.id, roleToFind);

		if(roleDB && roleDB.value) {
			const guildRole = await message.guild.roles.fetch(roleDB.value);
			if(!guildRole) return clientHelper.embed(message, `Error: Cannot find guild role ${message.content}`).then(m => m.delete({ timeout: 1000 }));
			await message.member.roles.add(roleDB.value);
			return commandHelper.embed(message, `Success! ${message.content} role had been added to ${message.member.displayName}`).then(m => m.delete({ timeout: 1000 }));
		}

		return commandHelper.embed(message, `Error: Cannot find database instance of ${message.content}`).then(m => m.delete({ timeout: 1000 }));
	}

	const getPrefix = await db.prepare('SELECT value FROM settings WHERE guild = ? AND name = ?').get(message.guild.id, 'prefix');
	const prefix = (getPrefix && getPrefix.value) ? getPrefix.value : '!';

	if(!message.content.startsWith(prefix)) return;

	const split = message.content.split(/ +/g);
	const commandName = split[0].slice(prefix.length).toLowerCase();
	const args = split.slice(1);

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if(!command) return;

	const checks = await clientHelper.commandCheck(command, message, args);

	if(checks) return;

	try {
		return command.run(message, args, db, commandHelper);
	}
	catch(error) {
		console.log(error);
		if(error) throw error;
	}
});

client.login(process.env.TOKEN);
