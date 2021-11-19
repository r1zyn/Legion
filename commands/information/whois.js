const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {

};

module.exports.help = {
    name: "whois",
    category: "Information",
    description: "View information of a server member",
    usage: `whois [user]`,
    aliases: ["whois", "user", "member", "userinfo", "user-info", "meberinfo", "member-info"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 4
}