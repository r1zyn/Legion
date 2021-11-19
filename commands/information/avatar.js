const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {

    try {
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0])) || message.member;

        const avatarAmbed = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`Avatar For ${member.nickname ? member.nickname : member.user.username}`, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Click [**here**](${member.user.avatarURL({ type: "png", size: 2048 })}) for avatar URL`)
            .setImage(member.user.displayAvatarURL({ type: "png", size: 2048 }))

        return message.channel.send(avatarAmbed);
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
    name: "avatar",
    category: "Information",
    description: "View a server member's avatar",
    usage: "avatar [member]",
    aliases: ["pfp"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 5
};