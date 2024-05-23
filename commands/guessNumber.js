function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    name: 'guessnumber',
    description: 'Guess a number between 1 and 100',
    help: 'Guess a number between 1 and 100',
    options: [
        {
            name: 'number',
            type: 4,
            description: 'Your guess',
            required: true,
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
    execute(message, args) {
        const guess = parseInt(args[0]);
        const number = getRandomIntInclusive(1, 100);
        if (guess === number) {
            message.reply('You guessed the number!');
        } else {
            message.reply(`The number was ${number}`);
        }
    },
    executeSlash(interaction) {
        const guess = interaction.options.getInteger('number');
        const number = getRandomIntInclusive(1, 100);
        if (guess === number) {
            interaction.reply('You guessed the number!');
        } else {
            interaction.reply(`The number was ${number}`);
        }
    },
};
