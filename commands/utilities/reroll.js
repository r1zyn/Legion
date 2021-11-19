const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    try {
        const noQuery = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a word to search for and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 796356856201084929\``);

        const notFound = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid giveaway to reroll and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} 796356856201084929\``);

        const success = new MessageEmbed()
            .setColor(0x2F3136)
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`Succesfully rerolled existing giveaway.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`${message.author}, your provided giveaway was successfully rerolled.`);
            

        if (!args[0]) {
            const msg = await message.channel.send(noQuery);
            setTimeout(function () {
                return msg.delete();
            }, 5000);
        };

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            const msg = await message.channel.send(notFound);
            setTimeout(function () {
                return msg.delete();
            }, 5000);
        }



        client.giveawaysManager
            .reroll(giveaway.messageID, {
                messages: {
                    congrat: ':tada: New winner(s) : {winners}! Congratulations!\n{messageURL}',
                    error: 'No valid participations, no winners can be chosen!'
                }
            })
            .then(async () => {
                const msg = await message.channel.send(success);
                setTimeout(function () {
                    return msg.delete();
                }, 5000);
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)) {
                    return message.channel.send();
                } else {
                    const errorEmbed = new MessageEmbed()
                        .setColor(0x2F3136)
                        .setAuthor(`Whoops! Looks like something has gone wrong.`, client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Hey there, **${message.author.username}**. Unfortunately it looks like something went wrong and **${client.user.username}** was unable to run this command. Please try again later. **Good luck, soldier.** \n\n<:blue_icon_hint:794005804343754752> **Did you know you can join ${client.user.username}'s support server? Join us [here!](https://discord.gg/gpy2pAM7AC)**`)

                    message.channel.send(errorEmbed);
                    return console.log(`[ ${client.user.username} ] ${e}`);

                }
            })
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
    name: "reroll",
    category: "Utilities",
    description: "Reroll an existing giveaway",
    usage: `reroll`,
    aliases: ["reroll"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
    clientPerms: ["SEND_MESSAGES", "ADMINISTRATOR"],
    ownerOnly: false,
    guildOnly: false
};

module.exports.limits = {
    cooldown: 8
};