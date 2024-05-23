function returnCat() {
    return fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => data[0].url);
}

module.exports = {
    name: 'cat',
    description: 'Get a random cat picture',
    help: 'Get a random cat picture',
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
        const cat = await returnCat();
        message.channel.send(cat);
    },
    executeSlash: async interaction => {
        const cat = await returnCat();
        interaction.reply(cat);
    },
};