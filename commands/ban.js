module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    help: 'This command is used to ban a user from the server. Requires the user to have the "Ban Members" permission. Requires the bot to have the "Ban Members" permission.',
    arguments: [
        {
            name: 'user',
            type: 'USER',
            description: 'The user to ban',
            required: true,
        },
    ],
    options: [
        {
            name: 'user',
            type: 6,
            description: 'The user to ban',
            required: true,
        },
        {
            name: 'reason',
            type: 3,
            description: 'The reason for the ban',
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
            return message.reply('You need to mention a user to ban');
        }
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('That user is not in this server');
        }
        if (!member.bannable) {
            return message.reply('I cannot ban that user');
        }
        const reason = args.slice(1).join(' ') || 'No reason provided';
        await member.ban({ reason });
        message.reply(`${user.tag} has been banned`);
    },
    executeSlash: async interaction => {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            return interaction.reply('That user is not in this server');
        }
        if (!member.bannable) {
            return interaction.reply('I cannot ban that user');
        }
        const reason = interaction.options.getString('reason') || 'No reason provided';
        await member.ban({ reason });
        interaction.reply(`${user.tag} has been banned`);
    },
};