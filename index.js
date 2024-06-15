//Author: KRY008
const { Client, Events, GatewayIntentBits, Collection, PermissionsBitField } = require('discord.js');
const { token, prefix, wwwport } = require('./config.json');
const fs = require('fs');
const path = require('path');
/*var http = require('http');
http.createServer(function (req, res) {
    //res.write('Strona domowa: Bot v2.0, link zaproszenia: https://discord.com/oauth2/authorize?client_id=883390927383724112');
    var json = {
        "Strona domowa": "Bot v2.0",
        "Link zaproszenia": "https://discord.com/oauth2/authorize?client_id=883390927383724112",
        "Status": "Working"
    };
    res.write(JSON.stringify(json));
    res.end();
  }).listen(wwwport || 8080);
*/
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildIntegrations
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (!command.text) continue;
    client.commands.set(command.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.MessageCreate, message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        if(command.admin && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.reply('You do not have permission to use this command.');
            return;
        }
        if (!command.canBeUsedInDm && !message.guild) {
            message.reply('This command can only be used in a server.');
            return;
        }
        if (command.requireKick && !message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            message.reply('You do not have permission to use this command.');
            return;
        }
        if (command.requireBan && !message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            message.reply('You do not have permission to use this command.');
            return;
        }
        if (command.text) {
            command.execute(message, args);
            message.react('✅');
        }
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
        //react message with an emoji X
        message.react('❌');
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        if(command.admin && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
            return;
        }
        if (!command.canBeUsedInDm && !interaction.guild) {
            await interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
            return;
        }
        if (command.requireKick && !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
            return;
        }
        if (command.requireBan && !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            await interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
            return;
        }
        if (command.slash) {
            await command.executeSlash(interaction);
        }
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(token);
