module.exports = {
    name: 'ping',
    description: 'Ping!',
    help: 'Ping!',
    arguments: [],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    premium: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        message.channel.send('Pong!');
    },
    executeSlash(interaction) {
        interaction.reply('Pong.');
    },
};
