//https://date.nager.at/api/v3/LongWeekend/year/country_two_letter_code
function returnLongWeekends(year, country) {
    //check if year is -1 or 0 or +1
    var currentYear = new Date().getFullYear();
    if (year < currentYear - 1 || year > currentYear + 1) {
        return 'Invalid year, you can only check for the **current year, previous year or next year.**';
    }
    return fetch(`https://date.nager.at/api/v3/LongWeekend/${year}/${country}`)
        .then(response => response.json())
        .then(data => data);
}

module.exports = {
    name: 'longweekends',
    description: 'Get long weekends for a specific year and country',
    help: 'Get long weekends for a specific year and country',
    options: [
        {
            name: 'year',
            description: 'Year to check for long weekends',
            type: 4,
            required: true,
        },
        {
            name: 'country',
            description: 'Country to check for long weekends, two letter code e.g. US, GB, CA, DE, FR, etc.',
            type: 3,
            required: true,
        },
    ],
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    premium: false,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0, 1],
    execute: async (message, args) => {
        try {
            const year = args[0];
            const country = args[1].toUpperCase();
            const longWeekends = await returnLongWeekends(year, country);
            if (longWeekends.length === 0) {
                interaction.reply('Invalid country code or no long weekends for the specified year and country.');
            }
            else
            {
                if (typeof longWeekends === 'string') {
                    message.channel.send(longWeekends);
                }
                else {
                    var longWeekendsString = 'Start Date \tEnd Date \t\tDay Count\n';
                    longWeekends.forEach(weekend => {
                        longWeekendsString += `${weekend.startDate} \t${weekend.endDate} \t\t${weekend.dayCount}\n`;
                    });
                    message.channel.send(longWeekendsString);
                }
            }
        } catch (error) {
            message.channel.send('Invalid country code or no long weekends for the specified year and country.');
        }
    },
    executeSlash: async interaction => {
        try {
            const year = interaction.options.get('year').value;
            const country = interaction.options.get('country').value.toUpperCase();
            const longWeekends = await returnLongWeekends(year, country);
            //if 0, write wrong contry or no long weekends
            if (longWeekends.length === 0) {
                interaction.reply('Invalid country code or no long weekends for the specified year and country.');
            }
            else
            {
                if (typeof longWeekends === 'string') {
                    interaction.reply(longWeekends);
                }
                else {
                    var longWeekendsString = 'Start Date \tEnd Date \t\tDay Count\n';
                    longWeekends.forEach(weekend => {
                        longWeekendsString += `${weekend.startDate} \t${weekend.endDate} \t\t${weekend.dayCount}\n`;
                    });
                    interaction.reply(longWeekendsString);
                }
            }
        } catch (error) {
            interaction.reply('Invalid country code or no long weekends for the specified year and country.');
        }
        
    },
};
