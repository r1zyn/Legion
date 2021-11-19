const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {
        if (!args[0]) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor(message.guild.roles.highest.hexColor)
                    .setDescription(`<:blue_icon_hint:794005804343754752> **The current prefix for ${message.guild.name} is** \`${client.prefix[message.guild.id]}\`. Use \`${client.prefix[message.guild.id]}prefix [new prefix]\` to change.`)
            );
        } else if (args[0]) {
            const prefix = args[0];

            await client.db.set(`prefix-${message.guild.id}`, prefix);
            client.prefix[message.guild.id] = prefix;

            const newPrefix = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`Successfully changed the prefix in ${message.guild.name}`, message.guild.iconURL())
                .setThumbnail(message.guild.iconURL())
                .setDescription(`Hey **${message.author.username}**, the prefix for this server has successfully been changed to **${prefix}**. To get the current prefix of the server, use the prefix command like so: \`${client.prefix[message.guild.id]}prefix\`.`)

            return message.channel.send(newPrefix);
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
    name: "prefix",
    category: "Configuration",
    description: "Get the prefix of the server or change the prefix of the server.",
    usage: `prefix [new prefix]`,
    aliases: ["prefix", "setprefix", "set-prefix", "prefix-set", "prefixset"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 10
}