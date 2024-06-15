//guildMemberRemove
const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberRemove,
    once: false,
    execute(args) {
        const { guild, user } = args;
        const channel = guild.channels.cache.find(channel => ['goodbye', 'bye', 'left', 'leaving', 'wyjścia'].includes(channel.name));
        if (!channel) return;
        const embed = new EmbedBuilder()
            .setTitle(`Goodbye ${user.username}!`)
            .setDescription(`Goodbye ${user.username}!`)
            .setColor('#ff0000')
            .setThumbnail(user.avatarURL())
            .setTimestamp();
        channel.send({ embeds: [embed] });
    }
};