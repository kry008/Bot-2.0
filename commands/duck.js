//https://random-d.uk/api/v2/random
function returnDuck() {
    return fetch('https://random-d.uk/api/v2/random')
        .then(response => response.json())
        .then(data => data.url);
}
module.exports = {
    name: 'duck',
    description: 'Get a random duck picture',
    help: 'Get a random duck picture',
    options: [],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    premium: false,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute: async (message, args) => {
        const duck = await returnDuck();
        message.channel.send(duck);
    },
    executeSlash: async interaction => {
        const duck = await returnDuck();
        interaction.reply(duck);
    },
};