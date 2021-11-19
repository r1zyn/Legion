const { MessageEmbed } = require('discord.js');
const { join } = require('path');
const { readdirSync } = require('fs');

module.exports.run = async (client, message, args) => {

    try {
        const noArgs = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`The specified path was not provided.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, please provide a path to the command you want to be reloaded.\n\n**Usage:** \`${client.prefix[message.guild.id]}reload <module folder> <command file>\`\n**Example:** \`${client.prefix[message.guild.id]}reload information help\``);

        if (!args.length) return message.channel.send(noArgs);
        const commandName = args[1].toLowerCase();
        const folder = args[0].toLowerCase();
        const command = client.commands.get(commandName) || client.aliases.get(commandName);

        const notFound = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`The specified path was not found`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, please provide a valid path to the command you want to be reloaded as the path you provided was not found.\n\n**Usage:** \`${client.prefix[message.guild.id]}reload <module folder> <command file>\`\n**Example:** \`${client.prefix[message.guild.id]}reload information help\``);

        if (!command) return message.channel.send(notFound);
        else {
            const path = readdirSync(join(__dirname, '..', `${args[0]}`, `${args[1]}`)).filter(cmd => cmd.endsWith('.js'));

            try {
                delete require.cache[require.resolve(`${join(__dirname, '..', `${args[0]}`)}/${path}`)];
                const newCommand = require(`./${args[0]}/${command.help.name}`);
                client.commands.set(newCommand.help.name, newCommand);
            } catch (error) {
                console.error(`[ ${client.user.username} ] ${error.stack}`);
                const errorEmbed = new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`${client.user.username} - Command File Reload`, client.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`**There was an error while reloading the command \`${command.help.name}\`.**\n\n**Error:**\n\`\`\`cmd\n${err.stack}\`\`\``);

                message.channel.send(errorEmbed);
                return console.log(`[ ${client.user.username} ] ${err.stack}`);
            }

            return message.channel.send(new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`${client.user.username} - Command File Reload`, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`**Successfully reloaded command \`${comamnd.name}\`.**`)
            );
        }
    } catch (err) {
        const errorEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
};

module.exports.help = {
    name: "reload",
    category: "Private",
    description: "Reload a command",
    usage: `reload <module folder> <command file>`,
    aliases: ["reload"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: true,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 0
}