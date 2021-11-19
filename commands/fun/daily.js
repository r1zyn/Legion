const ms = require('parse-ms');
const { MessageEmbed } = require('discord.js');
const { owners } = require('../../config');

module.exports.run = async (client, message, args) => {

    try {
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        let daily = await client.qdb.fetch(`daily_${message.guild.id}_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0 && !owners.includes(message.author.id)) {
            let time = ms(timeout - (Date.now() - daily));

            const collectedEmbed = new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:time:795827549044473956> **You've already collected your daily reward.** Time left: ${time.days}d, ${time.hours}h, ${time.minutes}m and ${time.seconds}s`);

            return message.channel.send(collectedEmbed);
        } else if (owners.includes(message.author.id)) {
            client.qdb.add(`money_${message.guild.id}_${user.id}`, 9999999999999999999);
            client.qdb.set(`daily_${message.guild.id}_${user.id}`, Date.now());
            return message.channel.send(new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:white_check:795827549213163533> **${message.author.username}, you have successfully collected <:legion:798572165758189609>\`9999999999999999999\` Legions from your daily reward.**`)
            );
        } else if (!owners.includes(message.author.id)) {
            client.qdb.add(`money_${message.guild.id}_${user.id}`, amount);
            client.qdb.set(`daily_${message.guild.id}_${user.id}`, Date.now());
            return message.channel.send(new MessageEmbed()
                .setColor(0x2F3136)
                .setDescription(`<:white_check:795827549213163533> **${message.author.username}, you have successfully collected <:legion:798572165758189609>\`${amount}\` Legions from your daily reward.**`)
            );
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
    name: "daily",
    category: "Fun",
    description: "Receive a daily award of money",
    usage: "daily",
    aliases: ["reward"],
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