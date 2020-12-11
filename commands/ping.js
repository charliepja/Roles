module.exports = {
	args: false,
	guildOnly: true,
	memberPermission: 'SEND_MESSAGES',
	category: 'commands',
	name: 'ping',
	description: 'Pong!',
	cooldown: 5,
	run(message) {
		return message.channel.send(`Pong! \`${message.client.ws.ping}ms\``);
	},
};