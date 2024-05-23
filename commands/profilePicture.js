module.exports = {
    name: 'profilepicture',
    description: 'Get the profile picture of a user.',
    help: 'Get the profile picture of a user.',
    arguments: [
        {
            name: 'user',
            type: 'User',
            description: 'The user to get the profile picture',
            required: false
        }
    ],
    options: [
        {
            name: 'user',
            type: 6, // User type
            description: 'The user to get the profile picture',
            required: false
        }
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    premium: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        message.channel.send(user.displayAvatarURL({ dynamic: true }));
    },
    executeSlash(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        interaction.reply(user.displayAvatarURL({ dynamic: true }));
    },
};