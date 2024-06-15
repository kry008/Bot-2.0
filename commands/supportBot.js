const { EmbedBuilder } = require('discord.js');
module.exports = {
    name: 'supportbot',
    description: 'How to support bot development?',
    help: 'How to support bot development?',
    options: [],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute: async (message, args) => {
        message.channel.send({ embeds: [{
            color: 3447003,
            author: {
              name: "kry008",
              icon_url: "https://raw.githubusercontent.com/kry008/kry008.xyz/main/images/logo.webp"
            },
            thumbnail: {
              url: "https://cdn.discordapp.com/avatars/883390927383724112/1fdd55ef73a631edfd680964a28ca280.webp"
            },
            //image: {
            //  url: "http://i.imgur.com/yVpymuV.png"
            //},
            title: "Multitool simple bot",
            url: "https://kry008.xyz/bot",
            description: "Bot made with passion.",
            fields: [{
              name: "To support my projects",
              value: "",
              inline: false
            },
            {
              name: "Patronite.pl",
              value: "[**Patronite**](https://patronite.pl/kry008) - You can support me on Patronite.",
              inline: true
            },
            {
              name: "Ko-fi",
              value: "[**Ko-fi**](https://ko-fi.com/kry008) - You can buy me a coffee (payment not implemented yet).",
              inline: true
            },
            {
              name: "New ides for bot?",
              value: "You can send me on bot [**website**](https://kry008.xyz/bot).",
              inline: false
            },
            {
              name: "To see other projects",
              value: "[**Private git**](https://git.kry008.xyz) or [Github](https://github.com/kry008)",
              inline: false
            },
            {
              name: "\u200b",
              value:"\u200b"
            }],
            timestamp: new Date(),
            footer: {
              icon_url: "https://cdn.discordapp.com/avatars/883390927383724112/1fdd55ef73a631edfd680964a28ca280.webp",
              text: "Mini bot says hello!"
            }
          }]});
    },
    executeSlash: async interaction => {
        interaction.reply({ embeds: [{
            color: 3447003,
            author: {
                name: "kry008",
                icon_url: "https://raw.githubusercontent.com/kry008/kry008.xyz/main/images/logo.webp"
              },
              thumbnail: {
                url: "https://cdn.discordapp.com/avatars/883390927383724112/1fdd55ef73a631edfd680964a28ca280.webp"
              },
              //image: {
              //  url: "http://i.imgur.com/yVpymuV.png"
              //},
              title: "Multitool simple bot",
              url: "https://kry008.xyz/bot",
              description: "Bot made with passion.",
              fields: [{
                name: "To support my projects",
                value: "",
                inline: false
              },
              {
                name: "Patronite.pl",
                value: "[**Patronite**](https://patronite.pl/kry008) - You can support me on Patronite.",
                inline: true
              },
              {
                name: "Ko-fi",
                value: "[**Ko-fi**](https://ko-fi.com/kry008) - You can buy me a coffee (payment not implemented yet).",
                inline: true
              },
              {
                name: "New ides for bot?",
                value: "You can send me on bot [**website**](https://kry008.xyz/bot).",
                inline: false
              },
              {
                name: "To see other projects",
                value: "[**Private git**](https://git.kry008.xyz) or [Github](https://github.com/kry008)",
                inline: false
              },
              {
                name: "\u200b",
                value:"\u200b"
              }],
              timestamp: new Date(),
              footer: {
                icon_url: "https://cdn.discordapp.com/avatars/883390927383724112/1fdd55ef73a631edfd680964a28ca280.webp",
                text: "Mini bot says hello!"
              }
            }]});
    },
};