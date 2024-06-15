const { Events, EmbedBuilder } = require('discord.js');
function randomColor() {
    const r = Math.floor(Math.random() * 200) + 50;
    const g = Math.floor(Math.random() * 200) + 50;
    const b = Math.floor(Math.random() * 200) + 50;
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}
module.exports = {
	name: Events.GuildMemberAdd,
    once: false,
    execute(args) {
        const { guild, user } = args;
        const channel = guild.channels.cache.find(channel => ['new-member', 'new-users', 'hello', 'welcome'].includes(channel.name));
        //find rules channel
        const rulesChannel = guild.channels.cache.find(channel => ['rules', 'regulations', 'regulamin'].includes(channel.name));
        if (!channel) return;
        if(!rulesChannel) var text = 'Please read the rules in rules channel.';
        else var text = `Please read the rules in ${rulesChannel} channel.`;
        const embed = new EmbedBuilder()
            .setTitle(`Welcome ${user.username}!`)
            .setDescription(`Welcome to ${guild.name}! \n${text}`)
            .setColor(randomColor())
            .setThumbnail(user.avatarURL())
            .setTimestamp();
        channel.send({ embeds: [embed] });

    }
};