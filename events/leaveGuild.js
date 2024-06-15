const { Events } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: Events.GuildDelete,
    once: false,
    execute(args) {
        console.log(`Left guild ${args.name}`);
        //guilds-YYYY-MM.txt
        const guildPath = `./guilds-${new Date().toISOString().split('T')[0]}.txt`;
        //save name - id - time of leaving
        fs.appendFileSync(guildPath, `LEAVE: \`${args.name}\` - ${args.id} - ${new Date().toLocaleString()}\n`);
    }
};