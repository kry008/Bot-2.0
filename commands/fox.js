function returnCat() {
    return fetch('https://randomfox.ca/floof/')
        .then(response => response.json())
        .then(data => data.image);
}

module.exports = {
    name: 'fox',
    description: 'Get a random fox picture',
    help: 'Get a random fox picture',
    arguments: [],
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