const { MessageEmbed } = require('discord.js');

module.exports.embed = (message, description) => {
	const embed = new MessageEmbed()
		.setColor('#9B59B6')
		.setDescription(description);

	return message.channel.send(embed);
};