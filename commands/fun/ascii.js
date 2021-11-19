const { MessageEmbed } = require('discord.js');
const figlet = require('figlet');

module.exports.run = async (client, message, args) => {

    try {
        if (!args[0]) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide some text to be converted to ascii and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Some text here\``);

            return message.channel.send(noArgs);
        }

        msg = args.join(" ");

        figlet.text(msg, function (err, data) {

            const tooLong = new MessageEmbed()
                .setColor(0x2F3136)
                .setThumbnail(message.guild.iconURL())
                .setAuthor(`The provided text was too long.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`${message.author}, please provide some text shorter than 2000 characters.\n\n**Usage:** \`${client.prefix[message.guild.id]}ascii <text>\`\n**Example:** \`${client.prefix[message.guild.id]}ascii Hello World!\``);

            if (data.length > 2000) return message.channel.send(tooLong)

            return message.channel.send('```' + data + '```')
        });
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
    name: "ascii",
    category: "Fun",
    description: "Converts text to ascii",
    usage: "ascii <text>",
    aliases: ["ascii"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 2
};