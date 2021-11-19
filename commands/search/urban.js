const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports.run = async (client, message) => {

    try {

        if (!message.channel.nsfw) {
            const noArgs = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as it was used in the wrong channel.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as it was used in a wrong channel. Please ensure that this command is only run in nsfw channels, as some content may be either offensive or innappropriate.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Crown Tech\``);

        return message.channel.send(noArgs);            
        }

        const args = encodeURIComponent(message.content.split(" ").slice(1).join(" "));

        if (!message.content.split(" ").slice(1).join(" ")) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a word to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Crown Tech\``);

            return message.channel.send(noArgs);
        }

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?term=${args}`).then(response => response.json());


        if (!list.length || !list) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(0x2F3136)
                    .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. The word you where searching for was not found. Please provide a valid word to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Crown Tech\``)
            )
        };

        const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);

        const [answer] = list;

        const embed = new MessageEmbed()
            .setColor("2F3136")
            .setAuthor(`Urban Dictionary Search`, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(answer.word)
            .setThumbnail(`https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-01-11/297387706245_85899a44216ce1604c93_512.jpg`)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Definition', value: trim(answer.definition, 1024) },
                { name: 'Example', value: trim(answer.example, 1024) },
                { name: 'Rating', value: `<:thumbs_up_white:796179483253538898> ${answer.thumbs_up}, <:thumbs_down_white:796178894809202719> ${answer.thumbs_down}` }
            );

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
    name: "urban",
    category: "Search",
    description: "Search for a word on the Urban Dictionary",
    usage: `urban <query>`,
    aliases: ["urban"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 4
}