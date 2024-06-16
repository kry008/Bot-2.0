const { Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute(member) {
        const { guild, user } = member;
        const filePath = `./guilds/guilds-${guild.id}.json`;

        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath));

            if (!data.goodbye || !data.goodbyeChannel) return;

            let title = data.goodbyeMessage.title;
            let description = data.goodbyeMessage.content ? data.goodbyeMessage.content.replace("{{USER}}", user.username) : `Goodbye ${user.username}!`;

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor("#ff0000")
                .setThumbnail(user.avatarURL())
                .setTimestamp();
            
            guild.channels.fetch(data.goodbyeChannel)
                .then(channel => {
                    if (channel) {
                        channel.send({ embeds: [embed] })
                            .catch(console.error);
                    } else {
                        console.error("Goodbye channel not found.");
                    }
                })
                .catch(console.error);
        }
        else
        {
            return;
        }
    }
};