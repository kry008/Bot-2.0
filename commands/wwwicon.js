//https://icon.horse/icon/WEBSITE
function returnIcon(website) {
    //if has http or https, ://, /, remove it
    website = website.replace(/https:\/\//g, '');
    website = website.replace(/http:\/\//g, '');
    website = website.replace(/:\/\//g, '');
    website = website.replace(/\//g, '');
    //if it is not a valid website, return error
    if (website.length < 1) {
        return 'Invalid website';
    }
    //check if regex is valid
    const regex = new RegExp('^[a-z0-9]+\\.[a-z]{2,6}$', 'i');
    if (!regex.test(website)) {
        return 'Invalid website';
    }
    return `https://icon.horse/icon/${website}`;
}

module.exports = {
    name: 'wwwicon',
    description: 'Get a website icon',
    help: 'Get a website icon',
    options: [
        {
            name: 'website',
            description: 'The website you want the icon of, only top level domains are allowed (example.com)',
            type: 3,
            required: true,
        },
    ],
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
        const icon = await returnIcon(args[0]);
        message.channel.send(icon);
    },
    executeSlash: async interaction => {
        const icon = await returnIcon(interaction.options.getString('website'));
        interaction.reply(icon);
    },
};