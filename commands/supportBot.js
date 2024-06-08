const { EmbedBuilder } = require('discord.js');
function randomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

module.exports = {
    name: 'supportbot',
    description: 'How to support bot development?',
    help: 'How to support bot development?',
    options: [],
    slash: false,
    text: false,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        const msg = {
            color: 0x0099ff,
            title: 'Some title',
            url: 'https://discord.js.org',
            author: {
                name: 'Some name',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.js.org',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        message.reply({ embeds: msg });
    },
    executeSlash(interaction) {
        const msg = {
            color: 0x0099ff,
            title: 'Some title',
            url: 'https://discord.js.org',
            author: {
                name: 'Some name',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
                url: 'https://discord.js.org',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            fields: [
                {
                    name: 'Regular field title',
                    value: 'Some value here',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            image: {
                url: 'https://i.imgur.com/AfFp7pu.png',
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/AfFp7pu.png',
            },
        };
        interaction.reply({ embeds: msg });
    },
};
