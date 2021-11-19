const { MessageEmbed } = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');

module.exports.run = async (client, message, args) => {
    try {
        if (!args[0]) {
            const noQuery = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a lanuage (e.g. en for English) and a text to translate and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} en Ni Hao\``);

            return message.channel.send(noQuery);
        }

        if (!args.slice(1).join(" ")) {
            const noQuery = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a lanuage (e.g. en for English) and a text to translate and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} en Ni Hao\``);

            return message.channel.send(noQuery);
        }
        

        if (args[0].length !== 2) {
            const invalidLanguage = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid language (e.g. en instead of English) and a text to translate and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} en Ni Hao\``);

            return message.channel.send(invalidLanguage)
        }
        const result = await translate(args.slice(1).join(" "), { to: args[0] });
        const embed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`${client.user.username} - Text Translation`, message.author.displayAvatarURL({ dynamic: true }))
            .addField(`**Text**`, `\`\`\`${args.slice(1).join(" ")}\`\`\``, true)
            .addField(`**Translation (${args[0]})**`, `\`\`\`${result.text}\`\`\``)
        return message.channel.send(embed);
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
    name: "translate",
    category: "Utilities",
    description: "Translate text from one language to another.",
    usage: `translate <language> <text>`,
    aliases: ["tr"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 8
};