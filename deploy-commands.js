const { REST, Routes, Integration } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const contextsMapping = {
    GUILD_TEXT: 0, 
    GUILD_VOICE: 1,
    DM: 2          
};

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.slash) {
        const slashCommand = {
            name: command.name,
            description: command.description,
            options: command.options || [],
            default_permission: command.admin ? false : true,
            contexts: command.contexts.map(context => contextsMapping[context]) || [0],
            integration_types: command.integration_types || [0],
        };
        commands.push(slashCommand);
    }
}


const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
