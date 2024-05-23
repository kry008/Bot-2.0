function returnDog() {
  return fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => data.message);
}

module.exports = {
  name: 'dog',
  description: 'Get a random dog picture',
  help: 'Get a random dog picture',
  arguments: [],
  options: [],
  slash: true,
  text: true,
  admin: false,
  requireKick: false,
  requireBan: false,
  canBeUsedInDm: true,
  premium: false,
  contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
  integration_types: [0,1],
  execute: async (message, args) => {
    const dog = await returnDog();
    message.channel.send(dog);
  },
  executeSlash: async interaction => {
    const dog = await returnDog();
    interaction.reply(dog);
  },
};