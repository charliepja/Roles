const fs = require('fs');
const path = require('path');

module.exports.generateCommands = async (collection) => {
	const commandFile = fs.readdirSync(path.resolve('commands')).filter(file => file.endsWith('.js'));
	for (const file of commandFile) {
		const command = require(path.resolve('commands', file));
		collection.set(command.name, command);
	}
};

module.exports.commandCheck = async (command, message, args) => {
	if(command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if(command.usage) {
			reply += `\nThe correct usage is: \`${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply) && true;
	}

	if(command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t run this command inside DMs!') && true;
	}

	if(!message.member.hasPermission(command.memberPermission)) {
		return message.reply(`I can't run this command! You need the following permission: ${command.memberPermission}`) && true;
	}

	return false;
};
