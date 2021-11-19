const Discord = require('discord.js');
const { pages } = require('../../functions/pages');

module.exports.run = async (client, message, args) => {

    try {
        const query = args[0];
        if (!query) {
            const noArgs = new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a discrthen rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 4200 1\``);

            return message.channel.send(noArgs);
        }

        const page = await pages(message.guild.members.cache.filter(m => m.user.discriminator.includes(query)).map(m => `${m.user.tag}`), 5, args[1]);

        if (!page.length) {
            const noPage = new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. The page you were looking for was not found. Please provide a valid page to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 4200 1\``);

            return message.channel.send(noPage);
        }

        if (isNaN(args[1])) {
            const nan = new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid page number to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 4200 1\``);

            return message.channel.send(nan);
        }

        if (isNaN(args[0])) {
            const nan = new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid page number to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 4200 1\``);

            return message.channel.send(nan);
        };

        const searchingEmbed = new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`<a:discord_loading:796184140378144808> **Searching for server members with the discriminator \`#${args[0]}\`...**`);

        const memberPage = new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Server Member Discriminator Search Results For #${args[0]}`, message.guild.iconURL())
            .setDescription(`** » ${(await page).join("\n » ")}**`)
            .setThumbnail(message.guild.iconURL())
            .setFooter(`${(await page).length} Server Member Search Result(s)  •  Page ${args[1]}/${Math.ceil(message.guild.members.cache.filter(m => m.user.discriminator.includes(args[0])).size / 5)}`)

        const msg = await message.channel.send(searchingEmbed);

        return setTimeout(function () {
            return msg.edit(memberPage);
        }, 2000);

    } catch (err) {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
};

module.exports.help = {
    name: "discrim",
    category: "Search",
    description: "Search for members in the guild by using a discriminator (tag)",
    usage: `discrim <tag>`,
    aliases: ["discriminator", "tag"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 5
};