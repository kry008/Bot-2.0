const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('kry008.xyz/bot/i | To see how to support type /supportbot', { type: ActivityType.PLAYING });
	},
};
