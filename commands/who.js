module.exports = {
    name: 'who',
    description: 'Gets data about a user.',
    help: 'Gets data about a user.',
    arguments: [
        {
            name: 'user',
            type: 'User',
            description: 'The user to get data',
            required: false
        }
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    premium: false,
    requireBan: false,
    canBeUsedInDm: false,
    contexts: ['GUILD_TEXT', 'DM'],
    integration_types: [0,1],
    options: [
        {
            name: 'user',
            type: 6, // User type
            description: 'The user to get data',
            required: false
        }
    ],
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        message.channel.send(`Username: ${user.username}\nID: ${user.id}\nCreated at: ${user.createdAt}\nBot: ${user.bot ? '✅' : '❌'}`);
    },
    executeSlash(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        interaction.reply(`Username: ${user.username}\nID: ${user.id}\nCreated at: ${user.createdAt}\nBot: ${user.bot ? '✅' : '❌'}`);
    },
};