module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    help: 'Kicks a user from the server with a reason if provided. Requires the user to have the "Kick Members" permission. Requires the bot to have the "Kick Members" permission.',
    options: [
        {
            name: 'user',
            type: 6,
            description: 'The user to kick',
            required: true,
        },
        {
            name: 'reason',
            type: 3,
            description: 'The reason for the kick',
            required: false,
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: true,
    requireBan: false,
    canBeUsedInDm: false,
    premium: false,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE'],
    integration_types: [0],
    execute: async (message, args) => {
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply('You need to mention a user to kick');
        }
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('That user is not in this server');
        }
        if (!member.kickable) {
            return message.reply('I cannot kick that user');
        }
        const reason = args.slice(1).join(' ') || 'No reason provided';
        await member.kick(reason);
        message.reply(`${user.tag} has been kicked`);
    },
    executeSlash: async interaction => {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply('That user is not in this server');
        }
        if (!member.kickable) {
            return interaction.reply('I cannot kick that user');
        }
        const reason = interaction.options.getString('reason') || 'No reason provided';
        await member.kick(reason);
        interaction.reply(`${user.tag} has been kicked`);
    },
};