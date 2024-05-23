//https://date.nager.at/api/v3/IsTodayPublicHoliday/pl?offset=0 & https://date.nager.at/api/v3/NextPublicHolidays/country_two_letter_code
function returnFreeDay(country) {
    //if 200, return true
    //if 204, return false
    //if 400, return 'Invalid country code'
    var url = `https://date.nager.at/api/v3/IsTodayPublicHoliday/${country}`;
    return fetch(url)
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            else if (response.status === 204) {
                return false;
            }
            else {
                return 'Invalid country code';
            }
        });
}
function returnNextFreeDay(country) {
    /*
    [
  {
    "date": "2024-05-30",
    "localName": "Boże Ciało",
    "name": "Corpus Christi",
    "countryCode": "PL",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {
    "date": "2024-08-15",
    "localName": "Wniebowzięcie Najświętszej Maryi Panny",
    "name": "Assumption Day",
    "countryCode": "PL",
    "fixed": false,
    "global": true,
    "counties": null,
    "launchYear": null,
    "types": [
      "Public"
    ]
  },
  {*/
  //show only 3 next holidays
    var url = `https://date.nager.at/api/v3/NextPublicHolidays/${country}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data);
}

module.exports = {
    name: 'freeday',
    description: 'Check if today is a public holiday in a specific country or get the next public holidays',
    help: 'Check if today is a public holiday in a specific country or get the next public holidays',
    options: [
        {
            name: 'country',
            description: 'Country to check for public holidays, two letter code e.g. US, GB, CA, DE, FR, etc.',
            type: 3,
            required: true,
        }
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
    executeSlash: async interaction => {
        try {
            var toReturn = '';
            const country = interaction.options.get('country').value.toUpperCase();
            const nextFreeDay = await returnNextFreeDay(country);
            const isFreeDay = await returnFreeDay(country);
            if (nextFreeDay.length === 0) {
                interaction.reply('Invalid country code or no public holidays for the specified country.');
            }
            else
            {
                var nextFreeDayString = 'Date \tName\n';
                nextFreeDay.slice(0, 3).forEach(holiday => {
                    nextFreeDayString += `${holiday.date} \t${holiday.name}\n`;
                });
                toReturn += nextFreeDayString;
            }
            if (isFreeDay === true) {
                toReturn += 'Today is a public holiday in the specified country.';
            }
            else if (isFreeDay === false) {
                toReturn += 'Today is not a public holiday in the specified country.';
            }
            else {
                toReturn += isFreeDay;
            }
            interaction.reply(toReturn);
        } catch (error) {
            interaction.reply('Invalid country code or no public holidays for the specified country.');
        }
    },
    execute: async (message, args) => {
        try {
            const country = args[0].toUpperCase();
            const nextFreeDay = await returnNextFreeDay(country);
            if (nextFreeDay.length === 0) {
                message.channel.send('Invalid country code or no public holidays for the specified country.');
            }
            else
            {
                var nextFreeDayString = 'Date \tName\n';
                nextFreeDay.slice(0, 3).forEach(holiday => {
                    nextFreeDayString += `${holiday.date} \t${holiday.name}\n`;
                });
                message.channel.send(nextFreeDayString);
            }
            const isFreeDay = await returnFreeDay(country);
            if (isFreeDay === true) {
                message.channel.send('Today is a public holiday in the specified country.');
            }
            else if (isFreeDay === false) {
                message.channel.send('Today is not a public holiday in the specified country.');
            }
            else {
                message.channel.send(isFreeDay);
                
            }
            
        } catch (error) {
            message.channel.send('Invalid country code or no public holidays for the specified country.');
        }
    }
};