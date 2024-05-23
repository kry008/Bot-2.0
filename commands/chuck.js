//https://api.chucknorris.io/jokes/random
function randomChuck() {
    return fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => data.value);
}
module.exports = {
    name: 'chuck',
    description: 'Get a random Chuck Norris joke',
    help: 'Get a random Chuck Norris joke',
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
        const chuck = await randomChuck();
        message.channel.send(chuck);
    },
    executeSlash: async interaction => {
        const chuck = await randomChuck();
        interaction.reply(chuck);
    },
};