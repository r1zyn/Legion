const canva = require('canvacord');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {
        let text = args.join(" ");

        if (!args[0]) {
            const noArgs = new Discord.MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide some text to be displayed in the picture and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} Some text here\``);

            return message.channel.send(noArgs);
        }

        let image = await canva.Canvas.changemymind(text);

        let changeMyMind = new Discord.MessageAttachment(image, "cmm.png")

        return message.channel.send(changeMyMind);
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
    name: "changemymind",
    category: "Fun",
    description: "Generate a triggered image of a user",
    usage: "color <hexcolor>",
    aliases: ["colour"],
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