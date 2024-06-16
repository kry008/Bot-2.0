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
        const guildPath2 = `./guilds/guilds-${guild.id}.json`;
			if (!fs.existsSync(guildPath2)) {
                fs.writeFileSync(guildPath2, JSON.stringify({ id: guild.id, name: [guild.name], premium: false, prefix: prefix, premium:false, prefix:"^", hello: false, goodbye: true, helloChannel: null, goodbyeChannel: null, rulesChannel: null, welcomeMessage: { title: "Say hello", content: "Hello {{USER}}"}, goodbyeMessage: { title: "Say goodbye", content: "Goodbye {{USER}}"}, rulesMessage: null}));
            }
            else
            {
                const data = JSON.parse(fs.readFileSync(guildPath2));
                if (!data.name.includes(guild.name))
                {
                    data.name.push(guild.name);
                    fs.writeFileSync(guildPath2, JSON.stringify(data));
                }
            }
    }
};