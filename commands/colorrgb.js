// This command converts a RGB color to HEX, HSL, and CMYK
function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
}

function rgbToHsl(r, g, b) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const lightness = (max + min) / 2;
    if (max === min) {
        return { h: 0, s: 0, l: lightness };
    }
    const d = max - min;
    const saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
    let hue;
    switch (max) {
        case red:
            hue = (green - blue) / d + (green < blue ? 6 : 0);
            break;
        case green:
            hue = (blue - red) / d + 2;
            break;
        case blue:
            hue = (red - green) / d + 4;
            break;
    }
    hue /= 6;
    return { h: hue, s: saturation, l: lightness };
}

function rgbToCmyk(r, g, b) {
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;
    const black = 1 - Math.max(red, green, blue);
    const cyan = (1 - red - black) / (1 - black);
    const magenta = (1 - green - black) / (1 - black);
    const yellow = (1 - blue - black) / (1 - black);
    return { c: cyan, m: magenta, y: yellow, k: black };
}

module.exports = {
    name: 'colorrgb',
    description: 'converts a RGB color to HEX, HSL, and CMYK',
    help: 'This command converts a RGB color to HEX, HSL, and CMYK',
    slash: true,
    text: true,
    admin: false,
    requireKick: false,
    requireBan: false,
    canBeUsedInDm: true,
    premium: false,
    contexts: ['GUILD_TEXT', 'GUILD_VOICE', 'DM'],
    integration_types: [0,1],
    options: [
        {
            name: 'r',
            type: 4, // Integer type
            description: 'The red value (0-255)',
            required: true
        },
        {
            name: 'g',
            type: 4, // Integer type
            description: 'The green value (0-255)',
            required: true
        },
        {
            name: 'b',
            type: 4, // Integer type
            description: 'The blue value (0-255)',
            required: true
        }
    ],
    execute(message, args) {
        //check if the user provided the 3 values 0-255
        if (args.length !== 3) {
            message.channel.send('You need to provide 3 values (0-255).');
            return;
        }
        //check if the values are integers
        const r = parseInt(args[0]);
        const g = parseInt(args[1]);
        const b = parseInt(args[2]);
        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            message.channel.send('The values must be integers.');
            return;
        }
        //check if the values are between 0 and 255
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            message.channel.send('The values must be between 0 and 255.');
            return;
        }
        //convert the RGB values to HEX
        const hex = rgbToHex(r, g, b);
        message.channel.send(`HEX: ${hex}`);
        const hsl = rgbToHsl(r, g, b);
        message.channel.send(`HSL: ${hsl.h.toFixed(2)}, ${hsl.s.toFixed(2)}, ${hsl.l.toFixed(2)}`);
        const cmyk = rgbToCmyk(r, g, b);
        message.channel.send(`CMYK: ${cmyk.c.toFixed(2)}, ${cmyk.m.toFixed(2)}, ${cmyk.y.toFixed(2)}, ${cmyk.k.toFixed(2)}`);
    },
    executeSlash(interaction) {
        const r = interaction.options.getInteger('r');
        const g = interaction.options.getInteger('g');
        const b = interaction.options.getInteger('b');
        //check if the values are between 0 and 255
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            interaction.reply('The values must be between 0 and 255.');
            return;
        }
        //convert the RGB values to HEX
        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);
        const cmyk = rgbToCmyk(r, g, b);
        interaction.reply(`HEX: ${hex}\nHSL: ${hsl.h.toFixed(2)}, ${hsl.s.toFixed(2)}, ${hsl.l.toFixed(2)}\nCMYK: ${cmyk.c.toFixed(2)}, ${cmyk.m.toFixed(2)}, ${cmyk.y.toFixed(2)}, ${cmyk.k.toFixed(2)}`);
    }
};