const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');
const { prefix } = require('../config.json');
const fs = require('fs');
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('kry008.xyz/bot/i | To see how to support type /supportbot | Type /help to get all commands', { type: ActivityType.PLAYING });
		//read all guilds, create files with guildid.json if not exists
		client.guilds.cache.forEach(guild => {
			const guildPath = `./guilds/guilds-${guild.id}.json`;
			if (!fs.existsSync(guildPath)) {
				fs.writeFileSync(guildPath, JSON.stringify(({ id: guild.id, name: [guild.name], premium: false, prefix: prefix, premium:false, prefix:"^", modChannel: null, hello: false, goodbye: true, helloChannel: null, goodbyeChannel: null, rulesChannel: null, welcomeMessage: { title: "Say hello", content: "Hello {{USER}}"}, goodbyeMessage: { title: "Say goodbye", content: "Goodbye {{USER}}"}, rulesMessage: null})));
			}
			else
			{
				const data = JSON.parse(fs.readFileSync(guildPath));
				if (!data.name.includes(guild.name))
				{
					data.name.push(guild.name);
					fs.writeFileSync(guildPath, JSON.stringify(data));
				}
				if(!data.hello)
				{
					data.hello = false;
				}
				if(!data.goodbye)
				{
					data.goodbye = false;
				}
				if(!data.helloChannel)
				{
					data.helloChannel = null;
				}
				if(!data.goodbyeChannel)
				{
					data.goodbyeChannel = null;
				}
				if(!data.rulesChannel)
				{
					data.rulesChannel = null;
				}
				if(!data.welcomeMessage)
				{
					data.welcomeMessage = null;
				}
				if(!data.goodbyeMessage)
				{
					data.goodbyeMessage = null;
				}
				if(!data.rulesMessage)
				{
					data.rulesMessage = null;
				}
				if(!data.modChannel)
				{
					data.modChannel = null;
				}
				fs.writeFileSync(guildPath, JSON.stringify(data));
			}
		});

	},
};
