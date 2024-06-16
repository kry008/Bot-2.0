const fs = require('fs');
module.exports = {
    name: 'newusermsg',
    description: 'Edit the message that is sent when a new user joins the server, use {{USER}} to mention the user.',
    help: 'Function to edit the message that is sent when a new user joins the server, use {{USER}} to mention the user.',
    //enabled/disabled, title, description, channel
    options: [
        {
            name: 'enabled',
            description: 'Enable or disable the welcome message',
            type: 5,
            required: true,
        },
        {
            name: 'title',
            description: 'Title of the welcome message',
            type: 3,
            required: false,
        },
        {
            name: 'description',
            description: 'Description of the welcome message, use {{USER}} to mention the user',
            type: 3,
            required: false,
        },
        {
            name: 'channel',
            description: 'Channel to send the welcome message',
            type: 7,
            required: false,
        }
    ],
    slash: true,
    text: true,
    admin: true,
    requireKick: true,
    requireBan: true,
    canBeUsedInDm: false,
    contexts: ['GUILD_TEXT'],
    integration_types: [0, 1],
    execute(message, args) {
        message.channel.send('This command can only be used as a slash command.');
    },
    executeSlash(interaction) {
        //check if it is from guild
        if (!interaction.guild) {
            interaction.reply('This command can only be used in a server.');
            return;
        }
        //check if bot is on this guild
        if (!interaction.guild.available) {
            interaction.reply('The bot is not available on this server.');
            return;
        }
        //check if the user has the required permissions
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            interaction.reply('You need to have the administrator permission to use this command.');
            return;
        }
        //check if all the required arguments are provided
        if(!interaction.options.getBoolean('enabled') || !interaction.options.getString('title') || !interaction.options.getString('description') || !interaction.options.getChannel('channel')) {
            interaction.reply('Please provide all the required information.');
            return;
        }
        const enabled = interaction.options.getBoolean('enabled');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const channel = interaction.options.getChannel('channel');
        const filePath = `./guilds/guilds-${interaction.guild.id}.json`;
        
        if(enabled === null || title === null || description === null || channel === null) {
            interaction.reply('Please provide all the required information.');
            return;
        }
        //check if the channel is a text channel
        if(channel.type !== 0) {
            interaction.reply('Please provide a text channel.');
            return;
        }
        
        if(enabled === false) {
            //get data from file
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath));
                data.hello = false;
                data.helloChannel = null;
                data.welcomeMessage.title = null;
                data.welcomeMessage.content = null;
                fs.writeFileSync(filePath, JSON.stringify(data));
            }
            interaction.reply('Welcome message disabled.');
            return;
        }
        else
        {
            //get data from file
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath));
                data.hello = true;
                data.helloChannel = channel.id;
                data.welcomeMessage.title = title;
                data.welcomeMessage.content = description;
                fs.writeFileSync(filePath, JSON.stringify(data));
            }
            interaction.reply('Welcome message enabled.');
            return;
        }

        
    },
};
