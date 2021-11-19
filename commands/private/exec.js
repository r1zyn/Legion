const { MessageEmbed } = require('discord.js');
const { exec } = require('child_process');

module.exports.run = async (client, message, args) => {
    try {
        exec(args.join(" "), (error, stdout) => {
            const response = stdout || error;
            return message.channel.send(response, { split: true, code: true });
        });
    } catch (err) {
        const errorEmbed = new MessageEmbed()   
            .setColor(0x2F3136)
            .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

        message.channel.send(errorEmbed);
        return console.log(`[ ${client.user.username} ] ${err.stack}`);
    };
};

module.exports.help = {
    name: "exec",
    category: "Private",
    description: "Executes a command in the console",
    usage: "exec <command>",
    aliases: ["e"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES"],
    clientPerms: ["SEND_MESSAGES"],
    ownerOnly: true,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 0
};