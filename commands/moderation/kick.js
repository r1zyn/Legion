const { MessageEmbed, GuildMember } = require('discord.js');

module.exports.run = async (client, message, args) => {

    try {
        const member = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.username.includes(args[0]));
        const reason = message.content.split(" ").filter(msg => !msg.includes(member)).slice(1).join(" ");

        const amountError1 = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a vaild server member to kick with roles lower than yours and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} @Archreus Being toxic\``);


        const amountError3 = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a vaild server member that is not you and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} @Archreus Being toxic\``);


        const amountError5 = new MessageEmbed()
            .setColor(0x2F3136)
            .setAuthor(`This command was cancelled as the provided arguments were invalid.`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as the provided arguments were invalid. Please provide a vaild server member that does not have administrator or moderator permissions and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} @Archreus Being toxic\``);

        if (!member) {
            const noArgs = new MessageEmbed()
                .setColor(0x2F3136)
                .setAuthor(`This command was cancelled as no arguments were provided.`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`Hey **${message.author.username}**, the \`${this.help.name}\` command was cancelled as no arguments were provided. Please provide a user to kick and a reason why and then rerun this command. In the future, please provide arguments necessary with commands and ensure they are valid.\n\n**Usage:** \`${client.prefix[message.guild.id]}${this.help.usage}\`\n**Example:** \`${client.prefix[message.guild.id]}${this.help.name} @Archreus Being toxic\``);

            return message.channel.send(noArgs);
        } else if (member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send(amountError5);
        } else if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(amountError1);
        } else if (member.user.id === message.author.id) {
            return message.channel.send(amountError3);
        }  else {

            if (!reason) {
                await member.kick({ reason: reason })
                    .then(() => {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(0x2F3136)
                                .setAuthor(`${member.user.tag} - Server Member Kick`, message.author.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`**${member.user.tag}** (${member.user}) has been kicked from this server by **${message.author}**.`)
                                .addField('Provided Reason', `\`\`\`apache\n${reason}\`\`\``)
                                .setFooter(`Status 201: Server member kick success`)
                                .setTimestamp(new Date())
                        );
                    })
                    .then(() => {
                        return member.send(
                            new MessageEmbed()
                                .setColor(0x2F3136)
                                .setAuthor(`${member.user.tag} - Server Member Kick`, message.author.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`**${member.user.tag}**, you have been kicked from the server **${message.guild.name}** by **${message.author}**.`)
                                .addField('Provided Reason', `\`\`\`apache\n${reason}\`\`\``)
                        );
                    });
            } else if (reason) {

                await member.kick()
                    .then(() => {
                        return message.channel.send(
                            new MessageEmbed()
                                .setColor(0x2F3136)
                                .setAuthor(`${member.user.tag} - Server Member Kick`, message.author.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`**${member.user.tag}** (${member.user}) has been kicked from this server by **${message.author}**.`)
                                .addField('Provided Reason', `\`\`\`apache\n${reason}\`\`\``)
                                .setFooter(`Status 201: Server member kick success`)
                                .setTimestamp(new Date())
                        );
                    })
                    .then(() => {
                        return member.send(
                            new MessageEmbed()
                                .setColor(0x2F3136)
                                .setAuthor(`${member.user.tag} - Server Member Kick`, message.author.displayAvatarURL({ dynamic: true }))
                                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                                .setDescription(`**${member.user.tag}**, you have been kicked from the server **${message.guild.name}** by **${message.author}**.`)
                                .addField('Provided Reason', `\`\`\`apache\n${reason}\`\`\``)
                        );
                    });
            }
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
    name: "kick",
    category: "Moderation",
    description: "Kick a user from the server",
    usage: `kick <user> [reason]`,
    aliases: ["kick"],
    deletable: false
};

module.exports.requirements = {
    userPerms: ["SEND_MESSAGES", "KICK_MEMBERS"],
    clientPerms: ["SEND_MESSAGES", "MANAGE_MESSAGES", "KICK_MEMBERS"],
    ownerOnly: false,
    guildOnly: true
};

module.exports.limits = {
    cooldown: 6
};