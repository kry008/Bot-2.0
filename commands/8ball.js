function eightBall() {
    //yes - 999:2000
    //no - 999:2000
    //maybe - 1:1000
    var rand = Math.floor(Math.random() * 3000);
    if(rand < 1000) {
        return "Yes";
    } else if(rand < 2000) {
        return "No";
    } else {
        return "Maybe";
    }
}

module.exports = {
    name: '8ball',
    description: 'Yes or No?',
    help: 'Yes or No?',
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
        message.channel.send(eightBall());
    },
    executeSlash(interaction) {
        interaction.reply(eightBall());
    },
};
