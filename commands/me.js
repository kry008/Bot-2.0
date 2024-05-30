module.exports = {
    name: 'me',
    description: 'Get info about me',
    help: 'Get info about me',
    options: [],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        var user = message.author;
        var member = message.guild.member(user);
        var roles = member.roles.cache.map(role => role.name);
        var rolesString = roles.join(', ');
        var globalName = message.author.username;
        var doIHaveNitro = member.premium_since;
        var iAmBot = message.author.bot;
        var toSend = "";
        toSend = `User: ${user.tag}\nGlobal name: ${globalName}\nID: ${user.id}\nRoles: ${rolesString}`;
        if(doIHaveNitro) {
            toSend += `\nNitro since: ${doIHaveNitro}`;
        }
        if(iAmBot) {
            toSend += `\nI am a bot`;
        }
        message.channel.send(toSend);
    },
    executeSlash(interaction) {
        var user = interaction.member.user;
        var member = interaction.member;
        var roles = member.roles.cache.map(role => role.name);
        var rolesString = roles.join(', ');
        var globalName = interaction.member.user.username;
        var doIHaveNitro = interaction.member.premium_since;
        var iAmBot = interaction.member.user.bot;
        var toSend = "";
        toSend = `User: ${user.tag}\nGlobal name: ${globalName}\nID: ${user.id}\nRoles: ${rolesString}`;
        if(doIHaveNitro) {
            toSend += `\nNitro since: ${doIHaveNitro}`;
        }
        if(iAmBot) {
            toSend += `\nI am a bot`;
        }
        interaction.reply(toSend);
    },
};
