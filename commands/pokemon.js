const fs = require('fs');
//read files databases/pokemon_games.json and databases/pokemon.json
const pokemon_games = JSON.parse(fs.readFileSync('databases/pokemon_games.json'));
const pokemon = JSON.parse(fs.readFileSync('databases/pokemon.json'));

function randomPokemon() {
    //connect data from pokemon.json and pokemon_games.json
    const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
    //find game id in pokemon_games.json
    const game = pokemon_games.find(game => game.id === randomPokemon.first_appeared);
    //get numbers of facts and get random fact
    const fact = null;//randomPokemon.some_facts[Math.floor(Math.random() * randomPokemon.some_facts.length)];
    //get types of pokemon
    const types = randomPokemon.type.join(', ');
    return `**${randomPokemon.name}**\nTypes: ${types}\nHeight: ${randomPokemon.height}\nWeight: ${randomPokemon.weight}\nFirst appeared in: ${game.name} (${game.year})\n${fact}\n${randomPokemon.img}`;
}

function pokemonNumber(number) {
    const pokemonNumber = pokemon.find(pokemon => pokemon.number === number);
    if (!pokemonNumber) {
        return 'Pokemon not found **FUNCTION NOT FINISHED**';
    }
    const game = pokemon_games.find(game => game.id === pokemonNumber.first_appeared);
    const fact = null; //pokemonNumber.some_facts[Math.floor(Math.random() * pokemonNumber.some_facts.length)];
    const types = pokemonNumber.type.join(', ');
    return `**${pokemonNumber.name}**\nTypes: ${types}\nHeight: ${pokemonNumber.height}\nWeight: ${pokemonNumber.weight}\nFirst appeared in: ${game.name} (${game.year})\n${pokemonNumber.img}`;
}

function pokemonName(name) {
    const pokemonName = pokemon.find(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
    if (!pokemonName) {
        return 'Pokemon not found **FUNCTION NOT FINISHED**';
    }
    const game = pokemon_games.find(game => game.id === pokemonName.first_appeared);
    const fact = null;//pokemonName.some_facts[Math.floor(Math.random() * pokemonName.some_facts.length)];
    const types = pokemonName.type.join(', ');
    return `**${pokemonName.name}**\nTypes: ${types}\nHeight: ${pokemonName.height}\nWeight: ${pokemonName.weight}\nFirst appeared in: ${game.name} (${game.year})\n${pokemonName.img}`;
}

module.exports = {
    name: 'pokemon',
    description: 'Get a random pokemon. **FUNCTION NOT FINISHED**',
    help: 'Get a random pokemon. **FUNCTION NOT FINISHED**',
    options: [
        {
            name: 'pokemonname',
            type: 3, // String type
            description: 'Name of the pokemon you want to get information about',
            required: false
        },
        {
            name: 'pokemonnumber',
            type: 4, // Integer type
            description: 'Number of the pokemon you want to get information about',
            required: false
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
    integration_types: [0,1],
    execute: async (message, args) => {
        if(args.length === 0) {
            const pokemon = randomPokemon();
            message.channel.send(pokemon);
            return;
        }
        //check if it is a number
        if(!isNaN(args[0])) {
            const pokemon = pokemonNumber(parseInt(args[0]));
            message.channel.send(pokemon);
            return;
        }
        //check if it is a string
        const pokemon = pokemonName(args.join(' '));
        return message.channel.send(pokemon);


    },
    executeSlash: async interaction => {
        const name = interaction.options.getString('pokemonname');
        const number = interaction.options.getInteger('pokemonnumber');
        if (!name && !number) {
            const pokemon = randomPokemon();
            interaction.reply(pokemon);
            return;
        }
        if (number) {
            const pokemon = pokemonNumber(number);
            interaction.reply(pokemon);
            return;
        }
        const pokemon = pokemonName(name);
        interaction.reply(pokemon);
    },
};