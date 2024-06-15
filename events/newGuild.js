const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: Events.GuildCreate,
    once: false,
    execute(guild) {
        console.log(`Joined guild ${guild.name}`);
        const guildPath = `./guilds-${new Date().toISOString().split('T')[0]}.txt`;
        //save name - id - time of joining
        fs.appendFileSync(guildPath, `JOIN: \`${guild.name}\` - ${guild.id} - ${new Date().toLocaleString()}\n`);
    }
};