//https://cat-fact.herokuapp.com/facts/random
function returnCatFact() {
    return fetch('https://cat-fact.herokuapp.com/facts/random')
        .then(response => response.json())
        .then(data => data[0].text);
}
module.exports = {
    name: 'catfact',
    description: 'Get a random cat fact',
    help: 'Get a random cat fact',
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
        const catFact = await returnCatFact();
        message.channel.send(catFact);
    },
    executeSlash: async interaction => {
        const catFact = await returnCatFact();
        interaction.reply(catFact);
    },
};