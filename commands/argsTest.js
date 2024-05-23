module.exports = {
    name: 'argumentstest',
    description: 'Test command for args',
    help: 'This command is used to test the arguments of a command',
    options: [
        {
            name: 'type3',
            type: 3, 
            description: 'STRING',
            required: false
        },
        {
            name: 'type4',
            type: 4, 
            description: 'INTEGER',
            required: false
        },
        {
            name: 'type5',
            type: 5, 
            description: 'BOOLEAN',
            required: false
        },
        {
            name: 'type6',
            type: 6, 
            description: 'USER',
            required: false
        },
        {
            name: 'type7',
            type: 7, 
            description: 'CHANNEL',
            required: false
        },
        {
            name: 'type8',
            type: 8, 
            description: 'ROLE',
            required: false
        },
        {
            name: 'type9',
            type: 9, 
            description: 'MENTIONABLE',
            required: false
        },
        {
            name: 'type10',
            type: 10, 
            description: 'NUMBER',
            required: false
        },
        {
            name: 'type11',
            type: 11, 
            description: 'ATTACHMENT',
            required: false
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    premium: false,
    contexts: ['GUILD_TEXT', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        message.channel.send('Arguments test command executed');
        var txt = '';
        if(args) {
            for (var key in args) {
                txt += key + ': ' + args[key] + '\n';
            }
        }
        message.channel.send(txt);
    },
    executeSlash(interaction) {
        var stringToReturn = 'Arguments test command executed\n';
        //get which type of argument was passed, and return the value
        if(interaction.options.getString('type3')) {
            stringToReturn += 'type3: ' + interaction.options.getString('type3') + '\n';
        }
        if(interaction.options.getInteger('type4')) {
            stringToReturn += 'type4: ' + interaction.options.getInteger('type4') + '\n';
        }
        if(interaction.options.getBoolean('type5')) {
            stringToReturn += 'type5: ' + interaction.options.getBoolean('type5') + '\n';
        }
        if(interaction.options.getUser('type6')) {
            stringToReturn += 'type6: ' + interaction.options.getUser('type6').username + '\n';
        }
        if(interaction.options.getChannel('type7')) {
            stringToReturn += 'type7: ' + interaction.options.getChannel('type7').name + '\n';
        }
        if(interaction.options.getRole('type8')) {
            stringToReturn += 'type8: ' + interaction.options.getRole('type8').name + '\n';
        }
        if(interaction.options.getMentionable('type9')) {
            stringToReturn += 'type9: ' + interaction.options.getMentionable('type9').name + '\n';
        }
        if(interaction.options.getNumber('type10')) {
            stringToReturn += 'type10: ' + interaction.options.getNumber('type10') + '\n';
        }
        if(interaction.options.getMessage('type11')) {
            stringToReturn += 'type11: ' + interaction.options.getMessage('type11').content + '\n';
        }
        
        interaction.reply(stringToReturn);
    },
};
