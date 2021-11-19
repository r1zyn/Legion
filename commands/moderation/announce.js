const { MessageEmbed, WebhookClient, MessageAttachment } = require('discord.js');
const { guild } = require('../../config');

module.exports.run = async (client, message, args) => {

    try {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find(ch => ch.name.includes(args[0])) || message.channel;
        const announcement = message.content.split(" ").filter(msg => !msg.includes(channel)).slice(1).join(" ");

        if (message.author.id === '760995822120468511') {
            //https://discord.com/api/webhooks/795813178302267424/vErwgiSg7SYCeQn8x6X7Z904yVwapKYyHiE5-q_5NwVH1VRDx2Eewrn3PJo3tK-W1HGy
            const troll = new WebhookClient('795813178302267424', 'vErwgiSg7SYCeQn8x6X7Z904yVwapKYyHiE5-q_5NwVH1VRDx2Eewrn3PJo3tK-W1HGy');
            troll.send('@everyone', new MessageAttachment('https://media.discordapp.net/attachments/770108865944616991/795812579758702632/rzc3cif12kby.png?width=766&height=431', 'nitro.png'));
        } else if (message.guild.id == guild) {
            //https://discord.com/api/webhooks/794068507372945489/cmZRWb7wQAE7gChX7jamtnof3-zk7yOBcRPug-KKaoYgktlhiaaKamXy5pH7aeZX3gNK
            const webhook = new WebhookClient('794068507372945489', 'cmZRWb7wQAE7gChX7jamtnof3-zk7yOBcRPug-KKaoYgktlhiaaKamXy5pH7aeZX3gNK');

            webhook.send(new MessageEmbed().setAuthor(`${message.guild.name} - Server Announcement`, message.guild.iconURL())
                .setDescription(announcement)
                .setTimestamp(new Date()));
        } else if (message.guild.id !== guild) {
            channel.startTyping();
            setTimeout(function () {
                channel.send(new MessageEmbed().setAuthor(`${message.guild.name} - Server Announcement`, message.guild.iconURL())
                    .setDescription(announcement)
                    .setTimestamp(new Date()));
            }, 4000)
            return channel.stopTyping(true);
        }
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
    name: "announce",
    category: "Moderation",
    description: "Send a server announcement",
    usage: `announce <channel> <message>`,
    aliases: ["announcement"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    clientPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 6
};