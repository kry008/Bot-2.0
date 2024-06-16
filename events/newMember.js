const { Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');
function randomColor() {
    const r = Math.floor(Math.random() * 200) + 50;
    const g = Math.floor(Math.random() * 200) + 50;
    const b = Math.floor(Math.random() * 200) + 50;
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    execute(member) {
        const { guild, user } = member;
        const filePath = `./guilds/guilds-${guild.id}.json`;

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath));

            if (!data.hello || !data.helloChannel) return;

            let title = data.welcomeMessage && data.welcomeMessage.title ? data.welcomeMessage.title : "👋 Welcome!";
            let description = data.welcomeMessage && data.welcomeMessage.content ? data.welcomeMessage.content.replace("{{USER}}", user.username) : `Welcome to the server, ${user.username}!`;
            if(data.rulesChannel == null || data.rulesMessage == null)
            {   
                
            }
            else
            {
                //data.rulesMessage + #data.rulesChannel
                description += "\n" + data.rulesMessage;
                //replace {{RULES}} with the rules channel
                description = description.replace("{{RULES}}", `<#${data.rulesChannel}>`);
            }

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(randomColor())
                .setThumbnail(user.avatarURL())
                .setTimestamp();

            guild.channels.fetch(data.helloChannel)
                .then(channel => {
                    if (channel) {
                        channel.send({ embeds: [embed] })
                            .catch(console.error);
                    } else {
                        console.error("Welcome channel not found.");
                    }
                })
                .catch(
                    //if the channel is not found, set the welcome channel to null and hello to false
                    data.helloChannel = null,
                    data.hello = false,
                    fs.writeFileSync(filePath, JSON.stringify(data))
                    
                );
        } else {
            return;
        }
    }
};
