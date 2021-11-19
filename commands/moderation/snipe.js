const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {

    try {

        const msg = client.snipes.get(message.channel.id);
        if (!msg) {
            return message.channel.send(new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:time:795827549044473956> **${message.author.username}**, no recently deleted messages were found in **#${message.channel.name}**.`)
            );
        } else {
            const embed = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`Recently deleted message by ${msg.author.tag} - #${msg.channel.name}`, msg.author.displayAvatarURL({ dynamic: true }))
                //.setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
                .setDescription(msg.content);

            if (msg.image) embed.setImage(msg.image);

            return message.channel.send(embed);
        }
    } catch (err) {
        const errorEmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    }
}

module.exports.help = {
    name: "snipe",
    category: "Moderation",
    description: "View a recently deleted message.",
    usage: `snipe`,
    aliases: [],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["MANAGE_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 3
};