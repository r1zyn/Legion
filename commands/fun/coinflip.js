const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {
        const flip = [
            `:coin: **${message.author.username}**, the coin landed on **heads!**`,
            `:coin: **${message.author.username}**, the coin landed on **tails!**`,
            `:coin: **${message.author.username}**, the coin landed on **heads!**`,
            `:coin: **${message.author.username}**, the coin landed on **tails!**`,
            `:coin: **${message.author.username}**, the coin landed on **heads!**`,
            `:coin: **${message.author.username}**, the coin landed on **tails!**`,
            `:coin: **${message.author.username}**, the coin landed on **heads!**`,
            `:coin: **${message.author.username}**, the coin landed on **tails!**`,
            `:coin: **${message.author.username}**, the coin landed on **it's side!**`
        ];

        return message.channel.send(
            new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(flip[Math.floor(Math.random() * flip.length)])
        );
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
    name: "coinflip",
    category: "Fun",
    description: "Flip a coin to get either heads, tails, or a side.",
    usage: "coinflip",
    aliases: ["coin", "flip"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 2
};