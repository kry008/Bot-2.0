const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildCreate,
    once: false,
    execute(guild) {
        console.log(`Joined guild ${guild.name}`);
    }
};