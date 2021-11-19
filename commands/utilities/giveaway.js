const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args) => {

    try {
        const noQuery = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a channel to send the giveaway to and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #giveaways 10d 5 Nitro\``);

        const invalidTime = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid duration time of the giveaway and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #giveaways 10d 5 Nitro\``);

        const invalidWinners = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a valid number of winners for the giveaway and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #giveaways 10d 5 Nitro\``);


        const noItem = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a item to giveaway and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} #giveaways 10d 5 Nitro\``);


        const channel = message.mentions.channels.first();
        let giveawayDuration = args[1];
        let giveawayWinners = args[2];
        let giveawayPrize = args.slice(3).join(" ");

        if (!channel) {
            const msg = await message.channel.send(noQuery);
        } else if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            const msg = await message.channel.send(invalidTime);
        } else if (isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) {
            const msg = await message.channel.send(invalidWinners);
        } else if (!giveawayPrize) {
            const msg = await message.channel.send(noItem);
        } else {

            client.giveawaysManager.start(channel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: giveawayWinners,
                hostedBy: client.hostedBy ? message.author : null,
                embedColor: "#2F3136",
                embedColorEnd: "#2F3136",
                embedThumbnail: message.guild.iconURL(),
                messages: {
                    giveaway: (client.everyoneMention ? "@everyone\n\n" : "") + `**<:blue_hint_icon:793000793476431942> New giveaway has started in ${channel} by ${message.author}!**`,
                    giveawayEnded: (client.everyoneMention ? "@everyone\n\n" : "") + `**<:blue_hint_icon:793000793476431942> Giveaway has ended in ${channel} by ${message.author}.**`,
                    timeRemaining: "There are **{duration}** until the giveaway finishes.",
                    inviteToParticipate: "**React with 🎉 to enter the giveaway.**",
                    winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
                    embedFooter: `Hosted by ${message.author.tag}`,
                    noWinner: "A winner could not be chosen.",
                    hostedBy: `**Giveaway hosted by {user} in ${channel}**`,
                    winners: "winner(s)",
                    endedAt: "Ended",
                    units: {
                        seconds: "seconds",
                        minutes: "minutes",
                        hours: "hours",
                        days: "days",
                        pluralS: true
                    }
                }
            });
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
    name: "giveaway",
    category: "Utilities",
    description: "Create a new giveaway to giveaway an item",
    usage: `giveaway [channel] <time> <winners> <item>`,
    aliases: ["giveaways"],
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