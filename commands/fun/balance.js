const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {

    try {
        const user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0])) || message.member;

        let bal = await client.qdb.fetch(`money_${message.guild.id}_${user.id}`);
        if (bal === null) bal = 0;


        return message.channel.send(new Discord.MessageEmbed()
            .setColor(0x2F3136)
            .setDescription(`**${user.user.username}** currently has <:legion:798572165758189609>**${bal}** Legions.`)
        );
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
    name: "balance",
    category: "Fun",
    description: "View a user's total amount of money",
    usage: "balance [user]",
    aliases: ["bal", "coins", "wallet"],
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