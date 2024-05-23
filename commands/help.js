//optiona name of the command
var fs = require('fs');
function getAllCommands(client) {
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    const allCommands = [];
    for (const file of commandFiles) {
        const command = require(`./${file}`);
        allCommands.push(command);
    }
    return allCommands;
}
function allCommandsNames(guild = true)
{
    //check if it is in dm or guild
    if(guild)
    {
        const commands = getAllCommands();
        let str = '';
        for(const command of commands)
        {
            if(command.admin === false)
                str += command.name + '\n';
        }
        return str;
    }
    else
    {
        const commands = getAllCommands();
        let str = '';
        for(const command of commands)
        {
            if(command.canBeUsedInDm)
                if(command.admin === false)
                    str += command.name + '\n';
        }
        return str;
    }
}
function getCommand(name, guild = true)
{
    //check if it is in dm or guild
    if(guild)
    {
        const commands = getAllCommands();
        for(const command of commands)
        {
            if(command.name === name)
                return command;
        }
    }
    else
    {
        const commands = getAllCommands();
        for(const command of commands)
        {
            if(command.name === name && command.canBeUsedInDm)
                return command;
        }
    }
    return null;
}
module.exports = {
    name: 'help',
    description: 'Get help with a command',
    help: 'Get help with a command, you can also get a list of all commands',
    options: [
        {
            name: 'command',
            description: 'The command you want to get help with',
            type: 3,
            required: false,
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute: async (message, args) => {
        if(args.length === 0)
        {
            const commands = allCommandsNames();
            message.channel.send(commands);
            return;
        }
        const command = getCommand(args[0]);
        if(command === null)
        {
            //send all commands
            const commands = allCommandsNames();
            return;
        }
        message.channel.send('Name: ' + command.name + '\nDescription: ' + command.description + '\nHelp: ' + command.help);
    },
    executeSlash: async interaction => {
        const command = getCommand(interaction.options.getString('command'));
        if(command === null)
        {
            //send all commands
            const commands = allCommandsNames();
            interaction.reply(commands);
            return;
        }
        interaction.reply('Name: ' + command.name + '\nDescription: ' + command.description + '\nHelp: ' + command.help);
    },
};
