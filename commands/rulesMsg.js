const fs = require('fs');
module.exports = {
    name: 'rulesmsg',
    description: 'Enable or disable the rules message and edit the rules message.',
    help: 'Use {{RULES}} to mention the rules channel',
    options: [
        {
            name: 'enabled',
            description: 'Enable or disable the rules message',
            type: 5,
            required: true,
        },
        {
            name: 'ruleline',
            description: 'Description of the rules message, use {{RULES}} to mention the rules channel',
            type: 3,
            required: false,
        },
        {
            name: 'channel',
            description: 'Channel to send the rules message',
            type: 7,
            required: false,
        }
    ],
    slash: true,
    text: true,
    admin: true,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: false,
    contexts: ['GUILD_TEXT'],
    integration_types: [0],
    execute(message, args) {
        message.channel.send('This command can only be used as a slash command.');
    },
    executeSlash(interaction) {
        //check if the user has the required permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            interaction.reply('You need to have the administrator permission to use this command.');
            return;
        }
        //check if all the required arguments are provided
        if(!interaction.options.getBoolean('enabled') || !interaction.options.getString('ruleline') || !interaction.options.getChannel('channel')) {
            interaction.reply('Please provide all the required information.');
            return;
        }
        const enabled = interaction.options.getBoolean('enabled');
        const ruleline = interaction.options.getString('ruleline');
        const channel = interaction.options.getChannel('channel');
        const filePath = `./guilds/guilds-${interaction.guild.id}.json`;
        
        if(enabled === null || ruleline === null || channel === null) {
            interaction.reply('Please provide all the required information.');
            return;
        }
        
        if(channel.type !== 0) {
            interaction.reply('Please provide a text channel.');
            return;
        }
        if (enabled) {
            const data = JSON.parse(fs.readFileSync(filePath));
            data.rulesMessage = ruleline;
            data.rulesChannel = channel.id;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        }
        else {
            const data = JSON.parse(fs.readFileSync(filePath));
            data.rulesMessage = null;
            data.rulesChannel = null;
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        }
        interaction.reply('Rules message updated successfully.');
    },
};
