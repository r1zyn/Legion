const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    const px = client.prefix[message.guild.id];

    const economyEmbed = new MessageEmbed()
        .setColor(0x2F3136)
        .setAuthor(`${client.user.username} - Economy System Information`, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ type: "png" }))
        .setDescription(`**Welcome to the economy!** This documentation shows all you need to know about **${client.user.username}'s economy system**, which uses the currency <:legion:798572165758189609> Legions. You can collect daily rewards, work and answer trivia questions correctly to earn more coins, which you can spend at the shop.`)
        .addField(`<:globe:795827719707033621> Getting Started With The Economy`, `To get started, simply collect your daily reward to earn your very first Legions!`)
        .addField(`<:time:795827549044473956> Daily Command | ${px}daily`, `Earn <:legion:798572165758189609>\`500\` Legions daily (every 24 hours) as a reward.`)
        .addField(`<:statistic_line:795827549035823125> Balance Command | ${px}balance`, `Keep up to date with your Legions by using the \`balance\` command to check your balance.`)
        .addField(`<:pencil_white:796178895141339206> Work Command | ${px}work`, `To earn more Legions, you can work every 2 hours. You can use this money to buy items from the shop.`)
        .addField(`<:file:795827719714635796> Shop Command | ${px}shop`, `Welcome to the Legion shop, where you can sue your Legions to buy several items you may need or want.`)
        .addField(`<:white_check:795827549213163533> Buy Command | ${px}buy`, `To purchase an item from the Legion shop with your Legions, simply use the \`buy\` command.`)
        .addField(`<:thumbs_up_white:796179483253538898> Sell Command | ${px}sell`, `Don't want an item anymore? Is your inventory filling up? You can get some Legions back by selling them.`)
        .addField(`<:menu:796178895468232724> Inventory Command | ${px}inventory`, `You can view all your purchased and collected items here.`)
        .addField(`<:external_link:795827549157589052> Earn Extra - Trivia Command | ${px}trivia`, `Need a bit of a challenge and want to earn more Legions? Test your general knowledge with the \`trivia\` command.`)

    return message.channel.send(economyEmbed);
};

module.exports.help = {
    name: "economy",
    category: "Fun",
    description: "Learn more about Legion's economy system",
    usage: "economy",
    aliases: [],
    deletable: false
}

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 10
};