const { MessageEmbed, MessageAttachment } = require('discord.js');
const canvacord = require('canvacord');

module.exports.run = async (client, message, args) => {

    try {
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0])) || message.member;
        const triggered = await canvacord.Canvas.trigger(member.user.displayAvatarURL({ format: "png", dynamic: false }));
        const attachment = new MessageAttachment(triggered, "triggered.gif");
        return message.channel.send(attachment);
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
    name: "trigger",
    category: "Fun",
    description: "Generate a triggered image of a user",
    usage: "trigger [user]",
    aliases: ["triggered"],
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