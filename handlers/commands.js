const { readdirSync } = require('fs');
const { join } = require('path');
const utilities = join(__dirname, '..', 'commands', 'utilities');
const search = join(__dirname, '..', 'commands', 'search');
const moderation = join(__dirname, '..', 'commands', 'moderation');
const information = join(__dirname, '..', 'commands', 'information');
const levels = join(__dirname, '..', 'commands', 'levels');
const fun = join(__dirname, '..', 'commands', 'fun');
const private = join(__dirname, '..', 'commands', 'private');
const config = join(__dirname, '..', 'commands', 'config');


module.exports.run = (client) => {
    for (const cmd of readdirSync(utilities).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${utilities}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Utility Commands ] Loaded ${readdirSync(utilities).length} commands`);


    for (const cmd of readdirSync(search).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${search}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Search Commands ] Loaded ${readdirSync(search).length} commands`);


    for (const cmd of readdirSync(moderation).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${moderation}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Moderation Commands ] Loaded ${readdirSync(moderation).length} commands`);


    for (const cmd of readdirSync(information).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${information}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Information Commands ] Loaded ${readdirSync(information).length} commands`);

    for (const cmd of readdirSync(levels).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${levels}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Level Commands ] Loaded ${readdirSync(levels).length} commands`);

    for (const cmd of readdirSync(fun).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${fun}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Fun Commands ] Loaded ${readdirSync(fun).length} commands`);

    for (const cmd of readdirSync(private).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${private}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Private Commands ] Loaded ${readdirSync(private).length} commands`);

    for (const cmd of readdirSync(config).filter(cmd => cmd.endsWith('.js'))) {
        const props = require(`${config}/${cmd}`);
        client.commands.set(props.help.name, props);

        if (props.help.aliases) for (const alias of props.help.aliases) {
            client.aliases.set(alias, props);
        }
    }

    console.log(`[ Configuration Commands ] Loaded ${readdirSync(config).length} commands`);
};