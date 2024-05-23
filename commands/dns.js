const dns = require('dns');

module.exports = {
    name: 'dns',
    description: 'Look what is the IP of a domain. Requires a domain as argument.',
    help: 'Look what is the IP of a domain. Requires a domain as argument.',
    arguments: [
        {
            name: 'domain',
            type: 'STRING',
            description: 'The domain to look up',
            required: true,
        },
    ],
    options: [
        {
            name: 'domain',
            type: 3, // String type
            description: 'The domain to look up',
            required: true
        }
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    premium: false,
    requireBan: false,
    canBeUsedInDm: true,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    execute(message, args) {
        const domain = args[0];
        if (!domain) {
            message.channel.send('You need to provide a domain.');
            return;
        }
        var ipv4 = '';
        var ipv6 = '';
        dns.lookup(domain, { family: 4 }, (err, addresses) => {
            if (err) {
                ipv4 = 'Error: not found';
            } else {
                ipv4 = 'IP: ' + addresses;
            }
            dns.lookup(domain, { family: 6 }, (err, addresses) => {
                if (err) {
                    ipv6 = 'Error: not found';
                } else {
                    ipv6 = 'IP: ' + addresses;
                }
                message.channel.send('IPv4: ' + ipv4 + '\nIPv6: ' + ipv6);
            });
        })
    },
    executeSlash(interaction) {
        const domain = interaction.options.getString('domain');
        if (!domain) {
            interaction.reply('You need to provide a domain.');
            return;
        }
        var ipv4 = '';
        var ipv6 = '';
        dns.lookup(domain, { family: 4 }, (err, addresses) => {
            if (err) {
                ipv4 = 'Error: not found';
            } else {
                ipv4 = 'IP: ' + addresses;
            }
            dns.lookup(domain, { family: 6 }, (err, addresses) => {
                if (err) {
                    ipv6 = 'Error: not found';
                } else {
                    ipv6 = 'IP: ' + addresses;
                }
                interaction.reply('IPv4: ' + ipv4 + '\nIPv6: ' + ipv6);
            });
        })
    },
};
