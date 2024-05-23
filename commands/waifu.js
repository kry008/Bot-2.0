//waifu img
function returnWaifu(type) {
    //check if the type is valid
    const validTypes = ['waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'];
    if (!validTypes.includes(type)) {
        return 'Invalid type';
    }
    return fetch(`https://api.waifu.pics/sfw/${type}`)
        .then(response => response.json())
        .then(data => data.url);
}

module.exports = {
    //make choose list
    name: 'waifu',
    description: 'Get a random waifu picture',
    help: 'Get a random waifu picture with the type you want',
    options: [
        {
            name: 'type',
            description: 'The type of waifu picture you want',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'waifu',
                    value: 'waifu',
                },
                {
                    name: 'neko',
                    value: 'neko',
                },
                {
                    name: 'shinobu',
                    value: 'shinobu',
                },
                {
                    name: 'megumin',
                    value: 'megumin',
                },
                {
                    name: 'cuddle',
                    value: 'cuddle',
                },
                {
                    name: 'cry',
                    value: 'cry',
                },
                {
                    name: 'hug',
                    value: 'hug',
                },
                {
                    name: 'awoo',
                    value: 'awoo',
                },
                {
                    name: 'kiss',
                    value: 'kiss',
                },
                {
                    name: 'pat',
                    value: 'pat',
                },
                {
                    name: 'smug',
                    value: 'smug',
                },
                {
                    name: 'bonk',
                    value: 'bonk',
                },
                {
                    name: 'blush',
                    value: 'blush',
                },
                {
                    name: 'smile',
                    value: 'smile',
                },
                {
                    name: 'wave',
                    value: 'wave',
                },
                {
                    name: 'highfive',
                    value: 'highfive',
                },
                {
                    name: 'handhold',
                    value: 'handhold',
                },
                {
                    name: 'nom',
                    value: 'nom',
                },
                {
                    name: 'bite',
                    value: 'bite',
                },
                {
                    name: 'slap',
                    value: 'slap',
                },
                {
                    name: 'happy',
                    value: 'happy',
                },
                {
                    name: 'wink',
                    value: 'wink',
                },
                {
                    name: 'poke',
                    value: 'poke',
                },
                {
                    name: 'dance',
                    value: 'dance',
                },
            ],
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    premium: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute: async (message, args) => {
        const waifu = await returnWaifu(args[0]);
        message.channel.send(waifu);
    },
    executeSlash: async interaction => {
        const waifu = await returnWaifu(interaction.options.getString('type'));
        interaction.reply(waifu);
    },
};